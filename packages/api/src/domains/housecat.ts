import { ProjectIndexDetails } from "@wprdc/types";
import { APIMapBoxResponse, ProjectIndex } from "@wprdc/types/src";

const HOST = process.env.HOUSECAT_HOST ?? "http://127.0.0.1:8000";

export enum Endpoint {
  PHProject = "data/project",
  PHProjectMap = "data/vector-map",
  Watchlist = "data/watchlist",
  Profile = "accounts/profile",
  CurrentUser = "accounts/user",
}

// todo: move to a shared library
function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() ?? null;
  }
  return null;
}

const headers: HeadersInit = {
  "Content-Type": "application/json",
  "X-CSRFToken": getCookie("csrftoken") ?? "",
};

/**
 * Request details of a single project
 */
export async function fetchAffordableHousingProject(
  id: number,
  params?: Record<string, string>,
) {
  const url = `${HOST}/data/project/${id}?${new URLSearchParams(params).toString()}`;
  const response = await fetch(url, { credentials: "include", headers });

  return (await response.json()) as ProjectIndexDetails;
}

/**
 * Request a list of projects
 */
export async function fetchAffordableHousingProjects(
  params?: Record<string, string>,
) {
  const url = `${HOST}/data/project?${new URLSearchParams(params).toString()}`;
  const response = await fetch(url, { credentials: "include", headers });

  return (await response.json()) as ProjectIndex;
}

/**
 * Request project data in geojson format
 */
export async function fetchProjectMap(params?: Record<string, string>) {
  const url = `${HOST}/data/vector-map?${new URLSearchParams(params).toString()}`;
  const response = await fetch(url, { credentials: "include", headers });

  return (await response.json()) as APIMapBoxResponse;
}

/**
 * Request a list of parcels with a curated filter
 */
export async function fetchWatchlist(
  slug?: string,
  params?: Record<string, string>,
) {
  const url = `${HOST}/data/watchlist/${slug}?${new URLSearchParams(params).toString()}`;
  const response = await fetch(url, { credentials: "include", headers });
}

/**
 * Request a list of parcels with a curated filter
 */
export async function fetchWatchlists(params?: Record<string, string>) {
  const url = `${HOST}/data/watchlist?${new URLSearchParams(params).toString()}`;
  const response = await fetch(url, { credentials: "include", headers });
}

/**
 * Request a list of parcels with a curated filter
 */
export async function fetchAccount(
  email?: string,
  params?: Record<string, string>,
) {
  const url = `${HOST}/accounts/profile/?${new URLSearchParams(params).toString()}`;
  const response = await fetch(url, { credentials: "include", headers });
}

/**
 * Request a list of parcels with a curated filter
 */
export async function fetchAccounts(params?: Record<string, string>) {
  const url = `${HOST}/accounts/profile/?${new URLSearchParams(params).toString()}`;
  const response = await fetch(url, { credentials: "include", headers });
}

/**
 * Check if the user is logged in
 */
export async function fetchLoggedIn() {
  const url = `${HOST}/accounts/user/}`;
  const response = await fetch(url, { credentials: "include", headers });
}
