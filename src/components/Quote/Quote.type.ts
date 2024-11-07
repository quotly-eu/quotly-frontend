/**
 * QuoteType is a type that defines the structure of the quote object.
 * @example 
 * import { QuoteType } from 'types/Quote.type';
 * 
 * const quote: QuoteType = {
 *  quote: {
 *    id: '1',
 *    text: `**Test**`,
 *    url: '/',
 *    dated: '2 days ago'
 *  },
 *  author: {
 *   name: 'Author',
 *   avatarUrl: '/',
 *   url: '/'
 *  }
 * };
 */
export type QuoteType = {
  quote: {
    id: string;
    text: string;
    url: string;
    dated: Date;
  }
  author: {
    name: string;
    avatarUrl?: string;
    url: string;
  },
  reactions?: {
    reactedIcon?: 'red-heart' | 'thumbs-up' | 'face-with-tears-of-joy' | 'melting-face' | 'skull';
    icons: {
      icon: string;
      count?: number;
    }[]
  },
  isLast?: boolean;
};