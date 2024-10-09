/**
 *
 * LayerMenu types
 *
 **/
import {
  type GeoType,
  type LayerConfig,
  type QualitativeSymbologyProps,
  type SolidSymbologyProps,
} from "@wprdc/types";
import type * as React from "react";

export interface LayerMenuProps {
  defaultConfig: LayerConfig<SolidSymbologyProps>;
}

export interface SolidMenuProps {
  value: SolidSymbologyProps["symbology"];
  geoType: GeoType;
}
