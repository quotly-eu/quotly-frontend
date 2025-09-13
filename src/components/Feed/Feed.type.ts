import { ReactNode } from "react";

/**
 * FeedType for Feed component.
 * @example
 * import Feed from 'components/Feed/Feed';
 * 
 * <Feed title='Top Posts' />
 */
export type FeedType = {
  title?: string;
  items: {
    item: ReactNode,
    url: string,
  }[];
};