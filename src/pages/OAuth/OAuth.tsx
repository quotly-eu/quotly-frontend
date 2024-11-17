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

  /**
   * Check if the authorization has been made only from the same site.
   */
  useEffect(() => {
    if(cookies.state === query.get('state')) {
      removeCookie('state');
      navigate('/');
    } else {
      navigate('/login?error');
    }
  }, [query]);

  return <></>;
};

export default OAuth;
