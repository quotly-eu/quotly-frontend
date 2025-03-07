import { useApiContext } from 'contexts/ApiContext/ApiContext';
import useFetch from 'hooks/useFetch';
import { useQuery } from 'hooks/useQuery';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Webhook Page to verify the Discord authorization
 */
const Webhook = () => {
  const { search } = useLocation();
  const { routes } = useApiContext();
  const query = useQuery(search);
  const navigate = useNavigate();
  const [ cookies, setCookie, removeCookie ] = useCookies([ 'state', 'token' ]);
  const { runFetch, response } = useFetch<string>(`${routes.users.sub?.webhook()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      code: query.get('code')!,
      token: cookies.token
    })
  });

  /**
   * Check if the authorization has been made only from the same site.
   */
  useEffect(() => {
    if (cookies.state !== query.get('state') || query.get('error')) {
      removeCookie('state');
      navigate('/settings?error', {
        replace: true
      });
      return;
    }
    removeCookie('state');
    runFetch();
  }, []);

  useEffect(() => {
    if (!response) return;
    if (response?.status === 200) {
      setCookie('token', response.data);
      navigate('/settings', {
        replace: true
      });
    } else if (process.env.NODE_ENV === 'production') {
      navigate('/settings?error', {
        replace: true
      });
    }
  }, [ response ]);

  return <></>;
};

export default Webhook;
