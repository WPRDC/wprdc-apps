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
    <div className={classNames("h-full w-fit max-w-full", className)}>
      <button
        className="border-textSecondary dark:border-textSecondaryDark relative h-fit w-fit border shadow-lg hover:shadow-2xl active:shadow-sm"
        onClick={state.open}
        type="button"
      >
        <Image {...thumbnailProps} />
      </button>
      <Modal isDismissable state={state}>
        <Image {...detailProps} height={600} width={1200} />
      </Modal>
    </div>
  );
}
