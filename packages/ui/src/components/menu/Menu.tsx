/**
 *
 * Menu
 *
 * List of menu options
 *
 */
import * as React from "react";
import classNames from "classnames";
import { useTreeState } from "react-stately";
import {
  useSeparator,
  useFocus,
  mergeProps,
  useMenu,
  useMenuItem,
  useMenuSection,
} from "react-aria";
import type { Resource } from "../../types";
import type {
  MenuItemProps,
  MenuProps,
  MenuSectionProps,
} from "./Menu.types.ts";

export function Menu<T extends Resource>(
  props: MenuProps<T>,
): React.ReactElement {
  const state = useTreeState({ ...props });

  const items = Array.from(state.collection);

  const ref = React.useRef<HTMLUListElement>(null);
  const { menuProps } = useMenu<T>(props, state, ref);

  return (
    <ul
      {...menuProps}
      className="order w-max max-w-sm rounded-sm border-gray-600"
      ref={ref}
    >
      {items.map((item) => {
        if (item.type === "section") {
          return (
            <MenuSection<T>
              key={item.key}
              onAction={props.onAction}
              section={item}
              state={state}
            />
          );
        }
        return (
          <MenuItem<T>
            item={item}
            key={item.key}
            onAction={props.onAction}
            state={state}
          />
        );
      })}
    </ul>
  );
}

function MenuItem<T>({ item, state, onAction }: MenuItemProps<T>): JSX.Element {
  const ref = React.useRef<HTMLLIElement>(null);
  const isDisabled = state.disabledKeys.has(item.key);

  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      isDisabled,
      onAction,
    },
    state,
    ref,
  );

  const [isFocused, setIsFocused] = React.useState(false);
  const { focusProps } = useFocus({ onFocusChange: setIsFocused });

  return (
    <li
      {...mergeProps(menuItemProps, focusProps)}
      className={classNames(
        "cursor-pointer px-1 py-0.5 outline-none",
        isFocused ? "text-white; bg-gray-300" : "",
      )}
      ref={ref}
      style={{ cursor: isDisabled ? "default" : "pointer" }}
    >
      {item.rendered}
    </li>
  );
}

function MenuSection<T>({
  section,
  state,
  onAction,
}: MenuSectionProps<T>): JSX.Element {
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  const { separatorProps } = useSeparator({
    elementType: "li",
  });

  const nodes = Array.from(section.childNodes);

  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li {...separatorProps} className="border border-t border-gray-500" />
      )}
      <li {...itemProps}>
        {section.rendered ? (
          <span {...headingProps} className="py-0.5 py-1 text-sm font-bold">
            {section.rendered}
          </span>
        ) : null}
        <ul {...groupProps} className="p-0">
          {nodes.map((node) => (
            <MenuItem
              item={node}
              key={node.key}
              onAction={onAction}
              state={state}
            />
          ))}
        </ul>
      </li>
    </>
  );
}
