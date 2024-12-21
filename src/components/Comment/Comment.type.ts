/**
 * CommentType Type for a comment component
 * @example
 * <QuoteComment />
 */
export type CommentType = {
  author: string;
  avatarUrl: string;
  comment: string;
  dated: Date; 
  level?: number;
  children?: CommentType[]
};