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
import { Modal } from "../modal";
import { Image } from "../image";
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
        <Image {...thumbnailProps} alt={thumbnailProps.alt} />
      </button>
      <Modal isDismissable state={state}>
        <Image {...detailProps} height={600} width={1200} />
      </Modal>
    </div>
  );
}
