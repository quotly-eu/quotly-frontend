/**
 * User Schema declaration
 * @example
 * {
 *  discordId: '275631064574197761',
 *  displayName: 'Jordina',
 *  creationTime: '2019-12-29T03:39:07'
 * }
 */
export type User = {
  userId: string;
  discordId: string;
  displayName: string;
  emailAddress?: string;
  avatarUrl: string;
  createdAt: string;
  deletedAt?: string
};