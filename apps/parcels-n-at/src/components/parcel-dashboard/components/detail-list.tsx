"use client";

import { ReactNode } from "react";
import { Button, DialogTrigger } from "react-aria-components";
import { Dialog, Modal, ModalOverlay, Typography } from "@wprdc/ui";

export interface DetailListItem {
  title: string;
  topLeft: ReactNode;
  topRight: ReactNode;
  details: ReactNode;
}
export interface DetailListProps {
  items: DetailListItem[];
}

export function DetailList({ items }: DetailListProps) {
  return (
    <ul className="max-h-124 w-full max-w-3/4 overflow-auto border border-stone-400 px-3">
      {items.map((item, i) => (
        <li key={i} className="my-2 w-full">
          <DialogTrigger>
            <Button className="hover:bg-wprdc-200 w-full cursor-pointer rounded-sm border-2 border-black px-3 py-2 text-left ring-black hover:ring-1">
              <div className="flex w-full items-start justify-between pr-2 font-mono text-xs">
                <div>{item.topLeft}</div>
                <div>{item.topRight}</div>
              </div>
              <h3 className="mt-0.5 mb-1 font-mono text-lg leading-none font-black">
                {item.title}
              </h3>
              <Typography.Note>Click For Details</Typography.Note>
            </Button>
            <ModalOverlay isDismissable>
              <Modal>
                <Dialog className="max-h-[75vh] max-w-xl">
                  <div className="flex w-full items-start justify-between pr-2 font-mono text-xs">
                    <div>{item.topLeft}</div>
                    <div>{item.topRight}</div>
                  </div>
                  <h1 className="mt-0.5 mb-2 font-mono text-xl leading-none font-black">
                    {item.title}
                  </h1>
                  {item.details}
                </Dialog>
              </Modal>
            </ModalOverlay>
          </DialogTrigger>
        </li>
      ))}
    </ul>
  );
}
