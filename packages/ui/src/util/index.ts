import _slugify from "slugify";

export function getCookie(name: string): string | null {
  "use client";
  if (typeof window === "undefined") {
    return null;
  }
  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() ?? null;
  }
  return null;
}

export function setCookie(name: string, value:string, daysToLive: number) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (daysToLive) {
    const date = new Date();
    // Convert days to milliseconds
    date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${date.toUTCString()}`;
  }

  cookieString += "; path=/";
  cookieString += "; Secure";
  cookieString += "; SameSite=Lax";

  document.cookie = cookieString;
}


export * from "./formatters";

// template string pass-through function to signal prettier to format strings
export const tw = (strings: ArrayLike<string>, ...values: string[]): string =>
  String.raw({ raw: strings }, ...values);

export function slugify(str: string) {
  return _slugify(str).toLowerCase();
}
