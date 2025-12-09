"use client";

import { Button } from "@wprdc/ui";
import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Form, Input, SearchField } from "react-aria-components";


const SEARCH_URL = "https://data.wprdc.org/dataset";

const PLACEHOLDERS = [
  "311 requests",
  "dog licenses",
  "property assessments",
  "budgets",
  "paving schedules",
  "asbestos permits",
  "playground equipment",
  "parks",
  "salaries",
];

const INTERVAL = 120; //ms

export default function SearchBar() {
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0].slice(0, 0));
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const currentPlaceholder = useMemo(() => {
    return PLACEHOLDERS[currentPlaceholderIndex];
  }, [currentPlaceholderIndex]);

  useEffect(() => {
    const intr = setInterval(() => {
      setPlaceholder(currentPlaceholder.slice(0, placeholderIndex));
      if (placeholderIndex + 1 > currentPlaceholder.length) {
        // keep full text up for a bit longer
        setTimeout(() => {
          setPlaceholderIndex(0);
          setCurrentPlaceholderIndex(
            (currentPlaceholderIndex + 1) % PLACEHOLDERS.length,
          );
        }, 333);
      } else {
        setPlaceholderIndex(placeholderIndex + 1);
      }
    }, INTERVAL);
    return () => {
      clearInterval(intr);
    };
  });

  function handleSearch(value: string) {
    if (window) {
      window.open(`${SEARCH_URL}?q=${value}`, "_blank");
    }
  }

  return (
    <Form
      action={SEARCH_URL}
      className="flex w-full flex-col items-stretch pt-2 md:max-w-xl md:flex-row lg:max-w-2xl"
    >
      <SearchField
        onSubmit={handleSearch}
        aria-label="dataset search"
        className="border-primary ring-text group flex min-w-[300px] grow items-center gap-1 overflow-hidden border-2 bg-white p-2 outline-blue-500 ring-4 group-focus-visible:outline-2 dark:bg-black"
      >
        <FaSearch className="ml-1 text-3xl" role="presentation" />
        <Input
          name="q"
          placeholder={placeholder}
          aria-placeholder="Search for data"
          autoFocus
          className="text-text placeholder-stone-600 dark:text-textDark min-w-0 flex-1 bg-white px-2 py-1 text-xl outline-0 disabled:text-gray-200 dark:bg-zinc-950 dark:disabled:text-zinc-600 [&::-webkit-search-cancel-button]:hidden"
        />
        <Button variant="borderless" className="mr-1 w-6 group-empty:hidden">
          <FaTimes className="text-xl" />
        </Button>
      </SearchField>
      <Button
        variant="primary"
        type="submit"
        className="ring-text my-2 rounded-sm px-3.5 text-lg shadow-md ring-1 hover:shadow-xl md:my-0 md:ml-4 md:text-xl"
      >
        Search
      </Button>
    </Form>
  );

}
