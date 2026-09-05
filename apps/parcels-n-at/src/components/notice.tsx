"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { A, Button, getCookie, Image, setCookie } from "@wprdc/ui";

const COOKIE_NAME = "usecase_solicitation_notice";
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScLWlo9RWi7oyKp0HceliCwPuTHo3kqPtncc5_s_2rBhinwHQ/viewform";

export function Notice() {
  const [open, setOpen] = useState(false);

  function handleClose() {
    setCookie(COOKIE_NAME, "closed", 14);
    setOpen(false);
  }

  function handleTellUs() {
    setCookie(COOKIE_NAME, "closed", 365);
    setOpen(false);
    window.open(FORM_URL, "_blank", "noopener,noreferrer");
  }

  useEffect(() => {
    if (getCookie(COOKIE_NAME) !== "closed") setOpen(true);
  }, []);

  return (
    <aside
      className={twMerge(
        "bg-wprdc-50 absolute right-5 bottom-5 z-50 max-w-sm rounded-sm border-2 border-black shadow-md",
        open ? "block" : "hidden",
      )}
    >
      <div className="border-wprdc-400 flex border-6 p-4">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <div className="font-bold">
              Share Your Parcels N&apos;at Use Case With Us
            </div>
          </div>
          <p className="mb-2 text-xs font-medium">
            Help us better understand how Parcels N&apos;at is being used in the
            region so we can prioritize new features and datasets and support our
            reporting and fundraising efforts. Please fill out this short form
            (~5 minutes) and share with us how you are using Parcels N&apos;at
            and its impact.
          </p>
          <div className="flex gap-4">
            <Button onPress={handleTellUs} variant="primary">
              Tell Us
            </Button>
            <Button onPress={handleClose} variant="default">
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
