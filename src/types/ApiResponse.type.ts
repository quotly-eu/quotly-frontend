/**
 * Default Response Schema declaration
 * @example
 * {
 *  status: 'success',
 *  data: {}
 * }
 */
export type ApiResponse <T,> = {
  status: number;
  data: T & { detail?: string | object; };
};