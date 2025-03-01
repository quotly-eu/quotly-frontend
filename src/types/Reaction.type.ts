/**
 * Reactions is a type that defines the structure of the reactions of the quote object.
 * @example 
 * import { Reaction } from 'types/Reaction.type';
 * 
 * const reaction: Reaction = {
 * ...
 * }
 */
export type Reaction = {
  reactionName: 'red-heart' | 'thumbs-up' | 'face-with-tears-of-joy' | 'melting-face' | 'skull';
  count: number;
};