import type {
  PropertyAssessment,
  PropertySaleTransaction,
  Value,
} from "@wprdc/types";
import { formatDate, formatDollars, Table, Typography } from "@wprdc/ui";
import type { MultiSourceSectionProps } from "../types";

interface SimpleSalesRecord {
  date: string;
  price?: number;
  type?: string;
}


export function SalesSection({
  sales,
  assessment,
}: MultiSourceSectionProps<{
  sales: PropertySaleTransaction;
  assessment: PropertyAssessment;
}>): React.ReactElement {
  const { records } = sales;
  const assessmentRecord = assessment.records[0];

  const assessmentSales: SimpleSalesRecord[] = [];
  if (assessmentRecord.SALEDATE) {
    assessmentSales.push({
      date: formatDate(assessmentRecord.SALEDATE) as string,
      type: assessmentRecord.SALEDESC,
      price: assessmentRecord.SALEPRICE,
    });
  }
  if (assessmentRecord.PREVSALEDATE) {
    assessmentSales.push({
      date: formatDate(assessmentRecord.PREVSALEDATE) as string,
      type: undefined,
      price: assessmentRecord.PREVSALEPRICE,
    });
  }
  if (assessmentRecord.PREVSALEDATE2) {
    assessmentSales.push({
      date: formatDate(assessmentRecord.PREVSALEDATE2) as string,
      type: undefined,
      price: assessmentRecord.PREVSALEPRICE2,
    });
  }

  if (!records.length && !assessmentSales.length)
    return (
      <Typography.Note>No property sale transactions found</Typography.Note>
    );

  const recordSales: SimpleSalesRecord[] = records.map((record) => ({
    date: record.SALEDATE,
    price: record.PRICE,
    type: record.SALEDESC,
  }));

  // add any sales from assessment data that are missing in sales data
  const saleDates = new Set(recordSales.map((sale) => sale.date));
  for (const sale of assessmentSales) {
    if (!!sale.date && !!sale.price && !saleDates.has(sale.date)) {
      recordSales.push(sale);
    }
  }

  const orderedSales = recordSales
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    .reverse();


  return (
    <div className="max-w-lg">
      <Table
        columns={[
          { label: "Price", info: assessment.fields.SALEPRICE.info?.notes },
          { label: "Type", info: assessment.fields.SALEDESC.info?.notes },
        ]}
        rows={orderedSales.map(({ date }) => formatDate(date) as string)}
        rowLabel={{
          label: "Sale Date",
          info: assessment.fields.SALEDATE.info?.notes,
        }}
        data={orderedSales.map(({ price, type }) => [
          formatDollars(price),
          {
            value: type,
            format: (t?: Value | null) =>
              t ?? <Typography.Note>not recorded</Typography.Note>,
          },
        ])}
      />
    </div>
  );
}
