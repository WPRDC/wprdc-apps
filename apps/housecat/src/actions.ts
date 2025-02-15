"use server";

import { JSDOM } from "jsdom";

export async function fetchOwnerName(parcelID: string): Promise<string> {
  try {
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
  } catch (error) {
    // eslint-disable-next-line no-console -- rare but useful
    throw error;
  }
}
