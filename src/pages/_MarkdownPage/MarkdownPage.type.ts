import { Options } from "react-markdown";

/**
 * MarkdownPageType type for MarkdownPage
 * @example
 * <MarkdownPage children=''
 */
export type MarkdownPageType = Options & {
  childrenPre?: React.ReactNode;
  childrenSuf?: MarkdownPageType['childrenPre'];
  title?: string;
  maxDepth?: number;
};