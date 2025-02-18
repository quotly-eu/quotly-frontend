/**
 * Role Schema declaration
 * @example
 * {
 *  name: "admin",
 *  createdAt: "2025-02-17T21:59:37",
 *  roleId: 1
 * }
 */
export type Role = {
  roleId: number;
  name: string;
  createdAt: string;
};