/**
 *
 * Content types
 *
 **/

export interface ContentProps {
  id?: string;
  className?: string;
  variant?: "default" | "blurb" | "toc" | "large" | "custom";

  /** ONLY USE THIS WITH HTML WE GENERATE/CONTROL */
  dangerouslySetInnerHTML?: { __html: string | TrustedHTML };
}
