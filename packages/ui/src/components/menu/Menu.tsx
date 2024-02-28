/**
 *
 * Menu
 *
 * List of menu options
 *
 */
import { Menu as RAMenu } from "react-aria-components";
import type { MenuProps } from "./Menu.types";

export function Menu<T extends object>(
  props: MenuProps<T>,
): React.ReactElement {
  return <RAMenu {...props}>{props.children}</RAMenu>;
}
