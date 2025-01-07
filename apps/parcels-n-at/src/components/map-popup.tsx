"use client";

import { Dialog, DialogTrigger, Modal } from "react-aria-components";
import { NavMap, NavMapProps } from "@/components/nav-map";
import React from "react";
import { Button } from "@wprdc/ui";
import { TbMap } from "react-icons/tb";

export function MapPopup(props: NavMapProps): React.ReactElement {
  return (
    <DialogTrigger>
      <Button icon={TbMap} variant="secondary">
        Open Map
      </Button>
      <Modal className="fixed left-0 top-0 z-50 h-screen w-screen">
        <Dialog className="flex h-full flex-col">
          <div className="flex-grow bg-white">
            <NavMap {...props} isModal />
          </div>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
