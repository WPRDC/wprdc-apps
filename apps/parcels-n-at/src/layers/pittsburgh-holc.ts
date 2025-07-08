import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const pittsburghHOLC: LayerConfig = {
  slug: "pittsburgh-holc",
  title: "HOLC \"Redline\" Grades",
  description:
    "Redlining Maps from the Home Owners Loan Corporation (HOLC), 1937",
  warning: `In the 1930’s the Home Owners’ Loan Corporation (a U.S. Government Agency) developed maps for many cities around the country depicting housing investment risk. The maps graded communities on a four-part scale ranging from “A” to “D,” with the riskiest communities depicted using the color red on maps. While there is no evidence these neighborhood descriptions or maps were used to approve or deny loans, the grades and assessments were a reflection of racist attitudes and prejudices, and shaped perceptions of communities for generations.

Assigning identities to neighborhoods and people living there in this way creates stigma and perpetuates spatial hierarchies. When places are treated as persistently inferior, we legitimize injustice, discrimination, and harm to these communities and the people connected with them. We include these racist depictions from the HOLC redlining maps in Parcels N’At as a measure of persistent structural racism.

In 2021, to center our work to develop housing data products in racial equity and fairness, staff at the Regional Data Center made a listing of racist and prejudicial historical and contemporary policies and practices (or lack thereof) that impact housing equity today. Redlining is just one of these practices. Our list includes:

- Residential discrimination including steering, denials, refusal to accept vouchers, and operation of exclusionary sales practices;
- Lending discrimination including redlining, predatory lending, risk-based pricing, discriminatory appraisals, and contemporary inequitable denials in home lending by race and place;
- Predatory extraction includes equity stripping, blockbusting, and other predatory home acquisition practices. Charging non-white people comparatively more for substandard or poorer-condition housing is also a predatory practice;
- Inequitable neighborhood investments, services, and assessments - including housing funding, school funding, school assignments, school closings, siting of affordable housing, public services, and property assessments;
- State-level limitations on local actions by suburban/rural legislators, including  regulations, limitations on use of tools like eminent domain, and limits on ability to raise revenue.
- Restrictive codes and laws, such as racial covenants, restrictive zoning, and age-based regulations;
- Harassment;
- Lack of inclusive affordable housing and design requirements;
- Displacement and gentrification, including urban renewal; and
- Voting rights limitations and other forms of excluding community residents from decision-making processes.`,
  type: GeoType.Polygon,
  publisher: {
    name: "Allegheny County",
    homepage: "https://www.alleghenycounty.us/",
    org: "allegheny-county",
  },

  source: {
    slug: "pittsburgh-holc",
    title: "Redlining",
    url: "https://data.wprdc.org/dataset/redlining-maps-from-the-home-owners-loan-corporation",
    resourceID: "9f67567a-a4d8-455f-804e-d22db49318a0",
  },

  tileSource: {
    tileJSONSource:
      "https://data.wprdc.org/tiles/table.9f67567a-a4d8-455f-804e-d22db49318a0._geom",
    sourceLayer: "table.9f67567a-a4d8-455f-804e-d22db49318a0._geom",
    minZoom: 7,
    maxZoom: 18.8,
  },

  symbology: {
    mode: "category",
    field: "holc_grade",
    categories: [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "C", label: "C" },
      { value: "D", label: "D" },
    ],

    color: {
      mode: "category",
      submode: "simple",
      value: {
        A: "#537f4d",
        B: "#53818c",
        C: "#c6bd63",
        D: "#a95861",
      },
    },

    borderColor: {
      mode: "fixed",
      value: "#000",
    },
    opacity: {
      mode: "fixed",
      value: 0.8
    },
    borderOpacity: {
      mode: "zoom",
      value: [
        [8, 1],
        [14.5, 1],
        [15, 0],
      ],
    },
    borderWidth: {
      mode: "zoom",
      value: [
        [8, 1],
        [12, 1],
        [14.5, 2],
      ],
    },
  },
};
