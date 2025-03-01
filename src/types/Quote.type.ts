import { User } from 'types/User.type';
import { Reaction } from './Reaction.type';

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
  isSaved?: boolean;
  reaction?: Reaction['reactionName'];
  reactions?: Reaction[];
};