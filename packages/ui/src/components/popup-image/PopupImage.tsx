/**
 *
 * PopupImage
 *
 * An image with can be enlarged on click
 *
 **/
import * as React from "react";
import { useOverlayTriggerState } from "react-stately";
import classNames from "classnames";
import Image from "next/image";
import { Modal } from "../modal";
import type { PopupImageProps } from "./PopupImage.types.ts";

export function PopupImage({
  className,
  ...thumbnailProps
}: PopupImageProps): React.ReactElement {
  const state = useOverlayTriggerState({});
  const { width: _, height: __, fill: ___, ...detailProps } = thumbnailProps;

  /* eslint-disable @typescript-eslint/unbound-method -- offending functions come from react-aria */
  return (
    <div className={classNames("ui-h-full ui-w-fit ui-max-w-full", className)}>
      <button
        className="ui-relative ui-h-fit ui-w-fit ui-border ui-border-textSecondary ui-shadow-lg hover:ui-shadow-2xl active:ui-shadow-sm dark:ui-border-textSecondaryDark"
        onClick={state.open}
        type="button"
      >
        <img {...thumbnailProps} />
      </button>
      <Modal isDismissable state={state}>
        <img {...detailProps} height={600} width={1200} />
      </Modal>
    </div>
  );
}
