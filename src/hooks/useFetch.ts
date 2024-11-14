import { useEffect, useMemo, useState } from 'react';

import { ApiResponse } from 'types/ApiResponse.type';

/**
 * 
 * @returns 
 */
const useFetch = <T,>(route: string, init?: RequestInit) => {
  const [ response, setResponse ] = useState<ApiResponse<T>>({
    status: 'unknown'
  });
  const endpoint = useMemo(() => new URL(route), [route]);

  useEffect(() => {
    fetch(endpoint, init).then(async (res) => {
      setResponse(await res.json());
    });
  }, []);

  return response;
};

export default useFetch;
