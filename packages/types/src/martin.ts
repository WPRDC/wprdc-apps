export interface MartinResponse {
  tiles: {
    [key: string]: MartinCatalogRecord;
  };
  sprites: {};
  fonts: {};
}

export interface MartinCatalogRecord {
  content_type: string;
  content_encoding: string;
  description: string;
}

export interface MartinVectorLayer<
  T extends MartinFieldsRecord = MartinFieldsRecord,
> {
  id: string;
  fields: T;
}

export interface TileJSON<T extends MartinFieldsRecord = MartinFieldsRecord> {
  tilejson: string;
  tiles: string[];
  vector_layers: MartinVectorLayer<T>[];
  bounds: [number, number, number, number];
  description: string;
  maxzoom: number;
  minzoom: number;
  name: string;
  format: "pbf" | string;
  generator: string;
}

export type MartinFieldsRecord = Record<string, string>;
