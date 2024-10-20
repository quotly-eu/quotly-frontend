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
    item: React.ReactNode,
    url: string,
  }[];
};