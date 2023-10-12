import * as React from "react";
import { useMenuItem } from "react-aria";
import type { MenuItemProps } from "./Menu.types.ts";

export function MenuItem<T>({
  item,
  state,
}: MenuItemProps<T>): React.ReactElement {
  const ref = React.useRef<HTMLLIElement>(null);
  const { menuItemProps, isSelected } = useMenuItem<T>(
    { key: item.key },
    state,
    ref,
  );

  return (
    <li
      {...menuItemProps}
      className="ui-cursor-pointer ui-px-2 ui-py-1 ui-outline-0 focus:ui-bg-primary focus:ui-font-medium focus:ui-text-text"
      ref={ref}
    >
      {item.rendered}
      {isSelected ? <span aria-hidden="true">✅</span> : null}
    </li>
  );
}
