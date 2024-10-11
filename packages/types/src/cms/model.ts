export interface StrapiBase {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string | null;
  publishedAt: string;
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

export interface BasicCMSImage extends StrapiBase, ImageBase {
  alternativeText: string | null;
  caption: string | null;
  previewUrl: string | null;
  provider: "local" | string;
  provider_metadata: null | any;
}

export interface CMSImage extends BasicCMSImage {
  formats: ImageFormats;
}

type ImageFormat = "thumbnail" | "small" | "medium" | "large";

type ImageFormats = Record<ImageFormat, ImageFormatData>;

// Components
export interface CMSLogo {
  id: number;
  altText: string | null;
  image: CMSImage;
  darkImage: CMSImage;
}

export interface CMSLink {
  id: number;
  label: string;
  url: string;
  newTab: boolean;
  category: string | null;
}

export interface CMSSeo {
  id: number;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
  metaRobots: string | null;
  structuredData: string | null;
  metaViewport: string | null;
  canonicalURL: string | null;
}

export interface CMSMetadata {
  id: number;
  title: string;
  description: string;
}

export interface CMSButton {
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
  primaryLink: CMSLink;
  subMenu: {
    id: number;
    deatailLine: string;
    description: string;
    link: CMSLink;
    subItems: CMSLink[];
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
  relatedPages: CMSLink[];
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
  thumbnail: CMSImage;
  description: string | null;
  url: string;
  tags: CMSTag[];
  order: number;
  docURL: string | null;
  githubURL: string | null;
  screenshots: CMSImage[];
  relatedPages: CMSLink[];
}

export interface CMSProject extends StrapiBase, ListableContentType {
  title: string;
  subtitle: string | null;
  url: string;
  githubURL: string;
  thumbnail: CMSImage;
  screenshots: CMSImage[];
  order: number;
  tags: CMSTag[];
  slug: string;
  description: string | null;
  relatedPages: CMSLink[];
}

export interface CMSArtifact extends StrapiBase, ListableContentType {
  slug: string;
  title: string;
  subtitle: string;
  category: "presentation" | "report";
  description: string;
  url: string;
  publicationDate: string;

  relatedPages: CMSLink[];

  primaryImage: CMSImage;
  images: CMSImage[];
}

// Singletons
export interface CMSGlobal extends StrapiBase {
  navbarLogo: CMSLogo;
  navbarLinks: CMSLink[];
  footerLogo: CMSLogo;
  affiliateLogos: CMSLogo[];
  footerLinks: CMSLink[];
  seo: CMSSeo;
  metadata: CMSMetadata;
  favicon: BasicCMSImage;
}

export interface CMSHome extends StrapiBase {
  searchSection: {
    id: number;
    title: string;
    description: string;
    belowSeachText: string;
    buttons: CMSButton[];
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
      partnerLogo: CMSImage;
    }[];
    partners: {
      id: number;
      partnerURL: string | null;
      partnerName: string | null;
      partnerLogo: CMSImage;
    }[];
    button: CMSButton;
  };
}
