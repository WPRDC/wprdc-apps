import { RiCloseCircleLine, RiQuestionLine } from "react-icons/ri";

import {
  affordableHousingSchema,
  ComplexItems,
  SchemaItem,
  SchemaSection,
} from "@/schemata/project";
import { twMerge } from "tailwind-merge";
import {
  fetchAffordableHousingProject,
  fetchAssessmentRecord,
} from "@wprdc/api";
import { cookies } from "next/headers";
import { A, SingleValueVizCollection, Table } from "@wprdc/ui";
import { MapView } from "./map-view";

export interface ProjectViewProps {
  projectID: string;
  isLoading?: boolean;
  onMapLinkPress?: () => void;
}

export async function ProjectView({
  projectID,
  onMapLinkPress,
}: ProjectViewProps) {
  const cookieJar = await cookies();

  const token = cookieJar.get("hct")?.value;

  const project = await fetchAffordableHousingProject(projectID, token);

  if (!project?.name) return <div>Project Missing</div>;

  const projectNames = project.name.split("|");

  const { records } = await fetchAssessmentRecord(project.groups[0]);

  const primaryParcelAssessmentData = records ? records[0] : undefined;

  return (
    <article id="data-dashboard" className="flex flex-col gap-4">
      <div className="border-b border-dashed border-stone-600">
        <h2 className="text-5xl font-bold">{formatTitle(projectNames[0])}</h2>

        <div className="font-mono text-lg font-semibold uppercase">
          <span>{formatAddress(project.propertyStreetAddress)}</span>{" "}
          <span>{formatAddress(project.city)}</span>
          {", PA "}
          <span>{formatAddress(project.zipCode)}</span>
        </div>
      </div>

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

      <section id="highlights">
        <h3 className="mb-4 text-3xl font-black uppercase">Highlighted Data</h3>

        <SingleValueVizCollection
          items={[
            {
              id: "funding",
              label: "Funding Category:",
              value: formatFundingCategory(project.fundingCategory) || "N/A",
            },
            {
              id: "units",
              label: "Est. # of Units:",
              value: project.maxUnits ? project.maxUnits.toString() : "N/A",
            },
            {
              id: "subsidy-exp",
              label: "Subsidy Expiration Date:",
              value: String(project.subsidyExpirationDate).trim() ?? "N/A",
            },
            {
              id: "years-of-service",
              label: "LIHTC Year of Service:",
              value: project.lihtcYearOfService
                ? project.lihtcYearOfService.toString()
                : "N/A",
            },
          ]}
        ></SingleValueVizCollection>

        {!!project.reacScores && (
          <div className="max-w-[300px]">
            <Table
              label="REAC Scores"
              columns={["Year", "Score"]}
              data={Object.entries(project.reacScores)}
            />
          </div>
        )}
      </section>

      <section id="parcels">
        <h3 className="my-4 text-3xl font-black uppercase">Parcels</h3>

        <div className="h-72 w-full border border-black">
          <MapView
            parcelIDs={project.parcels}
            center={[
              parseFloat(project.longitude),
              parseFloat(project.latitude),
            ]}
          />
        </div>

        <p className="mt-4">
          See parcel details in{" "}
          <span className="font-semibold">Parcels N'at</span>
        </p>
        <ul>
          {project.parcels.map((parcel) => (
            <li key={parcel}>
              <A href={`https://parcelsnat.org/explore?parcel=${parcel}`}>
                {parcel}
              </A>
            </li>
          ))}
        </ul>
      </section>

      <section id="all-data">
        <h3 className="my-4 text-3xl font-black uppercase">All Data</h3>
        <div className="w-fit border border-dashed border-stone-600 p-2">
          <p className="text-xs font-semibold uppercase text-stone-800">
            Jump to a dataset:
          </p>
          <nav>
            <ul role="directory" className={"leading-tight"}>
              {Object.entries(affordableHousingSchema).map(
                ([key, { title }]) => {
                  if (
                    !!project[key as keyof ComplexItems] &&
                    !!project[key as keyof ComplexItems]?.length
                  )
                    return (
                      <li key={key}>
                        <A className="text-xs" href={`#${key}`}>
                          {title}
                        </A>
                      </li>
                    );
                  return null;
                },
              )}
            </ul>
          </nav>
        </div>

        {Object.entries(affordableHousingSchema).map(([key, section]) => {
          // @ts-ignore
          const recordData: any[] = project[key as keyof ComplexItems];

          if (!recordData || !recordData.length) return null;

          return (
            <section id={key} key={key} className="mt-4">
              <div className="mb-1.5 flex gap-2">
                <h4 className="text-xl font-bold">{section.title}</h4>

                <div>
                  <A
                    className="font-mono text-xs"
                    type="button"
                    href="#data-dashboard"
                  >
                    back to top
                  </A>
                </div>
              </div>
              {/* for each record in the section*/}
              {recordData.map((record) => (
                <div key={record.slug} className={""}>
                  <MiniTable schemaEntry={section} record={record} />
                </div>
              ))}
            </section>
          );
        })}
      </section>
    </article>
  );
}

interface TableProps<T> {
  schemaEntry: SchemaSection<T>;
  record: T;
}

function MiniTable<T>(props: TableProps<T>) {
  const { schemaEntry, record } = props;

  return (
    <table className={"text-xs"}>
      <tbody>
        {schemaEntry.items.map(({ accessor, label, format }) => {
          const displayValue = formatValue({ format, accessor, label }, record);
          const key = typeof accessor === "string" ? accessor : label;
          return (
            <tr key={key} className="even:bg-stone-100">
              <td className={"border py-0.5 pl-1 pr-2.5 font-semibold"}>
                {label}
              </td>
              <td
                className={twMerge(
                  "border px-1 py-0.5",
                  displayValue === "N/A" && "italic text-stone-700",
                )}
              >
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
      <table className="">
        <tbody>
          {Object.entries(scores).map(([k, v]) => (
            <tr key={k} className="border even:bg-gray-100">
              <td className="pr-4">{k}</td>
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
          <span key={part} className="text-xl italic first:font-medium">
            {!!i && <span> aka </span>}
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
  return <>{parts[0]}</>;
}

export default ProjectView;
