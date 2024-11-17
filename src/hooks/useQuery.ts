import React from "react";

/**
 * UseQuery Hook lets you easily access mapped search parameters.
 * @param search - The search property from the useLocation hook.
 * @returns 
 */
export const useQuery = (search: string) => {
  return React.useMemo(() => new URLSearchParams(search), [search]);
};