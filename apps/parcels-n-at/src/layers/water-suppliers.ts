import { GeoType, LayerConfig } from "@wprdc/types";

export const waterSuppliers: LayerConfig = {
  slug: "water-suppliers",
  title: "Public Water Supplier Service Areas",
  description: "Service areas of public water authorities.",
  type: GeoType.Polygon,
  publisher: {
    name: "WPRDC",
    homepage: "",
    org: "wprdc",
  },
  source: {
    slug: "water-suppliers",
    title: "Public Water Supplier Service Areas",
    url: "https://data.wprdc.org/dataset/pa-public-water-systems/resource/b214c4d7-edb6-430a-baf3-de83ab0c1b81",
    resourceID: "b214c4d7-edb6-430a-baf3-de83ab0c1b81",
  },
  tileSource: {
    tileJSONSource:
      "https://data.wprdc.org/tiles/table.a7bd36fd-bf2d-4818-b6ef-a010cf039e31._geom",
    sourceLayer: "table.a7bd36fd-bf2d-4818-b6ef-a010cf039e31._geom",
    minZoom: 7,
    maxZoom: 18.8,
  },

  renderOptions: {
    filter: ["==", "CNTY_NAME", "Allegheny"],
  },

  symbology: {
    mode: "simple",
    color: {
      mode: "fixed",
      value: "#78B3F7",
    },
    borderColor: {
      mode: "fixed",
      value: "#091439",
    },
    opacity: { mode: "fixed", value: 0.3 },
    borderWidth: {
      mode: "zoom",
      value: [
        [7, 2],
        [13, 2],
        [15, 4],
        [18, 6],
      ],
    },
    textField: { mode: "expression", expression: ["get", "NAME"] },
    textSize: {
      mode: "zoom",
      value: [
        [8, 8],
        [12, 9],
        [15, 12],
      ],
    },
  },
};

//symbology: {
//     mode: "category",
//     field: "MVA21",
//     categories: [
//       // big ones
//       {
//         value: "PA AMER WATER CO PITTSBURGH DIST",
//         label: "PA AMERICAN",
//       },
//       { value: "PITTSBURGH W AND S AUTH", label: "PITTSBURGH W AND S AUTH" },
//       { value: "MAWC MCKEESPORT SYS", label: "MAWC MCKEESPORT SYS" },
//       { value: "WEST VIEW MUNI AUTH", label: "WEST VIEW MUNI AUTH" },
//       {
//         value: "WILKINSBURG PENN JT WATER AUTH",
//         label: "WILKINSBURG PENN JT WATER AUTH",
//       },
//       { value: "MONROEVILLE MUNI AUTH", label: "MONROEVILLE MUNI AUTH" },
//
//       //others
//       {
//         value: "SEWICKLEY BORO WATER AUTH",
//         label: "SEWICKLEY BORO WATER AUTH",
//       },
//       { value: "FINDLAY TWP MUNI AUTH", label: "FINDLAY TWP MUNI AUTH" },
//       {
//         value: "VA HEALTHCARE SYSTEM HEINZ",
//         label: "VA HEALTHCARE SYSTEM HEINZ",
//       },
//       {
//         value: "CORAOPOLIS WATER AND SEWER AUTHORITY",
//         label: "CORAOPOLIS WATER AND SEWER AUTHORITY",
//       },
//       { value: "BLAWNOX BORO", label: "BLAWNOX BORO" },
//       { value: "HARRISON TWP WATER AUTH", label: "HARRISON TWP WATER AUTH" },
//       { value: "BRADDOCK BORO WATER AUTH", label: "BRADDOCK BORO WATER AUTH" },
//       { value: "CHESWICK BORO WATER DEPT", label: "CHESWICK BORO WATER DEPT" },
//       { value: "EAST DEER TWP WATERWORKS", label: "EAST DEER TWP WATERWORKS" },
//       { value: "OAKMONT BORO MUNI AUTH", label: "OAKMONT BORO MUNI AUTH" },
//       { value: "FOX CHAPEL AUTH", label: "FOX CHAPEL AUTH" },
//       { value: "OAKDALE BORO", label: "OAKDALE BORO" },
//       {
//         value: "SPRINGDALE TWP WATER DEPT",
//         label: "SPRINGDALE TWP WATER DEPT",
//       },
//       { value: "TARENTUM BORO WATER DEPT", label: "TARENTUM BORO WATER DEPT" },
//       { value: "NEVILLE TWP", label: "NEVILLE TWP" },
//       { value: "DUQUESNE MUNI WATERWORKS", label: "DUQUESNE MUNI WATERWORKS" },
//       {
//         value: "HAMPTON SHALER WATER AUTH",
//         label: "HAMPTON SHALER WATER AUTH",
//       },
//
//       {
//         value: "FAWN FRAZER JT WATER AUTH",
//         label: "FAWN FRAZER JT WATER AUTH",
//       },
//       {
//         value: "SPRINGDALE BORO WATER DEPT",
//         label: "SPRINGDALE BORO WATER DEPT",
//       },
//       { value: "ASPINWALL BORO", label: "ASPINWALL BORO" },
//       { value: "PLUM BORO MUNI AUTH", label: "PLUM BORO MUNI AUTH" },
//       { value: "ROBINSON TWP MUNI AUTH", label: "ROBINSON TWP MUNI AUTH" },
//       {
//         value: "WESTERN ALLEGHENY CNTY MUNI AU",
//         label: "WESTERN ALLEGHENY CNTY MUNI AU",
//       },
//       { value: "BRACKENRIDGE BORO WATER", label: "BRACKENRIDGE BORO WATER" },
//       { value: "HARMAR TWP WATER AUTH", label: "HARMAR TWP WATER AUTH" },
//       { value: "ALEPPO TWP AUTH", label: "ALEPPO TWP AUTH" },
//       { value: "MOON TWP MUNI AUTH", label: "MOON TWP MUNI AUTH" },
//       { value: "RESERVE TWP WATER DEPT", label: "RESERVE TWP WATER DEPT" },
//       { value: "RICHLAND TWP MUNI AUTH", label: "RICHLAND TWP MUNI AUTH" },
//       { value: "EDGEWORTH BORO MUNI AUTH", label: "EDGEWORTH BORO MUNI AUTH" },
//     ],
//   },
