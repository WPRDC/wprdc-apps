export interface Resource<K extends string | number = string | number> {
  /** Backend primary key. May soon be deprecated as slug is available and servers as a global ID across WPRDC apps. */
  id: K;
  /** Name of theresource */
  name: string;
  /** Unique, human and machine-readable identifier */
  slug: string;
  /** Optional descriptive text */
  description?: string;
}
