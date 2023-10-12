import { useMenuTrigger } from "react-aria";
import { useMenuTriggerState } from "react-stately";
import * as React from "react";
import { Button } from "../button";
import { Popover } from "../popover";
import { Menu } from "./Menu.tsx";
import type { MenuButtonProps } from "./Menu.types.ts";

export function MenuButton<T extends object>(
  props: MenuButtonProps<T>,
): React.ReactElement {
  // Create state based on the incoming props
  const state = useMenuTriggerState(props);

  // Get props for the button and menu elements
  const ref = React.useRef<HTMLButtonElement>(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref);

  return (
    <>
      <Button {...menuTriggerProps} buttonRef={ref}>
        {props.label}
        <span aria-hidden="true" style={{ paddingLeft: 5 }}>
          ▼
        </span>
      </Button>
      {state.isOpen ? (
        <Popover placement="bottom start" state={state} triggerRef={ref}>
          <Menu {...props} {...menuProps} />
        </Popover>
      ) : null}
    </>
  );
}
