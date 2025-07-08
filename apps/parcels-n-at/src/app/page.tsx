import { TbCompass, TbDownload } from "react-icons/tb";

export default function Home(): React.ReactElement {
  return (
    <main className="mx-auto max-w-screen-lg space-y-12 px-12 pt-24">
      <h1 className="text-center text-5xl font-bold">
        Welcome to the Parcel&apos;s N&apos;at!
      </h1>
      <div className="text-center text-3xl font-bold">Select a tool</div>

      <div className="mx-auto flex w-full max-w-screen-md flex-col items-center space-y-12">
        <a
          className="hover:bg-primary/20 flex h-48 w-96 flex-col items-center rounded border-2 border-black p-3 shadow transition-shadow hover:shadow-xl"
          href="/explore"
        >
          <div className="mx-auto mb-3 flex items-center text-center text-3xl font-bold">
            <TbCompass /> Data Explorer
          </div>
          <div className="px-4 text-center text-lg font-medium leading-normal">
            Explore open data for parcels in Allegheny County.
          </div>
        </a>

        <a
          className="hover:bg-primary/20 flex h-48 w-96 flex-col items-center rounded border-2 border-black p-3 shadow transition-shadow hover:shadow-xl"
          href="/bulk"
        >
          <div className="mx-auto mb-3 flex items-center text-center text-3xl font-bold">
            <TbDownload />
            Bulk Downloader
          </div>
          <div className="px-4 text-center text-lg font-medium leading-normal">
            Download data about Allegheny County parcels. Select individually,
            by neighborhood, or by drawing a capture region.
          </div>
        </a>
      </div>
    </main>
  );
}
