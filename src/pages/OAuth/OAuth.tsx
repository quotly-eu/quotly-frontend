import { ApiContext } from 'contexts/ApiContext/ApiContext';
import useFetch from 'hooks/useFetch';
import { useQuery } from 'hooks/useQuery';
import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * OAuth Page to verify the Discord authorization
 */
const OAuth = () => {
  const { search } = useLocation();
  const { routes } = useContext(ApiContext);
  const query = useQuery(search);
  const navigate = useNavigate();
  const [ cookies, setCookie, removeCookie ] = useCookies(['state', 'token']);
  const {runFetch, response} = useFetch<string>(routes.authorize.construct(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      code: query.get('code')!
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
  }, []);

  useEffect(() => {
    if(response?.status === 200) {
      setCookie('token', response.data);
      navigate('/', {
        replace: true
      });
    } 
  }, [response]);

  return <></>;
};

export default OAuth;
