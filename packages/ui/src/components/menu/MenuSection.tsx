import { useMenuSection, useSeparator } from "react-aria";
import React from "react";
import type { MenuSectionProps } from "./Menu.types.ts";
import { MenuItem } from "./MenuItem.tsx";

export function MenuSection<T>({
  section,
  state,
}: MenuSectionProps<T>): React.ReactElement {
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  const { separatorProps } = useSeparator({
    elementType: "li",
  });

  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li
          {...separatorProps}
          className="ui-m-1 ui-border-t-2 ui-border-t-textSecondaryDark dark:ui-border-t-textSecondary"
        />
      )}
      <li {...itemProps}>
        {section.rendered ? (
          <span {...headingProps}>{section.rendered}</span>
        ) : null}
        <ul {...groupProps}>
          {[...section.childNodes].map((node) => (
            <MenuItem item={node} key={node.key} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}
