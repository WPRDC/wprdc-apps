/**
 *
 * Tabs
 *
 * Tab list
 *
 */
import * as React from "react";
import classNames from "classnames";
import { useTab, useTabList, useTabPanel } from "react-aria";
import type { TabListState, Node } from "react-stately";
import { useTabListState } from "react-stately";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import type { ReactNode } from "react";
import type { Resource } from "../../types";
import { useWindowSize } from "../util";
import type { TabPanelProps, TabProps, TabsProps } from "./Tabs.types.ts";

const SCROLL_DELTA = 300;

type ButtonSide = "left" | "right" | "";

export function Tabs<T extends Resource>(
  props: TabsProps<T>,
): React.ReactElement {
  const [showButtons, setShowButons] = React.useState(false);
  const [disabledButton, setDisabledButton] = React.useState<ButtonSide>();

  const state = useTabListState(props);
  const ref = React.useRef<HTMLDivElement>(null);
  const { tabListProps } = useTabList(props, state, ref);

  const { width } = useWindowSize();

  function isOverflowing({ clientWidth, scrollWidth }: HTMLElement): boolean {
    return scrollWidth > clientWidth;
  }

  /**
   * Returns what button if any should be disabled based on current state.
   * Occurs on first render and as a callback in interaction handlers
   */
  function getDisabledButton(position: number): ButtonSide {
    let dBtn: ButtonSide = "";
    if (ref.current) {
      // if scrolled all the way left, disable left button
      if (position <= 0) dBtn = "left";
      // if scrolled all the way right, disable right button
      if (position >= ref.current.scrollWidth - (ref.current.clientWidth + 2))
        dBtn = "right";
    }
    return dBtn;
  }

  /**
   * Fires when a scroll button is cliked.
   */
  const handleScroll = (dir: "left" | "right") => () => {
    const add = (a: number, b: number): number => a + b;
    const sub = (a: number, b: number): number => a - b;

    const fn = dir === "left" ? sub : add;

    if (ref.current) {
      const pos = fn(ref.current.scrollLeft, SCROLL_DELTA);
      ref.current.scroll({
        top: 0,
        left: pos,
        behavior: "smooth",
      });
      setDisabledButton(getDisabledButton(pos));
    }
  };

  // initialization
  React.useEffect(() => {
    setDisabledButton(getDisabledButton(0));
  }, []);

  // on window or element resize check whether to show scroll buttons
  React.useEffect(() => {
    if (ref.current) {
      setShowButons(isOverflowing(ref.current));
    } else setShowButons(false);
  }, [width]);

  console.log(state.selectedItem);

  return (
    <div className="ui-flex ui-h-full ui-w-full ui-flex-col">
      <div className="ui-flex ui-flex-row">
        {showButtons ? (
          <button
            aria-hidden // not necessary with screen readers
            className={classNames({
              "ui-cursor-default ui-text-gray-300": disabledButton === "left",
            })}
            disabled={disabledButton === "left"}
            onClick={handleScroll("left")}
            tabIndex={-1} // or with keyboard nav
            type="button"
          >
            <RiArrowLeftSLine />
          </button>
        ) : null}
        <div
          {...tabListProps}
          className="ui-flex ui-flex-grow ui-overflow-x-hidden ui-border-b-2 ui-border-black ui-pt-1"
          ref={ref}
        >
          {[...state.collection].map((item) => (
            <Tab<T> item={item} key={item.key} state={state} />
          ))}
        </div>
        {showButtons ? (
          <button
            aria-hidden // not necessary with screen readers
            className={classNames({
              "ui-cursor-default ui-text-gray-300": disabledButton === "right",
            })}
            disabled={disabledButton === "right"}
            onClick={handleScroll("right")}
            tabIndex={-1} // or with keyboard nav
            type="button"
          >
            <RiArrowRightSLine />
          </button>
        ) : null}
      </div>
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- it actually can be nullish */}
      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  );
}

export function Tab<T extends Resource>({
  item,
  state,
}: TabProps<T>): React.ReactElement {
  const { key, rendered } = item;
  const ref = React.useRef<HTMLDivElement>(null);
  const { tabProps } = useTab({ key }, state, ref);
  const isSelected = state.selectedKey === key;
  const isDisabled = state.disabledKeys.has(key);
  return (
    <div
      className={classNames(
        "ui-b ui-mb-2 ui-cursor-pointer ui-border-r ui-border-black ui-px-2 ui-pb-0.5 ui-leading-none first:ui-ml-1 first:ui-border-l hover:ui-bg-primary",
      )}
    >
      <div
        {...tabProps}
        className={classNames("ui-font-mono ui-uppercase", {
          "ui-font-bold": isSelected,
          "opacity-50 hover:border-transparent ui-cursor-not-allowed":
            isDisabled,
        })}
        ref={ref}
        title={`${rendered as string}`}
      >
        {rendered}
      </div>
    </div>
  );
}

export function TabPanel<T extends Resource>({
  state,
  ...props
}: TabPanelProps<T>): React.ReactElement {
  const ref = React.useRef<HTMLDivElement>(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);
  const { children } = getSelectedItemProps(state);
  return (
    <div
      {...tabPanelProps}
      className="ui-flex-grow ui-overflow-y-auto"
      ref={ref}
    >
      {children}
    </div>
  );
}

interface SelectedItemProps {
  children: ReactNode;
}

/**  */
function getSelectedItemProps<T>(state: TabListState<T>): SelectedItemProps {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- it actually can be undefined
  return (state.selectedItem?.props ?? {}) as SelectedItemProps;
}
