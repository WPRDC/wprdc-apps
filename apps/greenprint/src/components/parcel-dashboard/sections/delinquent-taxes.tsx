import type { CityTaxDelinquency, DelinquentTax, Value } from "@wprdc/types";
import {
  formatDate,
  formatDollars,
  SingleValueViz,
  SingleValueVizCollection,
  Table,
  Typography,
} from "@wprdc/ui";
import React from "react";
import type { MultiSourceSectionProps } from "../types";

/** Cents matter here - the published amounts carry four decimal places. */
const dollars = (value?: Value | null): string =>
  formatDollars(value ?? 0, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) ?? "$0.00";

interface YearTotals {
  year: string;
  origBill: number;
  penalties: number;
  interest: number;
  payments: number;
}

/** Bill, penalties and interest, less anything paid. Can go negative - see the note below. */
const balance = (y: Omit<YearTotals, "year">) =>
  y.origBill + y.penalties + y.interest - y.payments;

export function DelinquentTaxesSection({
  county,
  city,
}: MultiSourceSectionProps<{
  county: DelinquentTax;
  city: CityTaxDelinquency;
}>): React.ReactElement {
  const countyRecords = county.records ?? [];
  const cityRecords = city.records ?? [];

  if (!countyRecords.length && !cityRecords.length)
    return <Typography.Note>No delinquent tax records found.</Typography.Note>;

  // One row per year today, but sum by year so repeated filings don't hide data.
  const byYear = countyRecords.reduce<Record<string, YearTotals>>(
    (acc, record) => {
      const totals = (acc[record.year] ??= {
        year: record.year,
        origBill: 0,
        penalties: 0,
        interest: 0,
        payments: 0,
      });
      totals.origBill += record.orig_bill;
      totals.penalties += record.penalties;
      totals.interest += record.interest ?? 0;
      // A null payment means nothing was ever paid toward this year, not missing data.
      totals.payments += record.total_payments ?? 0;
      return acc;
    },
    {},
  );

  // most recent year first
  const years = Object.values(byYear).sort((a, b) =>
    b.year.localeCompare(a.year),
  );

  const grand = years.reduce(
    (acc, y) => ({
      origBill: acc.origBill + y.origBill,
      penalties: acc.penalties + y.penalties,
      interest: acc.interest + y.interest,
      payments: acc.payments + y.payments,
    }),
    { origBill: 0, penalties: 0, interest: 0, payments: 0 },
  );

  // One row per parcel today, but sum defensively.
  const cityTotals = cityRecords.reduce(
    (acc, r) => ({
      currentTax: acc.currentTax + r.current_delq_tax,
      currentPI: acc.currentPI + r.current_delq_pi,
      priorTax: acc.priorTax + r.prior_delq_tax,
      priorPI: acc.priorPI + r.prior_delq_pi,
      priorYears: Math.max(acc.priorYears, r.prior_years),
    }),
    { currentTax: 0, currentPI: 0, priorTax: 0, priorPI: 0, priorYears: 0 },
  );

  const cityCurrent = cityTotals.currentTax + cityTotals.currentPI;
  const cityPrior = cityTotals.priorTax + cityTotals.priorPI;
  const cityTotal = cityCurrent + cityPrior;

  const countyBalance = balance(grand);

  // County and city are separate taxing bodies, so these amounts do not overlap.
  const combined = countyBalance + cityTotal;

  const asOf = countyRecords[0]?.asof_date;

  // Payments can exceed the published charges, which reads as a bug without explanation.
  const hasCredit = years.some((y) => balance(y) < 0) || countyBalance < 0;

  return (
    <div>
      <div className="mb-4 max-w-sm">
        <SingleValueViz
          id="delinquent-combined-balance"
          label="Estimated Total Balance"
          value={combined}
          format={dollars}
          info={
            "County and City of Pittsburgh delinquency added together. The county figure is original " +
            "tax bills plus penalties and interest less recorded payments, across every delinquent year " +
            "on record; the city figure is its current and prior delinquency as published. The two are " +
            "separate taxing bodies, so the amounts do not overlap. Treat this as an estimate rather " +
            "than a payoff amount."
          }
        />
      </div>

      <div className="mb-6 grid max-w-lg grid-cols-2 gap-2">
        <SingleValueViz
          id="delinquent-county-balance"
          label="County, Est. Balance"
          value={countyBalance}
          format={dollars}
          info="Allegheny County delinquency across all tax years on record, less recorded payments."
        />
        <SingleValueViz
          id="delinquent-city-total"
          label="City, Total Delinquent"
          value={cityTotal}
          format={dollars}
          info="City of Pittsburgh current and prior delinquent taxes, including penalties and interest."
        />
      </div>

      <section className="mb-6">
        <h3 className="mb-2 text-xl font-bold">
          Allegheny County, by Tax Year
        </h3>
        {!years.length ? (
          <Typography.Note>
            No county delinquent tax records found for this parcel.
          </Typography.Note>
        ) : (
          <>
            <div className="max-w-3xl">
              <Table
                rowLabel="Year"
                columns={[
                  {
                    label: "Original Bill",
                    info: county.fields.orig_bill.info?.notes,
                  },
                  {
                    label: "Penalties",
                    info: county.fields.penalties.info?.notes,
                  },
                  {
                    label: "Interest",
                    info: county.fields.interest.info?.notes,
                  },
                  {
                    label: "Payments",
                    info: county.fields.total_payments.info?.notes,
                  },
                  {
                    label: "Est. Balance",
                    info: "Estimated balance: original bill plus penalties and interest, less payments.",
                  },
                ]}
                totalCol
                totalRow
                rows={[...years.map((y) => y.year), "All Years"]}
                data={[
                  ...years.map((y) => [
                    { value: y.origBill, format: dollars },
                    { value: y.penalties, format: dollars },
                    { value: y.interest, format: dollars },
                    { value: y.payments, format: dollars },
                    { value: balance(y), format: dollars },
                  ]),
                  [
                    { value: grand.origBill, format: dollars },
                    { value: grand.penalties, format: dollars },
                    { value: grand.interest, format: dollars },
                    { value: grand.payments, format: dollars },
                    { value: balance(grand), format: dollars },
                  ],
                ]}
              />
            </div>

            <Typography.Note className="mt-2">
              {years.length} delinquent tax year{years.length === 1 ? "" : "s"}{" "}
              on record. Data as of {formatDate(asOf)}. The county publishes
              penalties and interest as amounts either already paid or currently
              due, so the balance is an estimate rather than a payoff amount.
              {hasCredit
                ? " A negative balance means the payments on record exceed the published charges for that year."
                : ""}
            </Typography.Note>
          </>
        )}
      </section>

      <section className="mb-2">
        <h3 className="mb-2 text-xl font-bold">City of Pittsburgh</h3>
        {!cityRecords.length ? (
          <Typography.Note>
            No City of Pittsburgh delinquency record for this parcel. This
            dataset covers city properties only, so parcels outside the city
            never appear in it.
          </Typography.Note>
        ) : (
          <>
            <div className="mb-2 text-sm">
              Delinquent City of Pittsburgh property taxes, split into the
              current year and everything prior.
            </div>
            <div className="max-w-lg">
              <SingleValueVizCollection
                items={[
                  {
                    id: "city-current-tax",
                    label: "Current Delinquent Tax",
                    value: cityTotals.currentTax,
                    format: dollars,
                    info: city.fields.current_delq_tax.info?.notes,
                  },
                  {
                    id: "city-current-pi",
                    label: "Current Penalties + Interest",
                    value: cityTotals.currentPI,
                    format: dollars,
                    info: city.fields.current_delq_pi.info?.notes,
                  },
                ]}
              />
              <SingleValueVizCollection
                items={[
                  {
                    id: "city-prior-years",
                    label: "Prior Delinquent Years",
                    value: cityTotals.priorYears,
                    info: city.fields.prior_years.info?.notes,
                  },
                  {
                    id: "city-prior-tax",
                    label: "Prior Delinquent Tax",
                    value: cityTotals.priorTax,
                    format: dollars,
                    info: city.fields.prior_delq_tax.info?.notes,
                  },
                  {
                    id: "city-prior-pi",
                    label: "Prior Penalties + Interest",
                    value: cityTotals.priorPI,
                    format: dollars,
                    info: city.fields.prior_delq_pi.info?.notes,
                  },
                ]}
              />
            </div>
            <Typography.Note className="mt-2">
              Current delinquency totals {dollars(cityCurrent)}
              {cityPrior > 0
                ? `, with ${dollars(cityPrior)} outstanding from prior years`
                : ""}
              . Both are included in the estimated total above.
            </Typography.Note>
          </>
        )}
      </section>
    </div>
  );
}
