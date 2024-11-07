/**
 * Default Response Schema declaration
 * @example
 * {
 *  status: 'success',
 *  data: {}
 * }
 */
export type ApiResponse <T,> = {
  status: 'success' | 'error' | 'unknown';
  errorCode?: number;
  data?: T;
};