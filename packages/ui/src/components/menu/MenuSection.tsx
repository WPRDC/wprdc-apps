/**
 *
 * MenuSection
 *
 * Divides menu items into sections.
 *
 */
"use client";

import { Section } from "react-aria-components";
import type { MenuSectionProps } from "./Menu.types";

export function MenuSection<T extends object>(
  props: MenuSectionProps<T>,
): React.ReactElement {
  return <Section {...props}>{props.children}</Section>;
}
