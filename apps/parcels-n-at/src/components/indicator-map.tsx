"use client";

import { type Key, type Selection } from "react-aria-components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComboBox, ComboBoxItem, ListBox, ListBoxItem, Map } from "@wprdc/ui";
import {
  type ContinuousAggregateStatsRecord,
  type BooleanAggregateStatsRecord,
  type SpaceRATResponse,
  type Geography,
  type MapConfig,
  type Question,
  type QuestionRecord,
} from "@wprdc/api";
import { Source, Layer } from "react-map-gl/maplibre";
import { useEffect, useMemo } from "react";
import { ckmeans } from "simple-statistics";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

const DEFAULT_VARIANT_ID = "_default_";

const COLORS = ["#ffffcc", "#a1dab4", "#41b6c4", "#2c7fb8", "#253494"];

type MapStatsRecord = ContinuousAggregateStatsRecord &
  BooleanAggregateStatsRecord &
  Record<string, number>;

export interface IndicatorMapProps {
  availableMaps: MapConfig[];
  map?: MapConfig;
  geog?: Geography;
  question?: Question;
  variant?: string;
  stat?: string;
  data?: SpaceRATResponse<QuestionRecord<MapStatsRecord>>;
}

export function IndicatorMap({
  availableMaps,
  map,
  geog,
  question,
  variant,
  stat,
  data,
}: IndicatorMapProps): React.ReactElement {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavSelection =
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
    };

  const tilejson: string | undefined = useMemo(() => {
    if (map && geog) {
      if (variant && variant in map.variants)
        return map.variants[variant].tilejsons[geog.id];
      return map.tilejsons[geog.id];
    }
    return undefined;
  }, [geog, variant, map]);

  const sourceLayer = useMemo(() => {
    return tilejson
      ? tilejson.substring(tilejson.lastIndexOf("/") + 1)
      : undefined;
  }, [tilejson]);

  const questions: Question[] | undefined = useMemo(() => {
    if (map) {
      const qs = map.questions;
      if (variant && variant !== DEFAULT_VARIANT_ID) {
        return qs.concat(map.variants[variant].questions);
      }
      return qs;
    }
    return undefined;
  }, [map, variant]);

  const questionID: string | undefined = useMemo(() => {
    if (question) return question.id.replace("-", "_");
    return undefined;
  }, [question]);

  const statOptions: string[] | undefined = useMemo(() => {
    if (map && data && questionID) {
      const { stats } = data.results;
      const firstRecord = Object.values(stats)[0];
      const questionRecord = firstRecord[questionID];
      return Object.keys(questionRecord) as (keyof (
        | ContinuousAggregateStatsRecord
        | BooleanAggregateStatsRecord
      ))[];
    }
    return [];
  }, [map, data, questionID]);

  useEffect(() => {
    // handle switching stat types
    if (!statOptions.includes(stat ?? "")) {
      handleNavSelection("stat")(statOptions[0]);
    }
  }, [statOptions, stat]);

  // get range of values
  const breaks: number[] = useMemo(() => {
    if (data && map && questionID && geog && stat) {
      const byRegion = data.results.stats;
      // cluster values
      if (Object.keys(Object.values(byRegion)[0][questionID]).includes(stat)) {
        const chunks: number[][] = ckmeans(
          Object.values(byRegion).map((v) => v[questionID][stat]),
          5,
        );
        // breakpoints are at the largest value for each chunk
        // eslint-disable-next-line @typescript-eslint/require-array-sort-compare -- sorting numbers
        return chunks.map((chunk) => chunk.sort()[chunk.length - 1]);
      }
    }
    return [];
  }, [data, map, questionID, geog, stat]);

  console.log(breaks);
  return (
    <div>
      <div>
        <ComboBox onSelectionChange={handleNavSelection("maps")}>
          {availableMaps.map((m: MapConfig) => (
            <ComboBoxItem key={m.id} id={m.id}>
              {m.name}
            </ComboBoxItem>
          ))}
        </ComboBox>
      </div>
      <div>
        {map ? (
          <ListBox
            selectionMode="single"
            className="py-2"
            onSelectionChange={handleNavSelection("geog")}
            selectedKeys={geog ? [geog.id] : undefined}
          >
            {map.geographies.map((g: Geography) => (
              <ListBoxItem
                key={g.id}
                id={g.id}
                className="selected:ring-2 selected:font-bold hover:bg-primary/60 mr-2 inline-block cursor-default rounded border  border-black px-1 font-mono text-sm font-semibold outline-none ring-black"
              >
                {g.name}
              </ListBoxItem>
            ))}
          </ListBox>
        ) : null}
      </div>

      <div>
        {map ? (
          <ListBox
            selectionMode="single"
            className="py-2"
            onSelectionChange={handleNavSelection("variant")}
            selectedKeys={variant ? [variant] : DEFAULT_VARIANT_ID}
          >
            <ListBoxItem
              key={DEFAULT_VARIANT_ID}
              id={DEFAULT_VARIANT_ID}
              className="selected:ring-2 selected:font-bold hover:bg-primary/60 mr-2 inline-block cursor-default rounded border  border-black px-1 font-mono text-sm font-semibold outline-none ring-black"
            >
              default
            </ListBoxItem>

            {Object.keys(map.variants).map((k) => (
              <ListBoxItem
                key={k}
                id={k}
                className="selected:ring-2 selected:font-bold hover:bg-primary/60 mr-2 inline-block cursor-default rounded border  border-black px-1 font-mono text-sm font-semibold outline-none ring-black"
              >
                {k}
              </ListBoxItem>
            ))}
          </ListBox>
        ) : null}
      </div>
      <div>
        {questions ? (
          <ListBox
            selectionMode="single"
            className="py-2"
            onSelectionChange={handleNavSelection("question")}
            selectedKeys={question ? [question.id] : undefined}
          >
            {questions.map((q) => (
              <ListBoxItem
                key={q.id}
                id={q.id}
                className="selected:ring-2 selected:font-bold hover:bg-primary/60 mr-2 inline-block cursor-default rounded border  border-black px-1 font-mono text-sm font-semibold outline-none ring-black"
              >
                {q.name}
              </ListBoxItem>
            ))}
          </ListBox>
        ) : null}
      </div>

      <div>
        {statOptions.length ? (
          <ListBox
            selectionMode="single"
            className="py-2"
            onSelectionChange={handleNavSelection("stat")}
            selectedKeys={[stat ?? ""]}
          >
            {statOptions.map((s) => (
              <ListBoxItem
                key={s}
                id={s}
                className="selected:ring-2 selected:font-bold hover:bg-primary/60 mr-2 inline-block cursor-default rounded border  border-black px-1 font-mono text-sm font-semibold outline-none ring-black"
              >
                {s}
              </ListBoxItem>
            ))}
          </ListBox>
        ) : null}
      </div>

      <div />

      <div className="h-[600px] w-full rounded border-2 border-black">
        <Map mapTilerAPIKey={API_KEY} minZoom={7} onHover={console.log}>
          {!!tilejson && questionID ? (
            <Source id="indicator" key={tilejson} type="vector" url={tilejson}>
              <Layer
                id="indicator/fill"
                key={tilejson}
                type="fill"
                source-layer={sourceLayer}
                paint={{
                  "fill-color": [
                    "step",
                    ["get", `${questionID}__${stat ?? ""}`],
                    COLORS[0],
                    breaks[0] + breaks[0] / 20,
                    COLORS[1],
                    breaks[1] + breaks[1] / 20,
                    COLORS[2],
                    breaks[2] + breaks[2] / 20,
                    COLORS[3],
                    breaks[3] + breaks[3] / 20,
                    COLORS[4],
                  ],
                }}
              />
              <Layer
                id="indicator/line"
                type="line"
                source-layer={sourceLayer}
              />
            </Source>
          ) : null}
        </Map>
      </div>
      <div />
    </div>
  );
}
