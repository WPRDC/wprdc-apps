import type { GeoType, Identifiable } from "../shared";

/** Group of specific legend items. One group per interface layer */
export interface LegendGroupOptions extends Identifiable {
  legendItems: LegendItemProps[];
}

/** Individual line in a legend */
export interface LegendItemProps extends Identifiable {
  /** geometry type of associated map layer - used to select an icon **/
  geoType: GeoType;
  /* style props */
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  fillColor?: string;
  fillOpacity?: number;
}
