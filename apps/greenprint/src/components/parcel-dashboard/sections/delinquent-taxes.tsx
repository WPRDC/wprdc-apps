import type { DelinquentTax, Value } from "@wprdc/types";
import {
  formatDate,
  formatDollars,
  SingleValueViz,
  Table,
  Typography,
} from "@wprdc/ui";
import React from "react";
import type { SectionProps } from "../types";

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
  fields,
  records,
}: SectionProps<DelinquentTax>): React.ReactElement {
  if (!records.length)
    return <Typography.Note>No delinquent tax records found.</Typography.Note>;

  // One row per year today, but sum by year so repeated filings don't hide data.
  const byYear = records.reduce<Record<string, YearTotals>>((acc, record) => {
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
  }, {});

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

  const asOf = records[0].asof_date;

  // Payments can exceed the published charges, which reads as a bug without explanation.
  const hasCredit = years.some((y) => balance(y) < 0) || balance(grand) < 0;

  return (
    <div>
      <div className="mb-4 max-w-sm">
        <SingleValueViz
          id="delinquent-total-balance"
          label="Estimated Total Balance"
          value={balance(grand)}
          format={dollars}
          info={
            "Original tax bills plus penalties and interest, less recorded payments, added across " +
            "every delinquent tax year on record for this parcel. Penalties and interest are published " +
            "as amounts either already paid or currently due, so treat this as an estimate rather than " +
            "a payoff amount."
          }
        />
      </div>

      <div className="max-w-3xl">
        <Table
          rowLabel="Year"
          columns={[
            { label: "Original Bill", info: fields.orig_bill.info?.notes },
            { label: "Penalties", info: fields.penalties.info?.notes },
            { label: "Interest", info: fields.interest.info?.notes },
            { label: "Payments", info: fields.total_payments.info?.notes },
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
        {years.length} delinquent tax year{years.length === 1 ? "" : "s"} on
        record. Data as of {formatDate(asOf)}. The county publishes penalties
        and interest as amounts either already paid or currently due, so the
        balance is an estimate rather than a payoff amount.
        {hasCredit
          ? " A negative balance means the payments on record exceed the published charges for that year."
          : ""}
      </Typography.Note>
    </div>
  );
}
