import { useMemo, useState } from 'react';

/**
 * 
 */
const useFetch = <T,>(route: string, init?: RequestInit) => {
  const [ response, setResponse ] = useState<T>();
  const endpoint = useMemo(() => new URL(route), [route]);

  const runFetch = () => {
    fetch(endpoint, init).then(async res => setResponse(await res.json()));
  };

  return {runFetch, response};
};

export default useFetch;
