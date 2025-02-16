import { useMemo, useState } from 'react';
import { ApiResponse } from 'types/ApiResponse.type';

/**
 * 
 */
const useFetch = <T,>(route: string | URL, init?: RequestInit, isText?: boolean) => {
  const [ response, setResponse ] = useState<ApiResponse<T>>();
  const endpoint = useMemo(() => new URL(route), [route]);

  const runFetch = () => {
    fetch(endpoint, init).then(async res => setResponse({
      status: res.status,
      data: isText ? await res.text() : await res.json()
    }));
  };

  return {runFetch, response};
};

export default useFetch;
