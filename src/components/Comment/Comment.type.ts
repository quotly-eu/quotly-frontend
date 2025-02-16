/**
 * CommentType Type for a comment component
 * @example
 * <QuoteComment />
 */
export type CommentType = {
  id?: number;
  author: string;
  avatarUrl: string;
  comment: string;
  dated: Date; 
  level?: number;
  children?: CommentType[]
};