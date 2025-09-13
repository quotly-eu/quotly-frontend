import { components } from "./api";

/**
 * Reactions is a type that defines the structure of the reactions of the quote object.
 * @example 
 * import { Reaction } from 'types/Reaction.type';
 * 
 * const reaction: Reaction = {
 * ...
 * }
 */
export type Reaction = components['schemas']['QuoteReactionSchema'];