import type { PropertyAssessment, PropertySaleTransaction } from "@wprdc/types";
import { InfoTooltip, Typography } from "../../../components";
import type { MultiSourceSectionProps } from "../types";
import { formatDate, formatDollars } from "../../../util";

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
  const { records, fields } = sales;
  const assessmentRecord = assessment.records[0];

  const assessmentSales: SimpleSalesRecord[] = [];
  if (assessmentRecord.SALEDATE) {
    assessmentSales.push({
      date: formatDate(assessmentRecord.SALEDATE),
      type: assessmentRecord.SALEDESC,
      price: assessmentRecord.SALEPRICE,
    });
  }
  if (assessmentRecord.PREVSALEDATE) {
    assessmentSales.push({
      date: formatDate(assessmentRecord.PREVSALEDATE),
      type: undefined,
      price: assessmentRecord.PREVSALEPRICE,
    });
  }
  if (assessmentRecord.PREVSALEDATE2) {
    assessmentSales.push({
      date: formatDate(assessmentRecord.PREVSALEDATE2),
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

  if (!recordSales.length)
    return <Typography.Note>No transactions found</Typography.Note>;

  return (
    <table className="text-sans w-full max-w-full table-auto overflow-x-hidden text-sm">
      <thead className="border-b-2 border-black font-sans">
        <tr>
          <th className="w-24">
            Date <InfoTooltip info="Date the sale occurred." />
          </th>
          <th>
            Price <InfoTooltip info={fields.PRICE.info?.notes} />
          </th>
          <th>
            Type
            <InfoTooltip info={fields.SALEDESC.info?.notes} />
          </th>
        </tr>
      </thead>
      <tbody>
        {recordSales
          .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
          .reverse()
          .map(({ date, price, type }) => (
            <tr className="font-mono even:bg-stone-100" key={date}>
              <th className="pr-2 text-left font-sans">
                {new Date(date).toLocaleDateString(undefined, {
                  timeZone: "UTC",
                })}
              </th>
              <td className="min-w-12 pr-3 text-right">
                {formatDollars(price)}
              </td>
              <td className="overflow-x-hidden truncate">
                {type ?? <Typography.Note>not recorded</Typography.Note>}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
