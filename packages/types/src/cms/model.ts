export interface StrapiBase {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string | null;
  publishedAt: string | null;
  locale: string | null;
}

interface ImageBase {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

interface ImageFormatData extends ImageBase {
  path: string | null;
}

interface BasicStrapiImage extends StrapiBase, ImageBase {
  alternativeText: string | null;
  caption: string | null;
  previewUrl: string | null;
  provider: "local" | string;
  provider_metadata: null | any;
}

interface StrapiImage extends BasicStrapiImage {
  formats: ImageFormats;
}

type ImageFormat = "thumbnail" | "small" | "medium" | "large";

type ImageFormats = Record<ImageFormat, ImageFormatData>;

// Components
interface Logo {
  id: number;
  altText: string | null;
  image: StrapiImage;
  darkImage: StrapiImage;
}

interface Link {
  id: number;
  label: string;
  url: string;
  newTab: boolean;
  category: string | null;
}

interface SEO {
  id: number;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
  metaRobots: string | null;
  structuredData: string | null;
  metaViewport: string | null;
  canonicalURL: string | null;
}

interface Metadata {
  id: number;
  title: string;
  description: string;
}

interface Button {
  id: number;
  buttonText: string | null;
  buttonUrl: string | null;
  highlight: boolean;
}

// Models
export interface ListableContentType extends StrapiBase {
  slug?: string | null;
  title?: string | null;
  publishDate?: string | null;
  author?: CMSAuthor | null;
  tags?: CMSTag[];
  category?: CMSCategory | string | null;
  excerpt?: string | null;
  article: string | null;
}

export interface CMSNavMenuItem extends StrapiBase {
  primaryLink: Link;
  subMenu: {
    id: number;
    deatailLine: string;
    description: string;
    link: Link;
    subItems: Link[];
  }[];
  defaultDescription: string;
  order: number;
}

export interface CMSTag extends StrapiBase {
  slug: string;
  tag: string;
}

export interface CMSCategory extends StrapiBase {
  slug: string;
  category: string;
}

export interface CMSAuthor extends StrapiBase {
  name: string;
  email: string;
  slug: string;
  bio: string;
}

export interface CMSPage extends StrapiBase {
  title: string;
  slug: string;
  subtitle: string | null;
  body: string | null;
  relatedPages: Link[];
}

export interface CMSBlog extends StrapiBase, ListableContentType {
  title: string;
  slug: string;
  subtitle: string | null;
  excerpt: string | null;
  article: string | null;
  publishDate: string | null;
  author: CMSAuthor | null;
  tags: CMSTag[];
  category: CMSCategory;
}

export interface CMSWeeknote extends StrapiBase, ListableContentType {
  article: string | null;
  author: CMSAuthor;
}

export interface CMSTool extends StrapiBase, ListableContentType {
  slug: string;
  title: string;
  subtitle: string | null;
  thumbnail: StrapiImage;
  description: string | null;
  url: string;
  tags: CMSTag[];
  order: number;
  docURL: string | null;
  githubURL: string | null;
  screenshots: StrapiImage[];
  relatedPages: Link[];
}

export interface CMSProject extends StrapiBase, ListableContentType {
  title: string;
  subtitle: string | null;
  url: string;
  githubURL: string;
  thumbnail: StrapiImage;
  screenshots: StrapiImage[];
  order: number;
  tags: CMSTag[];
  slug: string;
  description: string | [];
  relatedPages: Link[];
}

export interface CMSArtifact extends StrapiBase, ListableContentType {
  slug: string;
  title: string;
  subtitle: string;
  category: "presentation" | "report";
  description: string;
  url: string;
  publicationDate: string;

  relatedPages: Link[];

  primaryImage: StrapiImage;
  images: StrapiImage[];
}

// Singletons
export interface CMSGlobal extends StrapiBase {
  navbarLogo: Logo;
  navbarLinks: Link[];
  footerLogo: Logo;
  affiliateLogos: Logo[];
  footerLinks: Link[];
  seo: SEO;
  metadata: Metadata;
  favicon: BasicStrapiImage;
}

export interface CMSHome extends StrapiBase {
  searchSection: {
    id: number;
    title: string;
    description: string;
    belowSeachText: string;
    buttons: Button[];
  };
  blurbs: {
    id: number;
    tiles: {
      id: number;
      header: string;
      description: string;
    }[];
  };
  publishers: {
    id: number;
    header: string;
    description: string;
    callToActionText: string;
    publishers: {
      id: number;
      partnerURL: string | null;
      partnerName: string | null;
      partnerLogo: StrapiImage;
    }[];
    partners: {
      id: number;
      partnerURL: string | null;
      partnerName: string | null;
      partnerLogo: StrapiImage;
    }[];
    button: Button;
  };
}
