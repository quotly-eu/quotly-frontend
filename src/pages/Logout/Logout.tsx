import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

/**
 * OAuth Page to verify the Discord authorization
 */
const Logout = () => {
  const navigate = useNavigate();
  const [ , , removeCookie ] = useCookies(['token']);

  /**
   * Check if the authorization has been made only from the same site.
   */
  useEffect(() => {
    removeCookie('token');
    navigate('/login', {
      replace: true
    });
  }, []);

  return <></>;
};

export default Logout;
