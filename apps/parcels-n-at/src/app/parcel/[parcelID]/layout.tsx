import { Navbar } from "@wprdc/ui";
import { ParcelSearch } from "@/components/parcel-search";

export default function ParcelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <div>
      <Navbar
        darkLogoSrc="/wprdc-mark-dark.png"
        logoSrc="/wprdc-mark-light.png"
        projectTitle={
          <div className="bg-primary w-fit rounded-sm border border-stone-400 px-1.5 py-0 font-mono text-lg font-black">
            Parcels n&apos;at
          </div>
        }
      >
        <div className="w-full min-w-64">
          <ParcelSearch />
        </div>
      </Navbar>
      <main>{children}</main>
    </div>
  );
}
