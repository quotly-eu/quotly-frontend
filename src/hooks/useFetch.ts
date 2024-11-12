import { useContext, useEffect, useMemo, useState } from 'react';

import { ApiContext } from 'contexts/ApiContext/ApiContext';

import { ApiResponse } from 'types/ApiResponse.type';

/**
 * 
 * @returns 
 */
const useFetch = <T,>(route: string, init?: RequestInit) => {
  const { baseUrl } = useContext(ApiContext);
  const [ response, setResponse ] = useState<ApiResponse<T>>({
    status: 'unknown'
  });
  const endpoint = useMemo(() => new URL(route, baseUrl), [baseUrl, route]);

  useEffect(() => {
    fetch(endpoint, init).then(async (res) => {
      setResponse(await res.json());
    });
  }, []);

  return response;
};

export default useFetch;
