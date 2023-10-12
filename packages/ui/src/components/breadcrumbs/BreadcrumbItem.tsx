import * as React from "react";
import { useBreadcrumbItem } from "react-aria";
import classNames from "classnames";
import { A } from "../a";
import type { BreadcrumbItemProps } from "./Breadcrumbs.types.ts";

export function BreadcrumbItem(props: BreadcrumbItemProps): React.ReactElement {
  const {
    TitleComponent,
    divider,
    hideDivider,
    bigTitle,
    shallow,
    isDisabled,
  } = props;

  const ref = React.useRef(null);
  const { itemProps } = useBreadcrumbItem(props, ref);

  const Title = TitleComponent || "h3";
  const dividerContent = divider || (
    <span
      aria-hidden="true"
      className="ui-mx-1.5 ui-justify-center ui-font-bold ui-text-gray-400"
    >
      /
    </span>
  );

  let breadcrumbContent;
  if (props.isCurrent) {
    breadcrumbContent = (
      <Title
        {...itemProps}
        className={classNames("ui-font-medium", {
          "ui-text-4xl ui-font-semibold ui-leading-loose ui-no-underline":
            bigTitle,
        })}
        ref={ref}
      >
        {props.children}
      </Title>
    );
  } else {
    breadcrumbContent = (
      <>
        {isDisabled ? (
          <span ref={ref}>{props.children}</span>
        ) : (
          <A
            {...itemProps}
            href={props.href || "#"}
            ref={ref}
            shallow={shallow}
          >
            {props.children}
          </A>
        )}
        {!hideDivider && dividerContent}
      </>
    );
  }
  if (!!props.isCurrent && !!bigTitle) return breadcrumbContent;
  return <li className="flex">{breadcrumbContent}</li>;
}
