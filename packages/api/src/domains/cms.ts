import qs from "qs";
import {
  CMSArtifact,
  CMSBlog,
  CMSGlobal,
  CMSHome,
  CMSNavMenuItem,
  CMSProject,
  CMSTool,
  CMSWeeknote,
  StrapiBase,
  StrapiListResponse,
  StrapiResponse,
} from "@wprdc/types";

export const DEFAULT_PAGE_SIZE = 10;

/** Fetch wrapper */
export async function fetchAPI<T extends StrapiBase>(
  path: string,
  queryParams: object = {},
  options: object = {},
): Promise<StrapiResponse<T> | StrapiListResponse<T>> {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(queryParams, {
      encodeValuesOnly: true, // prettify URL
    });
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`,
    )}`;

    console.log("", requestUrl);

    // Make API call
    const response = await fetch(requestUrl, mergedOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`,
    );
  }
}

/** Returns base URL for all Strapi calls */
export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337"
  }${path}`;
}

/**
 * Returns URL from the provided path or url
 *
 * @param {string} [pathOrURL]
 */
export function getStrapiMedia(pathOrURL: string | null) {
  // If null or a URL, there's no need to modify.
  if (
    pathOrURL == null ||
    pathOrURL.startsWith("http") ||
    pathOrURL.startsWith("//")
  ) {
    return pathOrURL;
  }
  // Otherwise prepend the strapi URL to the path.
  return `${getStrapiURL()}${pathOrURL}`;
}

export async function requestData<T extends StrapiBase>(
  path: string,
  queryParams: {
    filters?: any;
    populate?: string[] | object | string;
  } = {},
  fetchOptions?: object,
): Promise<StrapiResponse<T>> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");
  const mergedOptions = {
    headers: { Authorization: `Bearer ${token}` },
    ...fetchOptions,
  };

  return (await fetchAPI<T>(
    path,
    queryParams,
    mergedOptions,
  )) as StrapiResponse<T>;
}

export async function requestListData<T extends StrapiBase>(
  path: string,
  queryParams: {
    filters?: any;
    populate?: string[] | object | string;
  } = {},
  fetchOptions?: object,
): Promise<StrapiListResponse<T>> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");
  const mergedOptions = {
    headers: { Authorization: `Bearer ${token}` },
    ...fetchOptions,
  };

  return (await fetchAPI<T>(
    path,
    queryParams,
    mergedOptions,
  )) as StrapiListResponse<T>;
}

// Content Getters
export async function getContentBySlug<T extends StrapiBase>(
  path: string,
  slug: string,
  lang: string,
  populate?: string,
): Promise<StrapiListResponse<T>> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const queryParams = { filters: { slug }, locale: lang, populate };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  return (await fetchAPI<T>(
    path,
    queryParams,
    options,
  )) as StrapiListResponse<T>;
}

export async function getContentByID<T extends StrapiBase>(
  path: string,
  id: string,
  lang: string,
  populate?: string,
): Promise<StrapiResponse<T>> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const queryParams = { locale: lang, populate };
  const options = { headers: { Authorization: `Bearer ${token}` } };

  return (await fetchAPI<T>(
    `${path}/${id}`,
    queryParams,
    options,
  )) as StrapiResponse<T>;
}

// Individual resource getters
// Add new getters here as new content types are added to the CMS.

// singletons
const globalFields = [
  "navbarLogo.image",
  "navbarLogo.darkImage",
  "footerLogo.image",
  "footerLogo.darkImage",
  "navbarLinks",
  "affiliateLogos.image",
  "affiliateLogos.darkImage",
  "seo",
  "metadata",
  "favicon",
];

export async function getGlobal(): Promise<StrapiResponse<CMSGlobal>> {
  const queryParams = {
    populate: globalFields,
  };
  return requestData<CMSGlobal>("/global", queryParams);
}

const homePageFields = [
  "searchSection",
  "searchSection.buttons",
  "blurbs",
  "blurbs.tiles",
  "publishers",
  "publishers.partners",
  "publishers.publishers",
  "publishers.button",
  "publishers.partners.partnerLogo",
  "publishers.publishers.partnerLogo",
];

export async function getHomePage(): Promise<StrapiResponse<CMSHome>> {
  const queryParams = {
    populate: homePageFields,
  };
  return requestData<CMSHome>("/home", queryParams);
}

// lists
const blogPostFields: string[] | string = "*";

export async function getBlogPosts(
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
): Promise<StrapiListResponse<CMSBlog>> {
  const pagination = {
    page,
    pageSize,
  };

  const queryParams = {
    sort: { publishDate: "desc" },
    pagination,
    populate: blogPostFields,
  };

  return requestListData<CMSBlog>("/blogs", queryParams);
}

const weeknoteFields: string[] | string = "*";

export async function getWeeknotes(
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
): Promise<StrapiListResponse<CMSWeeknote>> {
  const pagination = {
    page,
    pageSize,
  };

  const queryParams = {
    sort: { week: "desc" },
    pagination,
    populate: blogPostFields,
  };

  return requestListData<CMSWeeknote>("/weeknotes", queryParams);
}

const toolsFields: string[] | string = "*";

export async function getTools(
  slug?: string,
): Promise<StrapiListResponse<CMSTool>> {
  const filters = slug
    ? {
        slug: slug,
      }
    : undefined;

  const queryParams = {
    sort: { order: "asc" },
    filters,
    populate: toolsFields,
  };
  return requestListData<CMSTool>("/tools", queryParams);
}

const artifactFields: string[] | string = "*";

export async function getArtifacts(
  slug?: string,
): Promise<StrapiListResponse<CMSArtifact>> {
  const filters = slug
    ? {
        slug: slug,
      }
    : undefined;

  const queryParams = {
    filters,
    populate: artifactFields,
  };
  return requestListData<CMSArtifact>("/artifacts", queryParams);
}

const projectFields: string[] | string = "*";

export async function getProjects(
  slug?: string,
): Promise<StrapiListResponse<CMSProject>> {
  const filters = slug
    ? {
        slug: slug,
      }
    : undefined;

  const queryParams = {
    sort: { order: "asc" },
    filters,
    populate: projectFields,
  };

  return requestListData<CMSProject>("/projects", queryParams);
}

const mainMenuFields: string[] | string = [
  "primaryLink",
  "subMenu.link",
  "subMenu.subItems",
];

export async function getMainMenu(): Promise<
  StrapiListResponse<CMSNavMenuItem>
> {
  const queryParams = {
    sort: { order: "asc" },
    populate: mainMenuFields,
  };

  return requestListData<CMSNavMenuItem>("/nav-menu-items", queryParams);
}
