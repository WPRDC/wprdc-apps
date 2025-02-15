import {
  fetchAffordableHousingProjects,
  fetchLoggedInToHousecat,
} from "@wprdc/api";
import { MapFilterForm } from "@/components/map-filter-form.tsx";
import { FilterFormValues } from "@/types.ts";
import { cookies } from "next/headers";
import { ProjectIndex } from "@wprdc/types";
import { Suspense } from "react";
import SelectionLink from "@/app/watchlist/link.tsx";
import ProjectView from "@/components/project-view.tsx";
import { redirect } from "next/navigation";

interface WatchlistParams extends FilterFormValues {
  id?: string;
}

export default async function WatchListPage({
  searchParams,
}: {
  searchParams: Promise<WatchlistParams>;
}) {
  const cookieJar = await cookies();
  const token = cookieJar.get("hct")?.value;

  const loggedIn = await fetchLoggedInToHousecat(token);
  console.log(loggedIn);
  if (!loggedIn) {
    redirect("/accounts/login");
  }

  const params = await searchParams;

  /** Fetch projects based on filter criteria */
  async function getProjects(): Promise<ProjectIndex[]> {
    if (token && params) {
      const response = await fetchAffordableHousingProjects(
        token,
        params as Record<string, string>,
      );

      return response.results;
    }

    return [];
  }

  const projects = await getProjects();

  return (
    <div className="container mx-auto max-w-screen-xl">
      <h2 className="mb-2 mt-4 text-5xl font-bold">Watchlists</h2>
      <h3 className="mb-2 mt-4 text-4xl font-bold">Select Filter Criteria</h3>
      <div className="mb-4 text-lg">
        Select one or more filter criteria below to generate a watchlist of
        matching projects.
      </div>

      <MapFilterForm params={params} />

      <h3 className="mb-4 mt-12 border-t-2 border-black pt-4 text-4xl font-bold">
        Select a project to see details
      </h3>

      <div className="mb-8 max-h-72 w-fit overflow-y-auto border border-dashed p-2">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col gap-2">
            <Suspense>
              <SelectionLink id={`${project.id}`} name={project.name} />
            </Suspense>
          </div>
        ))}

        {!projects.length && (
          <div>Select and apply filter criteria to find matching projects.</div>
        )}
      </div>

      <div>
        <h3 className="mb-4 mt-12 border-t-2 border-black pt-4 text-4xl font-bold">
          See data for selected Project
        </h3>
        <div className="border border-dashed p-2">
          {!!params.id ? (
            <ProjectView projectID={params.id} />
          ) : (
            <div className="italic">
              Apply filter criteria select a project to see details
            </div>
          )}
        </div>
      </div>
      <div className="h-48" />
    </div>
  );
}
