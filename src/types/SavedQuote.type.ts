import { User } from 'types/User.type';
import { QuoteType } from './Quote.type';

/**
 * QuoteType is a type that defines the structure of the quote object.
 * @example 
 * import { QuoteType } from 'types/Quote.type';
 * 
 * const quote: QuoteType = {
 * ...
 * }
 */
export type SavedQuote = {
  savedId: number;
  quote: QuoteType;
  user: User;
};