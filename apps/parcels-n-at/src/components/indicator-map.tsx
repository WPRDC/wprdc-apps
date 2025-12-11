"use client";

import {
  Cell,
  Column,
  type Key,
  Row,
  type Selection,
  Table,
  TableBody,
  TableHeader,
  Text,
} from "react-aria-components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChartViz,
  InfoTooltip,
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  LoadingMessage,
  Map,
  Typography,
} from "@wprdc/ui";

import {
  type BooleanAggregateStatsRecord,
  type ContinuousAggregateStatsRecord,
  Described,
  formatValue,
  type Geography,
  type MapSet,
  type Question,
  type QuestionRecord,
  SpaceRATDataType,
  SpaceRATObject,
  type SpaceRATResponse,
  SpaceRATValueFormat,
} from "@wprdc/api";

import { Layer, type MapGeoJSONFeature, Source } from "react-map-gl/maplibre";

import { useEffect, useMemo, useState } from "react";

import { ckmeans } from "simple-statistics";

import chroma from "chroma-js";
import type { VisualizationSpec } from "@wprdc/types";
import { twMerge } from "tailwind-merge";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

const DEFAULT_VARIANT_ID = "_default_";

export interface IndicatorMapProps {
  /** List of available map config objects with at least `id` and `name`  */
  availableMapsSets: Described<SpaceRATObject>[];

  /** Selected map set */
  selectedMapSet?: MapSet;

  /** ID of selected geography */
  selectedGeogID?: string;

  /** ID of selected question */
  selectedQuestionID?: string;

  /** ID of selected variant */
  selectedVariantID?: string;

  /** Selected stat */
  selectedStatID?: keyof MapStats;
}

export type MapStats = ContinuousAggregateStatsRecord &
  BooleanAggregateStatsRecord;

export type MapQuestionRecord = QuestionRecord<MapStats> & {
  region_id: string;
};

const DEFAULT_STAT_IDS: Record<SpaceRATDataType, keyof MapStats> = {
  boolean: "percent",
  continuous: "median",
  discrete: "mode",
  date: "min",
};

const POSSIBLE_STATS: Record<SpaceRATDataType, (keyof MapStats)[]> = {
  continuous: ["mean", "median", "min", "max", "sum"],
  date: ["min", "max"],
  discrete: ["mode"],
  boolean: ["count", "percent"],
};

export function IndicatorMap({
  availableMapsSets,
  selectedMapSet,
  selectedGeogID,
  selectedQuestionID,
  selectedVariantID,
  selectedStatID,
}: IndicatorMapProps): React.ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<SpaceRATResponse<MapQuestionRecord>>();
  const [popupProps, setPopupProps] = useState<HoverPopupProps | null>(null);

  /** Updates searchParams and location  */
  const handleNavSelection = useCallback(
    (field: string) =>
      (selection: Key | Selection | null): void => {
        if (!selection) return;

        let value: string;
        if (typeof selection === "string" || typeof selection === "number") {
          value = selection.toString();
        } else {
          // for components that support multi-select
          value = Array.from(selection)[0].toString();
        }
        // update search param with new value
        const params = new URLSearchParams(searchParams);
        params.set(field, value);
        router.push(`${pathname}?${params.toString()}`);
      },
    [pathname, router, searchParams],
  );

  function handleChartHover(...args: unknown[]) {
    console.debug(args);
  }

  function handleMapHover(features: MapGeoJSONFeature[]) {
    function getFormat(question?: Question): SpaceRATValueFormat {
      if (question?.format) return question.format;
      if (question?.datatype === "boolean") return "percent";
      return "raw";
    }

    const feat = features[0];
    if (feat) {
      setPopupProps({
        label: feat.properties["region_id"],
        value: formatValue(
          feat.properties[`${questionTableID}__${selectedStatID}`],
          getFormat(selectedQuestion),
        ),
      });
    } else {
      setPopupProps(null);
    }
  }

  // tilesjsons change based on geographies and their variants
  const tilejson: string | undefined = useMemo(() => {
    if (selectedVariantID && selectedMapSet && selectedGeogID) {
      if (selectedVariantID in selectedMapSet.variants) {
        return selectedMapSet.variants[selectedVariantID].tilejsons[
          selectedGeogID
        ];
      }
      return selectedMapSet.tilejsons[selectedGeogID];
    }
    return undefined;
  }, [selectedGeogID, selectedVariantID, selectedMapSet]);
  // extract source layer from tilejson todo: come up with a better solution
  const sourceLayer = useMemo(() => {
    return tilejson
      ? tilejson.substring(tilejson.lastIndexOf("/") + 1)
      : undefined;
  }, [tilejson]);

  // questions can change a bit based on variant
  const questions: Question[] | undefined = useMemo(() => {
    if (selectedMapSet) {
      const qs = selectedMapSet.questions;
      if (selectedVariantID && selectedVariantID !== DEFAULT_VARIANT_ID) {
        return qs.concat(selectedMapSet.variants[selectedVariantID].questions);
      }
      return qs;
    }
    return undefined;
  }, [selectedMapSet, selectedVariantID]);

  const selectedQuestion: Question | undefined = useMemo(() => {
    return questions?.find((q) => q.id === selectedQuestionID);
  }, [questions, selectedQuestionID]);

  // question ID in the form used in postgres and therefor map tiles
  const questionTableID: string | undefined = useMemo(() => {
    if (selectedQuestionID)
      return selectedQuestionID.replace("-", "_") as keyof MapStats;
    return undefined;
  }, [selectedQuestionID]);

  // stats depend on the datatype of the selected question
  const stats: SpaceRATObject[] = useMemo(() => {
    if (questions && selectedQuestionID) {
      const selectedQ = questions.find((q) => q.id === selectedQuestionID);
      if (selectedQ) {
        const datatype = selectedQ.datatype;
        switch (datatype) {
          case "continuous":
            return [
              { id: "mean", name: "Mean" },
              { id: "min", name: "Min" },
              // { id: "first_quartile", name: "1Q" },
              { id: "median", name: "Median" },
              // { id: "third_quartile", name: "3Q" },
              { id: "max", name: "Max" },
              // { id: "stddev", name: "Std Deviation" },
              { id: "sum", name: "Sum" },
              // { id: "n", name: "Sample Size" },
            ];
          case "date":
            return [
              { id: "min", name: "Min" },
              { id: "max", name: "Max" },
              // { id: "n", name: "Sample Size" },
            ];
          case "boolean":
            return [
              { id: "percent", name: "%" },
              { id: "count", name: "Count" },
              // { id: "n", name: "Sample Size" },
            ];
          case "discrete":
          default:
            return [
              { id: "mode", name: "Mode" },
              // { id: "n", name: "Sample Size" },
            ];
        }
      }
    }

    return [];
  }, [questions, selectedQuestionID]);

  //
  //  are generated by clustering values used to style map
  const breaks: number[] = useMemo(() => {
    if (
      data &&
      data.results &&
      selectedMapSet &&
      questionTableID &&
      selectedGeogID &&
      selectedStatID
    ) {
      const byRegion = data.results.stats;
      const sampleRecord = Object.values(byRegion)[0];
      if (Object.prototype.hasOwnProperty.call(sampleRecord, questionTableID)) {
        const possibleStats = Object.keys(sampleRecord[questionTableID]);

        // cluster values
        if (possibleStats.includes(selectedStatID)) {
          const chunks: number[][] = ckmeans(
            Object.values(byRegion).map(
              (v) => v[questionTableID][selectedStatID],
            ),
            5,
          );

          // breakpoints are at the largest value for each chunk
          return chunks.map(
            (chunk) => chunk.sort((a, b) => a - b)[chunk.length - 1],
          );
        }
      }
    }
    return [];
  }, [data, selectedMapSet, questionTableID, selectedGeogID, selectedStatID]);

  // Fetch new map data when necessary
  useEffect(() => {
    if (selectedQuestionID && selectedGeogID && selectedVariantID) {
      setIsLoading(true);
      setData(undefined);
      fetch(
        `/api/spacerat/?${new URLSearchParams({
          question: selectedQuestionID,
          region: selectedGeogID,
          variant: selectedVariantID,
        })}`,
      )
        .then((r) => r.json())
        .then((rData: SpaceRATResponse<MapQuestionRecord>) => setData(rData))
        .finally(() => setIsLoading(false));
    }
  }, [selectedQuestionID, selectedGeogID, selectedVariantID]);

  // Effect on question switch, if there's no stat selected, or the stat isn't available now we need ot pick a default
  useEffect(() => {
    if (selectedQuestion) {
      // use default if not stat selected
      if (
        !selectedStatID ||
        !POSSIBLE_STATS[selectedQuestion.datatype].includes(selectedStatID)
      ) {
        handleNavSelection("stat")(DEFAULT_STAT_IDS[selectedQuestion.datatype]);
      }
    }
  }, [handleNavSelection, selectedQuestion, selectedStatID, selectedVariantID]);

  const styleSteps = useMemo(() => {
    const steps: (string | number)[] = [];

    const colors = chroma.scale("GnBu").colors(breaks.length + 1);

    for (let i = 0; i < breaks.length; i++) {
      steps.push(breaks[i]);
      steps.push(colors[i + 1]);
    }

    return steps;
  }, [breaks]);

  // flatten data to just the current stat
  const vegaData = useMemo(() => {
    if (!data || !selectedQuestionID || !selectedStatID) return undefined;

    if (!Object.values(data.results.stats)[0][selectedQuestionID])
      return undefined;

    return Object.values(data.results.stats).map((r) => ({
      region: r.region_id,
      value: r[selectedQuestionID][selectedStatID],
    }));
  }, [data, selectedQuestionID, selectedStatID]);

  const signalListeners = useMemo(() => {
    return { hover: handleChartHover };
  }, []);

  return (
    <div className="flex h-full">
      <div className="w-4/12">
        <div className="py-2">
          <Typography.Label>Pick a data source to map</Typography.Label>
          <ListBox
            aria-label="data sources"
            selectionMode="single"
            className="grid w-fit grid-cols-2"
            onSelectionChange={handleNavSelection("mapset")}
            selectedKeys={selectedMapSet ? [selectedMapSet.id] : []}
          >
            {availableMapsSets.map((m) => (
              <StyledListBoxItem className="w-48 p-2" key={m.id} id={m.id}>
                <Text className="block text-base" slot="label">
                  {m.name}
                </Text>
                <Text
                  className="block font-sans text-xs font-normal"
                  slot="description"
                >
                  {m.description}
                </Text>
              </StyledListBoxItem>
            ))}
          </ListBox>
        </div>

        <div className="py-2">
          <div>
            <Typography.Label>Filter source data geographies</Typography.Label>
            <div className="pb-1 text-xs">
              Because indicators for the{" "}
              <Typography.Code className="text-xs font-bold">
                {selectedMapSet?.name}
              </Typography.Code>{" "}
              dataset are calculated from{" "}
              <Typography.Code className="text-xs">
                {selectedMapSet?.source.spatial_resolution}
              </Typography.Code>{" "}
              data, you can limit what parcels are part of the calculation.
            </div>
          </div>
          {!!selectedMapSet && (
            <ListBox
              aria-label={`${selectedMapSet?.source.spatial_resolution} variants`}
              selectionMode="single"
              className=""
              onSelectionChange={handleNavSelection("variant")}
              selectedKeys={
                selectedVariantID ? [selectedVariantID] : [DEFAULT_VARIANT_ID]
              }
            >
              <StyledListBoxItem
                key={DEFAULT_VARIANT_ID}
                id={DEFAULT_VARIANT_ID}
              >
                default
              </StyledListBoxItem>

              {Object.keys(selectedMapSet.variants).map((k) => (
                <StyledListBoxItem key={k} id={k}>
                  {k}
                </StyledListBoxItem>
              ))}
            </ListBox>
          )}
        </div>

        <div className="py-2">
          <Typography.Label>Select an indicator</Typography.Label>
          {questions ? (
            <ListBox
              aria-label="indicators"
              selectionMode="single"
              className=""
              onSelectionChange={handleNavSelection("question")}
              selectedKeys={selectedQuestionID ? [selectedQuestionID] : []}
            >
              {questions.map((q) => (
                <StyledListBoxItem key={q.id} id={q.id}>
                  <Text slot="label">{q.name}</Text>
                  {!!q.description && (
                    <InfoTooltip
                      info={<Text slot="description">{q.description}</Text>}
                    />
                  )}
                </StyledListBoxItem>
              ))}
            </ListBox>
          ) : null}
        </div>

        <div className="py-2">
          {!!stats.length && !!selectedStatID && (
            <ListBox
              aria-label="stats"
              selectionMode="single"
              className=""
              onSelectionChange={handleNavSelection("stat")}
              selectedKeys={[selectedStatID]}
            >
              {stats.map((s: SpaceRATObject) => (
                <StyledListBoxItem key={s.id} id={s.id}>
                  {s.name}
                </StyledListBoxItem>
              ))}
            </ListBox>
          )}
        </div>
      </div>
      <div className="flex w-8/12">
        <div className="w-2/3 px-2">
          <div className="py-2">
            <Typography.Label>Change geographic level</Typography.Label>
            {!!selectedMapSet && (
              <ListBox
                aria-label="geographic levels"
                selectionMode="single"
                className=""
                onSelectionChange={handleNavSelection("geog")}
                selectedKeys={selectedGeogID ? [selectedGeogID] : []}
              >
                {selectedMapSet.geographies.map((g: Geography) => (
                  <StyledListBoxItem key={g.id} id={g.id}>
                    {g.name}
                  </StyledListBoxItem>
                ))}
              </ListBox>
            )}
          </div>
          <div className="relative h-[440px] w-full rounded border-2 border-black">
            {isLoading && (
              <div className="absolute z-20 h-full w-full bg-white/25 backdrop-blur-sm">
                <div className="mt-4 pt-4">
                  <LoadingMessage message="Fetching map data..." />
                </div>
              </div>
            )}
            <Map
              initialViewState={{ zoom: 10.3 }}
              mapTilerAPIKey={API_KEY}
              minZoom={7}
              interactiveLayerIDs={["indicator/fill"]}
              onHover={handleMapHover}
              hoverPopup={
                popupProps ? <HoverPopup {...popupProps} /> : undefined
              }
            >
              {!!tilejson && !!questionTableID && !isLoading && (
                <Source
                  id="indicator"
                  key={tilejson}
                  type="vector"
                  url={tilejson}
                >
                  {!!styleSteps && styleSteps.length && (
                    <Layer
                      id="indicator/fill"
                      key={tilejson}
                      type="fill"
                      source-layer={sourceLayer}
                      paint={{
                        "fill-color": [
                          "step",
                          [
                            "get",
                            `${questionTableID}__${selectedStatID ?? ""}`,
                          ],
                          chroma.brewer.GnBu[0],
                          ...styleSteps,
                        ],
                      }}
                    />
                  )}
                  <Layer
                    id="indicator/line"
                    type="line"
                    source-layer={sourceLayer}
                  />
                </Source>
              )}
            </Map>
          </div>

          <div className="">
            <ChartViz
              spec={{
                ...histogramSpec(breaks, popupProps?.label ?? ""),
                data: { values: vegaData },
              }}
              signalListeners={signalListeners}
            />
          </div>
        </div>

        <div className="relative w-1/3 overflow-auto px-2">
          {!!vegaData && (
            <Table
              aria-label="indicator results"
              className="max-h-96 w-full table-fixed"
            >
              <TableHeader className="sticky top-0 box-border text-center align-bottom">
                <Column
                  isRowHeader
                  className="border-b-2 border-black bg-white px-1"
                >
                  {
                    selectedMapSet?.geographies.find(
                      (g) => g.id === selectedGeogID,
                    )?.name
                  }
                </Column>
                <Column className="border-b-2 border-black bg-white px-1">
                  {stats.find((s) => s.id === selectedStatID)?.name}{" "}
                  {selectedQuestion?.name}
                </Column>
              </TableHeader>
              <TableBody>
                {vegaData

                  .sort((a, b) => b.value - a.value)
                  .map((vegaDatum) => (
                    <Row
                      key={String(vegaDatum.region)}
                      className="border-x-2 border-b-2"
                    >
                      <Cell className="px-1 font-semibold">
                        {vegaDatum.region}
                      </Cell>
                      <Cell className="border-l px-1 text-right font-mono">
                        {formatValue(
                          vegaDatum.value,
                          selectedQuestion?.format ?? "raw",
                        )}
                      </Cell>
                    </Row>
                  ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}

export function StyledListBoxItem<T extends object = object>({
  className,
  ...props
}: ListBoxItemProps<T>): React.ReactElement {
  return (
    <ListBoxItem<T>
      className={twMerge(
        "selected:ring-2 selected:bg-primary/30 selected:font-bold mr-2 mb-1 inline-block cursor-default rounded border border-black px-1 font-mono text-sm font-semibold ring-black hover:bg-stone-100",
        typeof className === "string" ? className : null,
      )}
      {...props}
    />
  );
}

interface HoverPopupProps {
  label: string;
  value: string;
}

export function HoverPopup({
  label,
  value,
}: HoverPopupProps): React.ReactElement {
  return (
    <div>
      <div>{label}</div>
      <div>{value}</div>
    </div>
  );
}

const histogramSpec = (breaks: number[], region: string): VisualizationSpec => {
  const colors = chroma.scale("GnBu").colors(breaks.length + 1);

  return {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "",
    data: { name: "table" },
    mark: "bar",
    width: "container",
    signals: [
      {
        name: "tooltip",
        value: {},
        on: [
          { events: "rect:mouseover", update: "datum" },
          { events: "rect:mouseout", update: "{}" },
        ],
      },
    ],
    encoding: {
      x: {
        field: "region",
        type: "nominal",
        axis: { labelAngle: -90 },
        sort: "y",
      },
      y: {
        field: "value",
        type: "quantitative",
        axis: { labelPadding: -50, labelOffset: -6, title: null, ticks: false },
      },
      color: {
        field: "value",
        type: "quantitative",
        legend: null,
        scale: {
          type: "threshold",
          domain: breaks,
          range: colors,
        },
      },
      stroke: {
        condition: {
          test: `datum['region'] === "${region}"`,
          value: "#000",
        },
        value: "#aaa",
      },
    },
  };
};
