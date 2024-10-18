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
    <div className={twMerge("h-full w-fit max-w-full", className)}>
      <DialogTrigger>
        <Button className="relative h-full w-full border border-textSecondary shadow-lg active:shadow-sm hover:shadow-2xl dark:border-textSecondaryDark">
          <Image {...thumbnailProps} fill />
        </Button>
        <ModalOverlay isDismissable>
          <Modal isDismissable className="w-fit p-0">
            <Dialog className="mx-auto h-fit w-fit">
              {({ close }) => (
                <Image
                  {...detailProps}
                  sizes="100vw"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  className="p-4"
                  width={500}
                  height={300}
                  onClick={close}
                />
              )}
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  );
}
