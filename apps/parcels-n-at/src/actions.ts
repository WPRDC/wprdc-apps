"use server";

import { JSDOM } from "jsdom";
import sql from "@/db";

export async function fetchOwnerName(parcelID: string): Promise<string> {
  // id of span element where the owner name is stored
  const TARGET_ID = "#MainContent_InfoPane_ownerLbl";

  const PREFIX_LENGTH = 12; // "Owner Name: ".length;

  // url on real estate portal
  const sourceURL = `https://realestate.alleghenycounty.us/GeneralInfo?ID=${parcelID}`;

  const response = await fetch(sourceURL);

  // parse the real estate portal site's html
  const body = await response.text();
  const dom = new JSDOM(body);
  const owner = dom.window.document
    .querySelector(TARGET_ID)
    ?.textContent?.substring(PREFIX_LENGTH);

  // extract the owner name
  if (owner) return owner;
  return "NOT FOUND";
}

/**
 * Gets a parcel's owner address as stored in parcel_index - the exact string the
 * owner search returns and the bulk downloader matches on.
 */
export async function fetchIndexedOwnerAddress(
  parcelID: string,
): Promise<string | null> {
  const [record] = await sql<{ owner_address: string | null }[]>`
    SELECT owner_address
    FROM spacerat.parcel_index
    WHERE parcel_id = ${parcelID}
  `;
  return record?.owner_address ?? null;
}
