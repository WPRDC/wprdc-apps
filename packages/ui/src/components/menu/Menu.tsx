/**
 *
 * Menu
 *
 * List of menu options
 *
 */
import * as React from "react";
import { useTreeState } from "react-stately";
import { useMenu } from "react-aria";
import type { MenuProps } from "./Menu.types.ts";
import { MenuSection } from "./MenuSection.tsx";
import { MenuItem } from "./MenuItem.tsx";

export function Menu<T extends object>(
  props: MenuProps<T>,
): React.ReactElement {
  // Create menu state based on the incoming props
  const state = useTreeState(props);

  // Get props for the menu element
  const ref = React.useRef<HTMLUListElement>(null);
  const { menuProps } = useMenu(props, state, ref);

  return (
    <ul
      {...menuProps}
      className="ui-min-w-[96px] ui-border-2 ui-bg-background ui-font-mono ui-text-text focus:ui-rounded-none dark:ui-bg-backgroundDark dark:ui-text-textDark"
      ref={ref}
    >
      {[...state.collection].map((item) =>
        item.type === "section" ? (
          <MenuSection key={item.key} section={item} state={state} />
        ) : (
          <MenuItem item={item} key={item.key} state={state} />
        ),
      )}
    </ul>
  );
}
