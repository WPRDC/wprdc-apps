import { TbCompass, TbDownload } from "react-icons/tb";
import { A } from "@wprdc/ui";

export default function Home(): React.ReactElement {
  return (
    <main className="w-full space-y-4 overflow-auto px-2 pt-4 lg:space-y-12 lg:px-12 lg:pt-24">
      <h1 className="text-center text-2xl font-bold md:text-3xl lg:text-5xl">
        Welcome to the Parcel&apos;s N&apos;at!
      </h1>

      <p className="text-center text-lg font-medium">
        Parcels N&apos;at makes it easy to explore and download parcel data from
        the{" "}
        <A href="https://wprdc.org">
          Western Pennsylvania Regional Data Center (WPRDC)
        </A>
        .
      </p>
      <div className="text-center text-xl font-bold italic lg:text-3xl">
        Select a tool
      </div>

      <div className="mx-auto flex w-full max-w-(--breakpoint-md) flex-col items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
        <a
          className="hover:bg-primary/20 flex w-full flex-col items-center rounded border-2 border-black p-3 shadow-md transition-shadow hover:shadow-xl lg:aspect-video lg:w-96"
          href="/explore"
        >
          <div className="mx-auto mb-3 flex items-center text-center text-lg font-bold md:text-xl lg:text-3xl">
            <TbCompass /> Data Explorer
          </div>
          <div className="px-4 text-center text-lg leading-normal font-medium">
            Explore open data for parcels in Allegheny County.
          </div>
        </a>

        <a
          className="hover:bg-primary/20 flex aspect-video flex-col items-center rounded border-2 border-black p-3 shadow-md transition-shadow hover:shadow-xl lg:w-96"
          href="/bulk"
        >
          <div className="mx-auto mb-3 flex items-center text-center text-lg font-bold md:text-xl lg:text-3xl">
            <TbDownload />
            Bulk Downloader
          </div>
          <div className="px-4 text-center text-lg leading-normal font-medium">
            Download data about Allegheny County parcels. Select individually,
            by neighborhood, or by drawing a capture region.
          </div>
        </a>
      </div>
    </main>
  );
}
