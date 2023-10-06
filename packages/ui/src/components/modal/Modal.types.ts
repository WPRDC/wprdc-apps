/**
 *
 * Modal types
 *
 **/
import type * as React from "react";
import type { AriaModalOverlayProps } from "react-aria";
import type { OverlayTriggerState } from "react-stately";

export interface ModalProps extends AriaModalOverlayProps {
  children: React.ReactNode;
  state: OverlayTriggerState;
}
