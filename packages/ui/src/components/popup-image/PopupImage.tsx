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
  caption,
  width: _,
  height: __,
  ...thumbnailProps
}: PopupImageProps): React.ReactElement {
  const { fill: ___, ...detailProps } = thumbnailProps;
  return (
    <div className={twMerge("h-full w-full max-w-full", className)}>
      <DialogTrigger>
        <Button className="relative h-full w-full border border-stone-800 shadow-lg active:shadow-sm hover:shadow-2xl dark:border-textSecondaryDark">
          <Image {...thumbnailProps} fill />
        </Button>
        <ModalOverlay isDismissable>
          <Modal isDismissable className="w-fit p-0">
            <Dialog className="mx-auto h-fit w-fit p-0">
              {({ close }) => (
                <figure>
                  <Image
                    {...detailProps}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    width={1200}
                    height={300}
                    onClick={close}
                  />
                  {!!caption && (
                    <figcaption className="border-t border-stone-800 px-4 py-2 font-medium">
                      {caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  );
}
