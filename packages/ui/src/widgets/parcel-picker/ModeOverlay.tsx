import { BiBuildingHouse } from "react-icons/bi";
import { FaPencil, FaTreeCity } from "react-icons/fa6";

export interface ModeOverLayProps {
  zoom: number;
  drawing?: boolean;
}

export function ModeOverlay({
  zoom,
  drawing,
}: ModeOverLayProps): React.ReactElement {
  if (drawing)
    return (
      <div className="flex items-center space-x-2">
        <div>
          <FaPencil className="size-10" />
        </div>
        <div>
          <div className="text-base font-bold">Drawing selection area</div>
        </div>
      </div>
    );

  return (
    <div className="flex items-center space-x-2">
      <div>
        {zoom > 15 ? (
          <BiBuildingHouse className="size-10" />
        ) : (
          <FaTreeCity className="size-10" />
        )}
      </div>
      <div>
        <div className="text-base font-bold">
          {zoom > 15
            ? "Selecting Individual Parcels"
            : "Selecting Parcels by Neighborhood and Municipality"}
        </div>
        <div className="text-sm italic">
          {zoom > 15 ? (
            <div>
              <span className="font-medium">
                <span>Zoom out</span>
              </span>{" "}
              to select{" "}
              <span className="font-medium">
                Parcels by Neighborhood and/or Municipality
              </span>
            </div>
          ) : (
            <div>
              <span className="font-medium">
                <span>Zoom in</span>
              </span>{" "}
              to select <span className="font-medium">Parcels one-by-one</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
