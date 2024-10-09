/**
 *
 * PopupImage
 *
 * An image with modal that shows the full size image.
 *
 **/
"use client";

import React from "react";
import { Button, Dialog, DialogTrigger } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { Image } from "../image";
import { Modal, ModalOverlay } from "../modal";
import type { PopupImageProps } from "./PopupImage.types";

export function PopupImage({
  className,
  ...thumbnailProps
}: PopupImageProps): React.ReactElement {
  const { width: _, height: __, fill: ___, ...detailProps } = thumbnailProps;
  return (
    <div className={twMerge("h-fulll w-fit max-w-full", className)}>
      <DialogTrigger>
        <Button className="relative h-fit w-fit border border-textSecondary shadow-lg active:shadow-sm hover:shadow-2xl dark:border-textSecondaryDark">
          <Image {...thumbnailProps} />
        </Button>
        <ModalOverlay isDismissable>
          <Modal isDismissable>
            <Dialog>
              <Image {...detailProps} width={1200} height={600} />
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  );
}
