import { components } from './api';

/**
 * QuoteType is a type that defines the structure of the quote object.
 * @example 
 * import { QuoteType } from 'types/Quote.type';
 * 
 * const quote: QuoteType = {
 * ...
 * }
 */
export type QuoteType = components['schemas']['QuoteSchema'];