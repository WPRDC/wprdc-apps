import Link from "next/link";
import Image from "next/image";

import CREATELogo from "../assets/logos/create_logo.png";
import WPRDCLogo from "../assets/logos/wprdc-square.png";

import { twMerge } from "tailwind-merge";

const signupLink = process.env.NEXT_PUBLIC_REQUEST_URL || "/accounts/request";

interface BigButtonProps {
  href: string;
  title: string;
  subtitle: string;
  small?: boolean;
}

export function BigButton({
  href,
  title,
  subtitle,
  small = false,
}: BigButtonProps) {
  return (
    <Link href={href} className="">
      <div className="">{title}</div>
      <div className="">{subtitle}</div>
    </Link>
  );
}

export default function HousecatHome() {
  return (
    <div className="flex flex-row-reverse">
      <div>
        <h2 className="">Find information on subsidized housing</h2>
        <div className="flex flex-col-reverse lg:flex-col">
          <div>
            <div className="">
              <BigButton
                href="/map"
                title="🗺 Map"
                subtitle="Explore all the data on a map"
              />
              <BigButton
                href="/search"
                title="🔍 Search"
                subtitle="Find information on subsidized housing"
              />
              <BigButton
                href="/map"
                title="🗺 Map"
                subtitle="Explore all the data on a map"
              />
            </div>
            <div className="">
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
              <BigButton
                href="/map"
                title="🗺 Map"
                subtitle="Explore all the data on a map"
              />
            </div>
          </div>
          <div>
            <p className="">
              <span>🗳</span>
              <Link href={signupLink}>Click here to apply for access</Link>
            </p>
          </div>
        </div>
        <div className="">
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
        </div>
        <div className="">
          <a href="https://www.wprdc.org">
            <Image src={WPRDCLogo} alt="WPRDC" />
          </a>
          <a href="https://cmucreatelab.org/">
            <Image src={CREATELogo} alt="WPRDC" />
          </a>
        </div>
      </div>
    </div>
  );
}
