import useFetch from 'hooks/useFetch';
import { useQuery } from 'hooks/useQuery';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * OAuth Page to verify the Discord authorization
 */
const OAuth = () => {
  const { search } = useLocation();
  const query = useQuery(search);
  const navigate = useNavigate();
  const [ cookies, , removeCookie ] = useCookies(['state']);
  const {runFetch, response} = useFetch('http://localhost:3510/v1/authorize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code: query.get('code')
    })
  });

  /**
   * Check if the authorization has been made only from the same site.
   */
  useEffect(() => {
    if(cookies.state === query.get('state')) {
      removeCookie('state');
      runFetch();
    } else {
      navigate('/login?error', {
        replace: true
      });
    }
  }, [query, response]);

  return <></>;
};

export default OAuth;
