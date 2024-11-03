import { STRAPI_URL } from "@/lib/constants.ts";
import { CMSImage } from "@wprdc/types";
import { PopupImage } from "@wprdc/ui";
import React from "react";

export interface ScreenshotGridProps {
  title?: string;
  screenshots?: CMSImage[];
  pageTitle?: string | null;
}

export function ScreenshotGrid({
  title,
  screenshots,
  pageTitle,
}: ScreenshotGridProps) {
  if (!screenshots || !screenshots.length) return null;
  return (
    <div>
      <div className="my-8 mb-2 text-lg">{title ?? "Screenshots"}</div>
      <ul className="inline-block">
        {screenshots.map((screenshot) => (
          <li
            key={screenshot.id}
            className="relative inline-block h-52 w-64 p-3"
          >
            <PopupImage
              src={`${STRAPI_URL}${screenshot.url}`}
              width={800}
              height={200}
              caption={screenshot.caption}
              alt={screenshot.alternativeText ?? `${pageTitle} screenshot`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
