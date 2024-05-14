/**
 *
 * Upload types
 *
 **/
import type * as React from "react";

export interface UploadProps {
  buttonLabel?: React.ReactNode;
  dropLabel?: React.ReactNode;
  className?: string;

  onFileChange?: (file: File) => void;
}
