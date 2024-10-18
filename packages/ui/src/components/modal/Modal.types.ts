/**
 *
 * Modal types
 *
 **/
import type { ModalOverlayProps as RAModalOverlayProps } from "react-aria-components";

export interface ModalProps extends ModalOverlayProps {
  className?: string;
}

export type ModalOverlayProps = RAModalOverlayProps;
