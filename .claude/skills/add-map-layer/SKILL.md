---
name: add-map-layer
description: Add or edit a map layer (LayerConfig) for parcels-n-at or greenprint - discover the real tile field names from the tile server, pick a symbology mode that is actually implemented, write the popup templates, and register the layer. Use when adding a layer to a map, restyling one, changing what a hover/click popup shows, or debugging a layer that renders blank, uncolored, or unclickable.
---

# Adding a map layer

Layers are plain `LayerConfig` objects (`packages/types/src/mapping/layer.ts`)
consumed by `Map` in `@wprdc/ui`. Most layer bugs are one of two things: a field
name that doesn't exist in the tiles, or a symbology mode whose implementation
is a stub. Both are cheap to rule out up front.

## 1. Read the tile source before writing the config

Every tile source publishes its TileJSON, and it lists the exact field names and
types in the vector tiles. Fetch it first - column names in the tiles often
differ from the CKAN table they were built from, and casing matters.

```bash
curl -s "https://data.wprdc.org/tiles/<SOURCE>" | python3 -m json.tool
```

Two source flavors are in use:

- `table.<view_name>.geom` - a prepared table on the tile server
  (e.g. `map.parcel_index.geom`, `table.ebll_tracts.geom`).
- `table.<ckan-resource-uuid>._geom` - a CKAN datastore resource published
  directly (e.g. `table.4af8e160-57e9-4ebf-a501-76ca1b42fc99._geom`).

`tiles.source` is the full URL; `tiles.sourceLayer` is that same trailing
identifier on its own. They are different strings in the config and mixing them
up produces a layer that loads but renders nothing.

Check the `fields` map for every field you intend to reference in `symbology`,
`textField`, `renderOptions.filter`, or a popup template. **A field in the CKAN
table is not necessarily in the tiles** - the EBLL tract source carries
`percentEBLL2015`-`2024` but none of the `note<year>` columns that the CKAN
resource has.

## 2. Write the config

Put it in `apps/<app>/src/layers/<name>.ts` (greenprint groups them into
subdirectories by category). Shared layers used by more than one app live in
`packages/ui/src/layers/`.

```ts
import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const myLayer: LayerConfig = {
  slug: "my-layer",        // also the maplibre source id - must be unique
  title: "My Layer",       // shown in the layer menu and legend
  description: "…",        // markdown, shown in the menu

  source: {                // provenance shown in the UI, not used for fetching
    slug: "…", title: "…", url: "https://data.wprdc.org/dataset/…",
    resourceID: "…",
    publisher: { name: "…", homepage: "…", org: "…" },
  },

  tiles: {
    source: "https://data.wprdc.org/tiles/table.foo.geom",
    sourceLayer: "table.foo.geom",
    minZoom: 7,
    maxZoom: 18,
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,   // Point | Line | Polygon
    fillColor: { … },
    strokeColor: { mode: "fixed", style: "#000" },
    fillOpacity: { mode: "fixed", style: 0.6 },
  },
};
```

### Symbology modes - what works

`fillColor`, `strokeColor`, `fillOpacity`, `strokeWidth`, `strokeOpacity` each
take one of these (`packages/types/src/mapping/symbology.ts`, parsed in
`packages/ui/src/components/map/parse.ts`):

| mode | use for | notes |
| --- | --- | --- |
| `fixed` | one style for the whole layer | |
| `category` | discrete values in a field | `style[]` of `{slug,label,value,style}` + `defaultStyle` |
| `case` | numeric thresholds | `style[]` of `{slug,label,operator,operand,style}`, evaluated in order |
| `ramp` | graduated values | `type: "step"` for discrete bins, any other `RampType` interpolates |
| `expression` | anything else | raw maplibre expression, escape hatch |

Ramp stops are sorted ascending before the expression is built, so records can
be authored in any order. Give the first and last a `label` - the legend uses
those two as its endpoints.

One trap worth knowing: **`nullStyle` doesn't take a color.** In `case` mode it
only decides *whether* a null branch is emitted; the color is hardcoded to
`#ccc`. Set `nullStyle: "#ccc"` and expect grey, or use `expression`.

Any style value can also be:

- zoom-interpolated - `[[8, 1], [14.5, 4]]`, i.e. `[zoom, value]` pairs; or
- interaction-aware - `{ default, hovered, selected }`, which **requires**
  top-level `interaction.idField` or the parser logs an error and the styling
  silently misbehaves.

### Legends

Generated automatically from the symbology (`legendFromOption`) - `category`,
`case`, and `ramp` layers get labeled entries, everything else gets a single
swatch. Pass `legend: false` to suppress it, or a `LegendOptions` object to
write it by hand. **Always give `case` records a `label`**; the legend reads
`label` directly and shows nothing useful without it.

## 3. Interaction and popups

```ts
interaction: {
  idField: "id",           // unique feature property, used for hover/select state
  selectable: false,       // default - see below
  hoverPopupContent: `<h1 class="text-lg font-bold">{{name}}</h1>`,
  clickPopupContent: ``,
},
```

Popup templates are **Mustache**, rendered against `feature.properties`:

- `{{field}}` interpolates; unknown fields render empty, not an error.
- Fallbacks use sections: `{{#a}}{{a}}{{/a}}{{^a}}fallback{{/a}}`.
- **`0` is falsy in Mustache**, so `{{#rate}}` skips a real zero and falls
  through to your fallback branch. If zero is meaningful, invert the test or
  render the value unconditionally.
- Tailwind classes work; keep tables narrow, popups are unconstrained.

`selectable` defaults to `false`. Only layers that opt in participate in click
selection and navigation - today that's the parcel layers only. A context layer
left non-selectable is still fully hoverable; making it selectable puts it in
the "Select a parcel" disambiguation menu, which is almost never what you want.

Interaction is registered against the maplibre layer that matches the geometry -
`` `${slug}-fill` `` for polygons, `` `${slug}-circle` `` for points,
`` `${slug}-line` `` for lines - resolved by `getInteractiveLayerID()` in
`components/map/util.tsx`. If you add a renderer or a new `geoType`, extend that
function or the layer will render without ever firing an event.

## 4. Register it

- **parcels-n-at**: add to the `availableLayers` array in
  `apps/parcels-n-at/src/layers/index.tsx`. That array feeds the layer menu, and
  layers are toggled by `slug` through the `layers` search param.
- **greenprint**: being sunset - only register a layer here if the request is
  explicitly about greenprint, and never mirror a parcels-n-at layer into it. If
  it does apply, add to the right category in the `layers` record in
  `apps/greenprint/src/layers/index.tsx` (`interactive`, `base`,
  `natural-features`, `transportation`, `urban-green-features`, …).

Draw order follows array order - later layers render on top. In
`nav-map.tsx` the composition is `[...contextLayers, parcelLayer, ...layers]`,
so context layers deliberately sit under the parcels.

## 5. Verify it in the map, not just the type-checker

```bash
pnpm turbo type-check --filter <app>
pnpm turbo dev --filter <app>
```

`@wprdc/ui` has pre-existing type errors, so a full `turbo type-check` fails for
unrelated reasons - filter to the app you touched. If you changed anything under
`packages/`, rebuild it (`pnpm turbo build --filter @wprdc/ui --force`) since
apps consume `dist/`.

Then check the actual failure modes the type system can't see: the layer draws
at the expected zooms, colors vary the way the symbology says, the legend labels
read correctly, and hovering a feature shows a popup with values rather than
blanks. A popup full of empty slots means the field names came from the CKAN
table instead of the tiles - go back to step 1.
