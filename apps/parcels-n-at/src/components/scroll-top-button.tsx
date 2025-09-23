"use client";

import { Button } from "@wprdc/ui";
import { TbChevronsUp } from "react-icons/tb";

export interface ScrollTopButtonProps {
  containerID: string;
}

export function ScrollTopButton({ containerID }: ScrollTopButtonProps) {
  function handleScroll() {
    const elem = document.getElementById(containerID);

    if (elem) {
      elem.scrollIntoView({behavior: 'smooth'});
    }
  }

  return (
    <Button
      onPress={handleScroll}
      icon={TbChevronsUp}
      className="flex items-center text-xs"
    >
      Back to Top
    </Button>
  );
}

