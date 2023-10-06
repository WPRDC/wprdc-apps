import * as React from "react";
import { useBreadcrumbItem } from "react-aria";
import classNames from "classnames";
import type { BreadcrumbItemProps } from "./Breadcrumbs.types.ts";

export function BreadcrumbItem(props: BreadcrumbItemProps): React.ReactElement {
  const {
    LinkComponent,
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
  const Link = LinkComponent || "a";
  const dividerContent = divider || (
    <span
      aria-hidden="true"
      className="mx-1.5 flex flex-col justify-center font-bold text-gray-400"
    >
      /
    </span>
  );

  let breadcrumbContent;
  if (props.isCurrent) {
    breadcrumbContent = (
      <Title
        {...itemProps}
        className={classNames("font-medium", {
          "text-2xl font-semibold no-underline": bigTitle,
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
          <Link
            {...itemProps}
            href={props.href || "#"}
            ref={ref}
            shallow={shallow}
          >
            {props.children}
          </Link>
        )}
        {!hideDivider && dividerContent}
      </>
    );
  }
  if (!!props.isCurrent && !!bigTitle) return breadcrumbContent;
  return <li className="flex">{breadcrumbContent}</li>;
}
