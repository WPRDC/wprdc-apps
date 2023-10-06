/**
 *
 * SearchBar
 *
 * Search input with controls and label
 *
 **/
import * as React from "react";
import { useSearchField } from "react-aria";
import { useSearchFieldState } from "react-stately";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Button } from "../button";
import type { SearchBarProps } from "./SearchBar.types.ts";

export function SearchBar(props: SearchBarProps): React.ReactElement {
  const { label, searchURL } = props;
  const state = useSearchFieldState(props);
  const ref = React.useRef(null);
  const { labelProps, inputProps, clearButtonProps } = useSearchField(
    {
      ...props,
      onSubmit: (text: string) =>
        (window.location.href = `${searchURL}?q=${text}`),
    },
    state,
    ref,
  );

  return (
    <div>
      <form
        action={searchURL}
        className="space-x-0 space-y-4 md:flex md:items-stretch md:space-x-2 md:space-y-0"
        method="GET"
      >
        <label {...labelProps}>
          {label}
          <div className="dark:border-primary focus:border-primary outline-primary flex w-full items-center border-4 border-black outline dark:text-white dark:outline-0 lg:max-w-lg">
            <FaSearch className="mx-2 text-3xl" role="presentation" />
            <input
              {...inputProps}
              className="flex-grow border-0 bg-inherit px-2 py-2 text-xl outline-0 placeholder:text-slate-400"
              id=""
              name="q"
              ref={ref}
            />
            {state.value !== "" && (
              <Button {...clearButtonProps}>
                <FaTimes className="mx-2 text-3xl" />
              </Button>
            )}
          </div>
        </label>
        <Button
          className="bg-primary text-text border-text dark:border-text inline-block border-2 px-6 py-2 font-bold uppercase decoration-2 shadow-md hover:shadow-xl active:shadow"
          type="submit"
        >
          Search
        </Button>
      </form>
    </div>
  );
}
