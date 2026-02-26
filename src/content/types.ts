export interface SiteConfig {
  title: string;
  description: string;
  nav: NavItem[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroContent {
  label: string;
  headline: string[];
  accentWord: string;
  description: string;
  status: StatusItem[];
}

export interface StatusItem {
  key: string;
  value: string;
  segment?: boolean;
}

export interface Project {
  tag: string;
  year: string;
  title: string;
  description: string;
  stack: string[];
  href: string;
  featured?: boolean;
}

export interface Post {
  date: string;
  title: string;
  tag: string;
  tagLabel: string;
  href: string;
}

export interface FilterDef {
  key: string;
  label: string;
}

export interface AboutContent {
  paragraphs: AboutParagraph[];
  specs: SpecBlock[];
}

export interface AboutParagraph {
  text: string;
  lead?: boolean;
}

export interface SpecBlock {
  label: string;
  lines: string[];
}

export interface ContactContent {
  headline: string;
  description: string;
  links: ContactLink[];
}

export interface ContactLink {
  label: string;
  href: string;
}

export type FeedEntryType = 'thought' | 'link' | 'build' | 'question' | 'til';

export interface FeedEntry {
  type: FeedEntryType;
  date: string;
  body: string;
  url?: string;
  project?: string;
}
