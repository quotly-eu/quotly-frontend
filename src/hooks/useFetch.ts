import { useEffect, useMemo, useState } from 'react';

import { ApiResponse } from 'types/ApiResponse.type';

/**
 * 
 */
const useFetch = <T,>(route: string, init?: RequestInit, isText = false) => {
  const [ response, setResponse ] = useState<ApiResponse<T>>({
    status: 'unknown'
  });
  const endpoint = useMemo(() => new URL(route), [route]);

  useEffect(() => {
    fetch(endpoint, init).then(async (resolved) => {
      if(resolved.status >= 400) {
        setResponse({
          status: 'error',
          errorCode: resolved.status
        });
      } else if(isText) {
        setResponse({
          status: 'success',
          data: await resolved.text() as T
        });
      } else setResponse(await resolved.json());
    });
  }, []);

  return response;
};

export default useFetch;
