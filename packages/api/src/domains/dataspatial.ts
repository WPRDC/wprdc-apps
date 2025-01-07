// todo: make API endpoint in ckanext-dataspatial that provides list of mappable resources with a lil metadata

import { MartinResponse, TileJSON } from "@wprdc/types";

const TILE_HOST: string = "https://data.wprdc.org/tiles/";

export async function getTileLayerCatalog() {
  const response = await fetch(`${TILE_HOST}/catalog`);

  const data: MartinResponse = await response.json();

  return data.tiles;
}

export async function getTileLayer(name: string) {
  const response = await fetch(`${TILE_HOST}/${name}`);

  const data: TileJSON = await response.json();

  return data;
}
