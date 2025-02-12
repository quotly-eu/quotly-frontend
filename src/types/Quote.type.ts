import { User } from 'types/User.type';

/**
 * QuoteType is a type that defines the structure of the quote object.
 * @example 
 * import { QuoteType } from 'types/Quote.type';
 * 
 * const quote: QuoteType = {
 * ...
 * }
 */
export type QuoteType = {
  quote: string;
  quoteId: string;
  createdAt: string;
  changedAt?: string;
  deletedAt?: string;
  user: User;
  reactions: []
    // reactedIcon?: 'red-heart' | 'thumbs-up' | 'face-with-tears-of-joy' | 'melting-face' | 'skull';
};