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

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-row">
        {showButtons ? (
          <button
            aria-hidden // not necessary with screen readers
            className={classNames({
              "cursor-default text-gray-300": disabledButton === "left",
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
          className="flex flex-grow overflow-x-hidden border-b border-black pt-1"
          ref={ref}
        >
          {Array.from(state.collection).map((item) => (
            <Tab<T> item={item} key={item.key} state={state} />
          ))}
        </div>
        {showButtons ? (
          <button
            aria-hidden // not necessary with screen readers
            className={classNames({
              "cursor-default text-gray-300": disabledButton === "right",
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
      <TabPanel key={state.selectedItem.key} state={state} />
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
    <div className={classNames("ml-3 pb-0.5 first:ml-1")}>
      <div
        {...tabProps}
        className={classNames(
          "py-1.5cursor-pointer whitespace-nowrap px-1.5 text-center font-mono text-sm font-medium uppercase",
          "border-2 border-transparent outline-none focus:outline-none focus-visible:outline-none",
          "focus-visible:border-primary-400 focus-visible:border-primary-400",
          "hover:border-primary-400 hover:border-2 hover:bg-slate-50",
          {
            "font-bold": isSelected,
            "cursor-not-allowed opacity-50 hover:border-transparent":
              isDisabled,
          },
        )}
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
  const { children } = state.selectedItem.props as { children: ReactNode };
  return (
    <div {...tabPanelProps} className="flex-grow overflow-y-auto" ref={ref}>
      {children}
    </div>
  );
}
