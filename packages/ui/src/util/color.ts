import chroma from "chroma-js";
import { type ColorOption } from "../components";

chroma.scale();
export const defaultSwatchCollection: ColorOption[] = chroma
  .scale("Paired")
  .colors(12)
  .map((c) => ({
    id: c,
    color: c,
  }));
