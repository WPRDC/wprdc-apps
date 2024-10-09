"use client";

import { Button } from "@wprdc/ui";
import React, { useEffect, useMemo, useState } from "react";
import { AriaSearchFieldProps } from "react-aria";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Form, Input, SearchField } from "react-aria-components";

export interface SearchBarProps extends AriaSearchFieldProps {}

const SEARCH_URL = "https://data.wprdc.org/dataset";

const PLACEHOLDERS = [
  "311 requests",
  "dog licenses",
  "fishing spots",
  "arrests",
  "paving schedules",
  "asbestos permits",
  "playground equipment",
];

const INTERVAL = 120; //ms

export default function SearchBar(props: SearchBarProps) {
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
    if (!!window) {
      window.open(`${SEARCH_URL}?q=${value}`, "_blank");
    }
  }

  return (
    <Form
      action={SEARCH_URL}
      className="flex flex-col md:flex-row md:max-w-xl lg:max-w-2xl w-full items-stretch pt-2"
    >
      <SearchField
        onSubmit={handleSearch}
        aria-label="dataset search"
        className="group flex flex-grow items-center bg-white dark:bg-black border-2 border-primary group-focus-visible:outline-2 outline-blue-500 overflow-hidden gap-1 min-w-[300px] p-2 ring-4 ring-text"
      >
        <FaSearch className="ml-1 text-3xl" role="presentation" />
        <Input
          name="q"
          placeholder={placeholder}
          aria-placeholder="Search for data"
          autoFocus
          className="py-1 text-xl [&::-webkit-search-cancel-button]:hidden px-2 flex-1 min-w-0 outline outline-0 bg-white dark:bg-zinc-950 text-text dark:text-textDark disabled:text-gray-200 dark:disabled:text-zinc-600"
        />
        <Button variant="borderless" className="group-empty:hidden mr-1 w-6">
          <FaTimes className="text-xl" />
        </Button>
      </SearchField>
      <Button
        variant="primary"
        type="submit"
        className="rounded-sm my-2 md:my-0 md:ml-4 px-3.5 text-lg md:text-xl ring-1 ring-text shadow-md hover:shadow-xl"
      >
        Search
      </Button>
    </Form>
  );
}
