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
          {zoom > 15 && "Selecting Individual Parcels"}
          {zoom <= 15 &&
            zoom >= 10 &&
            "Selecting Parcels by Neighborhood and Municipality"}
          {zoom < 10 && "Selecting Municipality"}
        </div>

        <div className="text-sm italic">
          {zoom > 15 && (
            <div>
              <span className="font-medium">Zoom out</span> to select{" "}
              <span className="font-medium">
                Parcels by Pittsburgh Neighborhood and/or Municipality
              </span>
            </div>
          )}
          {zoom <= 15 && zoom >= 10 && (
            <div>
              <div>
                <span className="font-medium">Zoom in</span> to select{" "}
                <span className="font-medium">Parcels one-by-one</span>
              </div>
              <div>
                <span className="font-medium">Zoom out</span> to select{" "}
                <span className="font-medium">
                  By Municipalities (including Pittsburgh)
                </span>
              </div>
            </div>
          )}
          {zoom < 10 && (
            <div>
              <span className="font-medium">Zoom in</span> to select{" "}
              <span className="font-medium">
                Parcels by Pittsburgh Neighborhood and/or Municipality
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
