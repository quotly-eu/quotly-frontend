import { User } from "./User.type";

/**
 * Type for Comment Response
 * @example
 * const comment: Comment = {
 *  ...
 * }
 */
export type Comment = {
  commentId: number;
  parent?: number;
  quoteId: number;
  comment: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  user: User;
};