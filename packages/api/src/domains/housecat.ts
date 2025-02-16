import {
  APIMapBoxResponse,
  ProjectIndex,
  ProjectIndexDetails,
  UserProfile,
} from "@wprdc/types";

const HOST = process.env.HOUSECAT_HOST ?? "http://localhost:8000";

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

const _headers = (token?: string) => ({
  Authorization: `Token ${token}`,
});

export async function housecatLogout(
  token: string,
  csrftoken: string,
): Promise<boolean> {
  const headers = { ..._headers(token), "X-CSRFToken": csrftoken };
  const response = await fetch(`${HOST}/accounts/logout/`, {
    method: "POST",
    headers,
    credentials: "include",
    redirect: "manual",
  });

  return response.ok;
}

export async function housecatLogin(
  username: string,
  password: string,
  onComplete: (token: string | null) => void,
): Promise<void> {
  const response = await fetch(`${HOST}/api-token-auth/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const {
    token,
  }: {
    token: string;
  } = await response.json();

  if (token) {
    onComplete(token);
  } else {
    onComplete(null);
  }
}

/**
 * Check if the user is logged in
 */
export async function fetchLoggedInToHousecat(token?: string) {
  const url = `${HOST}/accounts/user/`;
  const headers = _headers(token);
  const response = await fetch(url, {
    credentials: "include",
    headers,
    cache: "no-cache",
  });
  const data = await response.json();

  return data as UserProfile;
}

/**
 * Request details of a single project
 */
export async function fetchAffordableHousingProject(
  id?: string | number,
  token?: string,
  params?: Record<string, string>,
) {
  if (typeof id === "undefined") return null;

  const url = `${HOST}/data/project/${id}/?${new URLSearchParams(params).toString()}`;
  console.log("URL", token, url);
  const headers = _headers(token);
  const response = await fetch(url, { credentials: "include", headers });
  const data = await response.json();

  console.log(data);

  return data as ProjectIndexDetails;
}

/**
 * Request a list of projects
 */
export async function fetchAffordableHousingProjects(
  token?: string,
  params?: Record<string, string>,
) {
  const url = `${HOST}/data/project/?${new URLSearchParams(params).toString()}`;
  const headers = _headers(token);

  const response = await fetch(url, { credentials: "include", headers });

  return (await response.json()) as {
    count: number;
    results: ProjectIndex[];
  };
}

/**
 * Request project data in geojson format
 */
export async function fetchProjectMap(
  token?: string,
  params?: Record<string, string>,
) {
  const url = `${HOST}/data/vector-map/?${new URLSearchParams(params).toString()}`;
  const headers = _headers(token);
  const response = await fetch(url, { headers, cache: "force-cache" });
  const data = await response.json();

  return data as APIMapBoxResponse;
}

/**
 * Request a list of parcels with a curated filter
 */
export async function fetchWatchlist(
  token?: string,
  slug?: string,
  params?: Record<string, string>,
) {
  const url = `${HOST}/data/watchlist/${slug}?${new URLSearchParams(params).toString()}`;

  const headers = _headers(token);
  const response = await fetch(url, { credentials: "include", headers });
}

/**
 * Request a list of parcels with a curated filter
 */
export async function fetchWatchlists(
  token?: string,
  params?: Record<string, string>,
) {
  const url = `${HOST}/data/watchlist?${new URLSearchParams(params).toString()}`;

  const headers = _headers(token);
  const response = await fetch(url, { credentials: "include", headers });
}

/**
 * Request a specific account
 */
export async function fetchAccount(
  token?: string,
  email?: string,
  params?: Record<string, any>,
) {
  const url = `${HOST}/accounts/profile/?${new URLSearchParams(params).toString()}`;
  const headers = _headers(token);
  const response = await fetch(url, { credentials: "include", headers });
  return (await response.json()) as UserProfile;
}

/**
 * Request a list of user accounts
 */
export async function fetchAccounts(
  token?: string,
  params?: Record<string, any>,
): Promise<UserProfile[]> {
  const headers = _headers(token);
  const url = `${HOST}/accounts/profile/?${new URLSearchParams(params).toString()}`;

  const response = await fetch(url, { credentials: "include", headers });
  const results = await response.json();
  return results.results as UserProfile[];
}

export async function reviewHouseCatAccount(
  shouldApprove: boolean,
  email: string,
  token?: string,
): Promise<object> {
  const headers = _headers(token);

  const response = await fetch(
    `${HOST}/accounts/${shouldApprove ? "approve" : "revoke"}/`,
    {
      method: "POST",
      body: JSON.stringify({ user: email }),
      headers: { ...headers, "Content-Type": "application/json" },
      credentials: "include",
    },
  );

  return await response.json();
}
