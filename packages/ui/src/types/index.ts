/*
 * Shared types
 */
import type { ReactElement } from "react";
import type { AsyncListOptions } from "react-stately";
import type { Resource } from "./resources";

export * from "./resources";
export type { CollectionBase, Selection, Node } from "@react-types/shared";

/** Slugs used to represent projects across connections */
export enum ProjectKey {
  NeighborhoodAssets = "neighborhood-assets",
  GeoMenu = "geo-menu",
  Profiles = "profiles",
  Housecat = "housecat",
}

export type Identified = Omit<Resource, "description">;

export type SizeCategory = "S" | "M" | "L";

export type Datum = number | string;

export enum ColorScheme {
  Light = "light",
  Dark = "dark",
}

export enum ErrorLevel {
  OK = 0,
  EMPTY = 1,
  WARNING = 10,
  ERROR = 100,
}

/** Connection that handles data that comes in a list format. */
export interface ListConnection<T extends Resource, C = string>
  extends AsyncListOptions<T, C> {
  // T = Type, C = cursor, K = key
  load: AsyncListOptions<T, C>["load"];

  /** Function that describes how to render each item. */
  renderItem: (item: T) => ReactElement;
  getFilterTextFromItem?: (item: T) => string;
}

/** A component that can except a connection */
export interface ListConnectableComponentProps<T extends Resource> {
  connection: ListConnection<T>;
}

export type ListConnectableComponent<T extends Resource> = (
  props: ListConnectableComponentProps<T>,
) => ReactElement | null;

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

export type TagRecord = Identified;
export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
