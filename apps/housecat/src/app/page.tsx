import Image from "next/image";

import CREATELogo from "../assets/logos/create_logo.png";
import WPRDCLogo from "../assets/logos/wprdc-mark-light.png";
import { A, Content } from "@wprdc/ui";
import { BigButton } from "@/components/big-button";

const signupLink = process.env.NEXT_PUBLIC_REQUEST_URL || "/accounts/request";

export default function HousecatHome() {
  return (
    <div className="container mx-auto max-w-screen-lg pb-20 pt-12">
      <div>
        <h2 className="mb-8 text-5xl font-bold">
          Find information on subsidized housing
        </h2>

        <div className="flex flex-col gap-4">
          <div className="mx-auto flex w-fit gap-4">
            <BigButton
              href="/explore"
              title="🗺 Explorer"
              subtitle="Explore all the data on a map"
            />
            <BigButton
              href="/map"
              title="👀 Watchlist"
              subtitle="Lists or projects based on search criteria"
            />
            <BigButton
              href="/search"
              title="🔍 Search"
              subtitle="Find information on subsidized housing"
            />
          </div>
          <div className="mx-auto flex w-fit gap-4">
            <BigButton
              href="https://profiles.wprdc.org/housing"
              title="📊 Indicators"
              subtitle=" Community-level housing statistics"
              small
            />
            <BigButton
              href="/map"
              title="📜 About"
              subtitle="Information about the data and process"
            />
          </div>
        </div>

        <div className="py-8">
          <p className="">
            <span>🗳</span>
            <A href={signupLink}>Click here to apply for access</A>
          </p>
        </div>
        <Content className="">
          <p>
            <strong>
              Affordable housing is a growing issue of regional importance in
              our community.
            </strong>
            {"  "}
            In May, 2016, the City of Pittsburgh&rsquo;s Affordable Housing Task
            Force released{" "}
            <a href="https://apps.pittsburghpa.gov/mayorpeduto/FinalReport_5_31_16.pdf">
              its report
            </a>{" "}
            to the Mayor and City Council. The report called for the creation of
            a centralized, publicly-accessible repository of affordable housing
            data to be hosted by the{" "}
            <a href="https://www.wprdc.org">
              Western Pennsylvania Regional Data Center
            </a>
            . In addition to including lists of deed and income-restricted
            properties, the Task Force also sought to use data to track
            compliance, monitor housing conditions, and establish an
            &lsquo;early warning system&rsquo; when use restrictions change, or
            condition issues threaten overall affordability and family
            stability.
          </p>
          <p>
            To support this goal of using data to proactively monitor threats to
            affordability, the Western Pennsylvania Regional Data Center at the
            University of Pittsburgh and the{" "}
            <a href="https://cmucreatelab.org/">Carnegie Mellon CREATE Lab</a>{" "}
            partnered to develop a frequently-updated collection of data about
            subsidized properties in Allegheny County from approximately 20
            different databases provided by HUD and the Pennsylvania Housing
            Finance Agency (PHFA). This tool launched in April 2022 allows
            people to view data for a project, and filter the data to display a
            subset of properties including those with low inspection scores and
            those that may have their subsidies expire in coming years. Users of
            the data explorer are also able to create watch lists of properties
            whose affordability is at risk. Properties can be viewed on a map,
            with data associated with each property displayed on screen.
          </p>
        </Content>
        <div className="mt-8">
          <a href="https://www.wprdc.org">
            <Image src={WPRDCLogo} alt="WPRDC" height={60} />
          </a>
          <a href="https://cmucreatelab.org/">
            <Image src={CREATELogo} alt="WPRDC" height={120} />
          </a>
        </div>
      </div>
    </div>
  );
}
