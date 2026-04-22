import { GeoType } from "@/types";
import { TbLine, TbPoint, TbPolygon } from "react-icons/tb";

export interface AvatarProps {
  geoType: GeoType;
  className?: string;
}

export function Avatar({ geoType, className }: AvatarProps) {
  switch (geoType) {
    case GeoType.Point:
      return <TbPoint className={className} />;
    case GeoType.Line:
      return <TbLine className={className} />;
    case GeoType.Polygon:
    default:
      return <TbPolygon className={className} />;
  }
}
