import {
  RiCloseCircleLine,
  RiMapPin2Fill,
  RiPrinterFill,
  RiQuestionLine,
} from "react-icons/ri";

import { ProjectIndexDetails } from "@wprdc/types";
import { Button, LoadingMessage } from "@wprdc/ui";

import {
  affordableHousingSchema,
  ComplexItems,
  SchemaItem,
  SchemaSection,
} from "@/schemata/project";
import { twMerge } from "tailwind-merge";

export interface ProjectViewProps {
  project: ProjectIndexDetails;
  isLoading?: boolean;
  onMapLinkPress?: () => void;
}

export function ProjectView({
  project,
  isLoading,
  onMapLinkPress,
}: ProjectViewProps) {
  if (!!isLoading) return <LoadingMessage />;
  if (!project) return <div />;

  function handlePrint() {
    if (!!window) {
      window.print();
    }
  }

  return (
    <div id="data-dashboard" className={""}>
      <div className={""}>
        <div>
          <div className={""}>
            <div className={""}>
              {!!project.propertyId && (
                <>
                  <span className={""}>ID: </span>
                  <span className={""}>{project.propertyId}</span>
                </>
              )}
            </div>
            <div className={""}>
              {!!onMapLinkPress && (
                <Button onPress={onMapLinkPress} variant="secondary">
                  <RiMapPin2Fill /> <span>Show on Map </span>
                </Button>
              )}
              <Button onPress={handlePrint}>
                <RiPrinterFill />
              </Button>
            </div>
          </div>
          <h2 className={""}>{formatTitle(project.name)}</h2>
        </div>

        <div className={""}>{formatAddress(project.propertyStreetAddress)}</div>

        {!!project.status && (
          <div>
            <h3>Status</h3>
            <div className={""}>
              {project.status === "Closed" && <RiCloseCircleLine />}
              {project.status === "Unknown" && <RiQuestionLine />}
              <span>{project.status}</span>
            </div>
          </div>
        )}

        <div className={""}>
          <h3>Quick Facts</h3>
          <div>
            <strong>Subsidy Expiration Date:</strong>{" "}
            <span>{project.subsidyExpirationDate || "N/A"}</span>
          </div>
          <div>
            <strong>LIHTC Year of Service:</strong>{" "}
            <span>{project.lihtcYearOfService || "N/A"}</span>
          </div>
          <div>
            <strong>Est. # of Units:</strong>{" "}
            <span>{project.maxUnits || "N/A"}</span>
          </div>
          <div>
            <strong>Funding Category:</strong>{" "}
            <span>
              {formatFundingCategory(project.fundingCategory) || "N/A"}
            </span>
          </div>
          <div>
            <strong>REAC Scores:</strong>{" "}
            <span>{formatREACScores(project.reacScores) || "N/A"}</span>
          </div>
        </div>
        <div>
          <h3>All Data</h3>
          <p className={""}>Jump to a dataset:</p>
          <ul role="directory" className={""}>
            {Object.entries(affordableHousingSchema).map(([key, { title }]) => {
              if (
                !!project[key as keyof ComplexItems] &&
                !!project[key as keyof ComplexItems]?.length
              )
                return (
                  <li key={key}>
                    <a href={`#${key}`}>{title}</a>
                  </li>
                );
              return null;
            })}
          </ul>

          {Object.entries(affordableHousingSchema).map(([key, section]) => {
            const recordData: any[] = project[key as keyof ComplexItems];

            if (!recordData || !recordData.length) return null;

            return (
              <section id={key} key={key} className={""}>
                <h4>{section.title}</h4>
                <span className={""}>
                  <a type="button" href="#data-dashboard">
                    🔝
                  </a>
                </span>
                {/* for each record in the section*/}
                {recordData.map((record) => (
                  <div key={record.slug} className={""}>
                    <MiniTable schemaEntry={section} record={record} />
                  </div>
                ))}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface TableProps<T> {
  schemaEntry: SchemaSection<T>;
  record: T;
}

function MiniTable<T>(props: TableProps<T>) {
  const { schemaEntry, record } = props;

  return (
    <table className={""}>
      <tbody>
        {schemaEntry.items.map(({ accessor, label, format }) => {
          const displayValue = formatValue({ format, accessor, label }, record);
          const key = typeof accessor === "string" ? accessor : label;
          return (
            <tr key={key}>
              <td className={""}>{label}</td>
              <td className={twMerge("", displayValue === "N/A" && "")}>
                {displayValue}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function formatValue<T>(
  { format, accessor }: SchemaItem<T>,
  record: T,
): React.ReactNode | null {
  // fixme: figure out this accessor typing
  const value: React.ReactNode =
    typeof accessor === "function"
      ? accessor(record)
      : (record[accessor] as React.ReactNode);

  if (value === null || value === undefined || value === "") return "N/A";

  switch (format) {
    case "percent":
      let tmpVal: number = value as number;
      if (tmpVal > 1) {
        tmpVal /= 100;
      }
      return tmpVal.toLocaleString("en-US", { style: "percent" });
    case "money":
      return (value as number).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    case "date":
      return new Date(value as string).toLocaleDateString();
    case "string":
    default:
      return value;
  }
}

function formatREACScores(scores?: Record<string, string>) {
  if (!!scores && !!Object.keys(scores).length) {
    return (
      <table className={""}>
        <tbody>
          {Object.entries(scores).map(([k, v]) => (
            <tr key={k}>
              <td>
                <strong>{k}:</strong>
              </td>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return null;
}

function formatFundingCategory(fc?: string): string | null {
  if (!!fc) return fc.replaceAll("|", " / ");
  return null;
}

/**
 * If alternative names exist, separate them so that they can
 * be styled differently.
 */
function formatTitle(title: string): React.ReactNode {
  const parts = title.split("|");
  if (parts.length > 1)
    return (
      <>
        {parts.map((part, i) => (
          <span key={part}>
            {!!i && <span>aka </span>}
            {part}
          </span>
        ))}
      </>
    );
  return <span>{parts[0]}</span>;
}

function formatAddress(addr?: string | null): React.ReactNode {
  if (!addr) return "";

  const parts = addr.split("|");
  if (parts.length > 1)
    return (
      <ul>
        {parts.map((part, i) => {
          let conj = null;
          if (!!i) {
            if (part.toUpperCase() === "SCATTERED SITES") {
              conj = "and";
            } else {
              conj = "and/or";
            }
          }
          return (
            <li key={part}>
              {!!conj && <span>{conj}</span>}
              {part}
            </li>
          );
        })}
      </ul>
    );
  return <p>{parts[0]}</p>;
}

export default ProjectView;
