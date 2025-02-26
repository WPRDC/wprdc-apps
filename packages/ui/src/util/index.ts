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

export * from "./formatters";

// template string pass-through function to signal prettier to format strings
export const tw = (strings: ArrayLike<string>, ...values: string[]): string =>
  String.raw({ raw: strings }, ...values);

export function slugify(str: string) {
  return _slugify(str).toLowerCase();
}
