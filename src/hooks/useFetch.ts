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
    fetch(endpoint, init).then(async (res) => {
      if(isText) setResponse({
        status: 'success',
        data: await res.text() as T
      });
      else setResponse(await res.json());
    });
  }, []);

  return response;
};

export default useFetch;
