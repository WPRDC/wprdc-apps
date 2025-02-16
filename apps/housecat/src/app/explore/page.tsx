/**
 *
 * MapPage
 *
 */

import ProjectView from "@/components/project-view";
import { Suspense } from "react";
import { NavMap } from "@/components/map-interface.tsx";
import { LoadingMessage } from "@wprdc/ui";
import { fetchLoggedInToHousecat } from "@wprdc/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Params {
  id: string;
}

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const { id } = await searchParams;

  const cookieJar = await cookies();
  const token = cookieJar.get("hct")?.value;

  const loggedIn = await fetchLoggedInToHousecat(token);
  if (!loggedIn) {
    redirect("/accounts/login");
  }

  return (
    <div className="flex w-full">
      <div className="w-1/2">
        <NavMap />
      </div>

      <div className="h-full w-1/2 overflow-y-scroll border-l-2 border-black p-4 pb-16">
        {!!id && (
          <Suspense
            key={id}
            fallback={
              <div className="w-full py-16">
                <LoadingMessage />
              </div>
            }
          >
            <ProjectView projectID={id} />
          </Suspense>
        )}

        {!id && (
          <section id="intro" className="">
            <div className="flex flex-col gap-2 text-lg">
              <h2 className="text-5xl font-bold">About HouseCat</h2>
              <p>
                Affordable housing is a growing issue of regional importance in
                our community. In May, 2016, the City of Pittsburgh&rsquo;s
                Affordable Housing Task Force released{" "}
                <a href="https://apps.pittsburghpa.gov/mayorpeduto/FinalReport_5_31_16.pdf">
                  its report
                </a>{" "}
                to the Mayor and City Council. The report called for the
                creation of a centralized, publicly-accessible repository of
                affordable housing data to be hosted by the{" "}
                <a href="https://www.wprdc.org">
                  Western Pennsylvania Regional Data Center
                </a>
                . In addition to including lists of deed and income-restricted
                properties, the Task Force also sought to use data to track
                compliance, monitor housing conditions, and establish an
                &lsquo;early warning system&rsquo; when use restrictions change,
                or condition issues threaten overall affordability and family
                stability.
              </p>
              <p>
                To support this goal of using data to proactively monitor
                threats to affordability, the Western Pennsylvania Regional Data
                Center at the University of Pittsburgh and the{" "}
                <a href="https://cmucreatelab.org/">
                  Carnegie Mellon CREATE Lab
                </a>{" "}
                partnered to develop a frequently-updated collection of data
                about subsidized properties in Allegheny County from
                approximately 20 different databases provided by HUD and the
                Pennsylvania Housing Finance Agency (PHFA). This tool launched
                in April 2022 allows people to view data for a project, and
                filter the data to display a subset of properties including
                those with low inspection scores and those that may have their
                subsidies expire in coming years. Users of the data explorer are
                also able to create watch lists of properties whose
                affordability is at risk. Properties can be viewed on a map,
                with data associated with each property displayed on screen.
              </p>
            </div>
            <p className="mt-12 w-fit text-4xl font-semibold italic">
              ← Click on the map to explore the data
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
