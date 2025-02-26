import _slugify from "slugify";

export function getCookie(name: string): string | null {
  "use client";
  console.log("🍪", "getting cookie");
  if (typeof window === "undefined") {
    console.log("🔴", "no window");
    return null;
  }
  const value = `; ${document.cookie}`;
  console.log("🔵", value);

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
