import { Options } from "react-markdown";

/**
 * MarkdownPageType type for MarkdownPage
 * @example
 * <MarkdownPage children=''
 */
export type MarkdownPageType = Options & {
  title?: string;
};