import { A } from "@wprdc/ui";

export default async function AboutPage() {
  return (
    <article className="container mx-auto flex max-w-5xl flex-col space-y-4 px-4 py-12 lg:text-lg">
      <h1 className="mb-8 text-5xl font-bold">About Parcels N&apos;at</h1>

      <p>
        Parcels N&apos;at makes it easy to explore and download parcel data from
        the{" "}
        <A href="https://wprdc.org">
          Western Pennsylvania Regional Data Center (WPRDC)
        </A>
        .
      </p>
      <p>
        Use <A href="/explore">the Explorer</A> to view data parcel-by-parcel.
        You can look up data about your home, a local landmark or any other
        property in Allegheny County.
      </p>
      <p>
        Use <A href="/bulk">the Bulk Downloader</A> to download data for
        multiple properties with the data want from a variety of sources.
      </p>

      <h2 className="mt-8 mb-2 text-3xl font-bold">Technical Details</h2>
      <h3 className="mt-8 mb-2 text-2xl font-bold">Source Code</h3>
      <p>
        You can find the source code for this application on in our{" "}
        <A
          href="https://github.com/wprdc/wprdc-apps"
          target="_blank"
          rel="noreferrer"
        >
          apps monorepo
        </A>
        .
      </p>

      <h3 className="mt-8 mb-2 text-2xl font-bold">
        Powered by SpaceRAT technology!
      </h3>

      <p>
        Aggregate statistics in the <A href="/explore">Explorer</A> view uses
        our{" "}
        <A
          href="https://github.com/wprdc/spacerat"
          target="_blank"
          rel="noreferrer"
        >
          <strong>Spatial Relational Toolkit</strong> library (SpaceRAT)
        </A>
        .
      </p>

      <div>
        <p>SpaceRAT provides realtime aggregate statistics by</p>
        <ol className="list-inside list-decimal pl-4">
          <li>
            maintaining a custom{" "}
            <A
              href="https://en.wikipedia.org/wiki/Gazetteer"
              target="_blank"
              rel="noreferrer"
            >
              gazetteer
            </A>{" "}
            of local geographies
          </li>
          <li>
            and by defining how data in{" "}
            <A href="https://data.wprdc.org" target="_blank" rel="noreferrer">
              the data center
            </A>{" "}
            describes those geographies.
          </li>
        </ol>
      </div>
    </article>
  );
}
