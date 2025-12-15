import { Spinner } from "../../components";
import {
  municipalities,
  parcelLayer,
  pittsburghNeighborhoodLayer,
} from "../../layers";

export interface StatusOverlayProps {
  selectedFeatures: Record<string, string[]>;
  parcelsUnderDrawing: number;
  parcelsUnderDrawingIsLoading: boolean;
}

export function StatusOverlay({
  selectedFeatures,
  parcelsUnderDrawing,
  parcelsUnderDrawingIsLoading,
}: StatusOverlayProps): React.ReactElement {
  const numSelectedParcels = selectedFeatures[parcelLayer.slug].length;
  const numSelectedNeighborhoods =
    selectedFeatures[pittsburghNeighborhoodLayer.slug].length;
  const numSelectedMunicipalities =
    selectedFeatures[municipalities.slug].length;

  return (
    <div className="absolute right-4 bottom-12 rounded border border-stone-700 bg-white p-2">
      <table>
        <tbody className="text-xs">
          <tr>
            <td className="pr-1 text-right font-mono text-base font-semibold">
              {numSelectedParcels}
            </td>
            <td>Parcel{numSelectedParcels === 1 ? "" : "s"} selected</td>
          </tr>
          <tr>
            <td className="pr-1 text-right font-mono text-base font-semibold">
              {numSelectedNeighborhoods}
            </td>
            <td>Neighborhood{numSelectedParcels === 1 ? "" : "s"} selected</td>
          </tr>
          <tr>
            <td className="pr-1 text-right font-mono text-base font-semibold">
              {numSelectedMunicipalities}
            </td>
            <td>
              Municpalit{numSelectedMunicipalities === 1 ? "y" : "ies"} selected
            </td>
          </tr>
          <tr>
            <td className="pr-1 text-right font-mono text-base font-semibold">
              {parcelsUnderDrawingIsLoading ? (
                <div className="flex h-6 items-center">
                  <div className="w-8">
                    <Spinner size="S" />
                  </div>
                </div>
              ) : (
                parcelsUnderDrawing
              )}
            </td>

            <td>
              Parcel{parcelsUnderDrawing === 1 ? "" : "s"} under drawn area
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
