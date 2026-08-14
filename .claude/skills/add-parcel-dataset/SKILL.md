---
name: add-parcel-dataset
description: Wire a WPRDC CKAN resource into the parcel dashboard end to end - probe the resource, add the ParcelTable entry and fetcher in @wprdc/api, add the record type in @wprdc/types, build the dashboard section, and register it for bulk export. Use when adding, replacing, or re-pointing any parcel-level or tract-level dataset shown on a parcel page (parcels-n-at or greenprint), or when a dataset's resource ID changes.
---

# Adding a parcel dataset

A dataset touches five files across three packages. Missing one of them fails
quietly - usually the bulk export, which returns zero rows without erroring.

## 1. Probe the resource before writing any code

Never infer field names from the dataset title or from a sibling resource.
Column naming is inconsistent across WPRDC resources (`PARID`, `parcel_id`,
`PIN`, `pin`, `PARCEL ID` are all in use today).

```bash
curl -s "https://data.wprdc.org/api/3/action/datastore_search?resource_id=<RESOURCE_ID>&limit=1" \
  | python3 -c "
import json,sys; r=json.load(sys.stdin)['result']
print([(f['id'], f['type']) for f in r['fields']])
print(json.dumps(r['records'][0], indent=2))"
```

Read the sample row, not just the field list - it tells you which columns are
null in practice and whether numbers arrive as numbers or strings.

Then answer the question that determines everything downstream:

**What is the resource keyed by?**

- **A parcel ID** - ordinary case, use the generic fetcher (step 3a).
- **A census tract, municipality, or other geography** - the resource has no
  parcel column and needs a crosswalk join (step 3b).

## 2. Add the record type

`packages/types/src/models/parcel.ts`

```ts
export interface MyRecord extends DatastoreRecord {
  parcel_id: string;
  some_field: number | null;
}
```

Mark every field the sample row showed as `null` with `| null`. `DatastoreRecord`
is `Record<string, Value>`, so it will not catch a wrong field name for you -
this interface is the only thing standing between a typo and a blank dashboard
panel.

If the dataset has repeating fields (one per year, say), export a list of the
keys alongside the interface so components iterate instead of hardcoding:

```ts
export const EBLL_YEARS = [2015, 2016, /* … */ 2024] as const;
```

## 3. Add the table and fetcher

`packages/api/src/domains/parcel.ts`

Add the resource ID to `ParcelTable` and its key column to `parcelIDFields`
(the `Record<ParcelTable, string>` type will not compile until you do both).

### 3a. Parcel-keyed resource

```ts
export const fetchMyRecords = (
  parcelID: string | string[],
): Promise<APIResult<MyRecord>> =>
  fetchParcelRecords<MyRecord>(parcelID, ParcelTable.MyTable);
```

`fetchParcelRecords` takes an optional `filterClause` for rows to exclude - see
`fetchCityViolationsRecords`, which drops rows with no violation description.

### 3b. Geography-keyed resource

Join through the parcel centroid file (`PARCEL_CENTROIDS` in this module -
resource `3fab7152-3f11-4788-8372-4c33f86ea813`, which maps `PIN` to `GEOID`
and other geographic identifiers), and alias the parcel ID back onto the rows
so the section component still receives `parcel_id`:

```ts
const sql = `SELECT c."PIN" AS parcel_id, e.*
   FROM "${ParcelTable.MyTable}" e
            JOIN "${PARCEL_CENTROIDS}" c ON e."TractField" = c."GEOID"::text
   WHERE c."PIN" IN (${parcelIDs.map((pid) => `'${pid}'`).join(", ")})`;

const { records } = await fetchSQLSearch<MyRecord>(sql);
const fields = await fetchFields(ParcelTable.MyTable);
```

`fetchEBLL` is the worked example. Watch the types on both sides of the join -
`GEOID` is numeric and tract columns are usually text, hence the `::text` cast.

Verify the join returns exactly one row per parcel before moving on:

```bash
curl -s -G "https://data.wprdc.org/api/3/action/datastore_search_sql" \
  --data-urlencode "sql=<YOUR QUERY WITH TWO REAL PARCEL IDS>" \
  | python3 -c "import json,sys; d=json.load(sys.stdin); print(json.dumps(d.get('result',d))[:800])"
```

A failed query returns `{"success": false}` with the error nested under
`error.message` - check for it rather than assuming an empty result means no data.

## 4. Build the dashboard section

`apps/parcels-n-at/src/components/parcel-dashboard/sections/<name>.tsx`

Sections receive `SectionProps<T>` (`{ fields, records }`) or
`MultiSourceSectionProps<{…}>` when several resources feed one panel. Return
`<></>` early when the records the section depends on are missing.

Render with the shared viz components from `@wprdc/ui`:

- `SingleValueViz` for one headline number.
- `Table` for repeating values - `rowLabel` + `rows` label the left column,
  `columns` the header, `data` is a row-major array. Cells accept a plain value
  or `{ value, format }`; `format` runs even when `value` is null, which is how
  you show a fallback (a note, a dash) in place of a missing number. A bare
  `undefined` cell renders "N/A" on its own.
- `Typography.Note` for muted secondary text.

Wire it up in `parcel-dashboard.tsx` by adding the getter to the relevant
`ConnectedSection` / `MultiConnectedSection` and the record type to its type
parameter. Add the dataset's page to that section's `datasetLinks`.

## 5. Register it for bulk export

`apps/parcels-n-at/src/datasets.ts`

Entries here drive both the field-picker menu and the bulk CSV export. The
export builds SQL directly:

```
FROM <dataset.table> JOIN selected_parcels ON <dataset.parcelIDField> = selected_parcels.parcel_id
```

(`app/api/parcels/route.ts`). So `parcelIDField` must be a real column on that
table that holds parcel IDs. **A geography-keyed resource cannot be exported
this way** - it produces an empty CSV rather than an error. Options:

- leave the export pointed at a parcel-level version of the data if one exists
  (this is why `ParcelTable.ParcelLevelEBLL` still exists), or
- omit the dataset from `datasets.ts`, or
- teach the export route to join through the centroid crosswalk.

Whichever you pick, say so explicitly rather than leaving it silently broken.

## 6. Build and check

`@wprdc/types` and `@wprdc/api` are consumed from `dist/`, so apps type-check
against stale definitions until you rebuild:

```bash
pnpm turbo build --filter @wprdc/types --filter @wprdc/api --force
pnpm turbo type-check --filter parcels-n-at
```

`@wprdc/ui` currently has pre-existing type errors unrelated to this work; a
full `turbo type-check` fails because of them. Filter to the packages you
touched, and compare against a clean tree before blaming your change.

## Greenprint

`apps/greenprint/src/components/parcel-dashboard/` is a near-copy of the
parcels-n-at dashboard and shares `@wprdc/api` fetchers - changing a record type
or a fetcher breaks it too. Diff the two section files; if they are identical,
mirror the change. If they have diverged, fix greenprint's copy on its own terms
and mention it.