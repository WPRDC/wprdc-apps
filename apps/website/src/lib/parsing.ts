import * as cheerio from "cheerio";
import { slugify } from "@wprdc/ui";

export function processContent(content: string): string {
  const $ = cheerio.load(content);

  // add auto-generated IDs for use in TOCs
  $("h1, h2, h3, h4, h5, h6").each((i, element) => {
    const $elem = $(element);
    $elem.attr("id", slugify($elem.text()));
  });

  // find and remove empty paragraphs (when the user puts a blank newline between paragraphs)
  $("p").each((i, p) => {
    const text = ($(p).text() ?? "").trim();
    if (!text) {
      $(p).remove();
    }
  });

  return $("html").html() ?? "";
}
