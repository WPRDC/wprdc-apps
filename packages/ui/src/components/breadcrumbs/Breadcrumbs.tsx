/**
 *
 * Breadcrumbs
 *
 * Like Hansel and Gretel.
 *
 */
import * as React from "react";
import { useBreadcrumbs } from "react-aria";
import type { BreadcrumbsProps } from "./Breadcrumbs.types.ts";

export function Breadcrumbs(props: BreadcrumbsProps): React.ReactElement {
  const { navProps } = useBreadcrumbs(props);
  const children = React.Children.toArray(props.children);
  const { showCurrent = true, bigTitle, titleElement = "h3", shallow } = props;

  const lastChild = children[children.length - 1];

  return (
    <nav {...navProps} className="">
      {showCurrent || children.length > 1 ? (
        <ol className="ui-flex ui-h-4 ui-font-mono ui-text-xs ui-uppercase">
          {children.map((child, i) => {
            if (i < children.length - 1) {
              return React.cloneElement(child as React.ReactElement, {
                isCurrent: false,
                elementType: "a",
                hideDivider: !showCurrent && i === children.length - 1,
                shallow,
              });
            }
            if (showCurrent && !bigTitle) {
              return React.cloneElement(child as React.ReactElement, {
                isCurrent: true,
                elementType: titleElement,
                bigTitle,
                shallow,
              });
            }
            return null;
          })}
        </ol>
      ) : null}
      {showCurrent && !!bigTitle
        ? React.cloneElement(lastChild as React.ReactElement, {
            isCurrent: true,
            elementType: titleElement,
            bigTitle,
            shallow,
          })
        : null}
    </nav>
  );
}
