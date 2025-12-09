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
        <Button className="relative h-full w-full border border-stone-800 shadow-lg active:shadow-sm hover:shadow-2xl dark:border-text-secondary-dark">
          <Image {...thumbnailProps} fill  objectFit="cover"/>
        </Button>
        <ModalOverlay isDismissable>
          <Modal isDismissable className="p-0 h-3/4 aspect-4/3">
            <Dialog className="mx-auto p-0  relative h-full">
              {({ close }) => (
                <figure>
                  <Image
                    {...detailProps}
                    fill={true}
                    objectFit="contain"
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
