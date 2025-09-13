import React from 'react';
import { useQuery } from 'hooks/useQuery';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { $api } from 'utils/api';

/**
 * OAuth Page to verify the Discord authorization
 */
const OAuth = () => {
  const { search } = useLocation();
  const query = useQuery(search);
  const navigate = useNavigate();
  const [ cookies, setCookie, removeCookie ] = useCookies([ 'state', 'token' ]);
  const { mutate: mutateAuthorize, data: authorize, isSuccess, isError } = $api.useMutation('post', '/v1/authorize');

  /**
   * Check if the authorization has been made only from the same site.
   */
  useEffect(() => {
    if (cookies.state !== query.get('state') || query.get('error')) {
      console.log('State mismatch or error from OAuth');
      removeCookie('state');
      navigate('/login?error', {
        replace: true
      });
      return;
    }
    removeCookie('state');
    mutateAuthorize({body: { code: query.get('code')! }});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutateAuthorize, navigate, query, removeCookie]);

  useEffect(() => {
    if (!authorize) return;
    if (isSuccess) {
      setCookie('token', authorize);
      navigate('/', {
        replace: true
      });
    } else if (process.env.NODE_ENV === 'production' && isError) {
      navigate('/login?error', {
        replace: true
      });
    }
  }, [authorize, isError, isSuccess, navigate, setCookie]);

  return <></>;
};

export default OAuth;
