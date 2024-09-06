/**
 *
 * LayerMenu types
 *
 **/
import type * as React from "react";
import {
  type GeoType,
  type LayerConfig,
  type QualitativeSymbologyProps,
  type SolidSymbologyProps,
} from "@wprdc/types";

export interface LayerMenuProps {
  defaultConfig: LayerConfig<SolidSymbologyProps>;
}

export interface SolidMenuProps {
  value: SolidSymbologyProps["symbology"];
  geoType: GeoType;
}
