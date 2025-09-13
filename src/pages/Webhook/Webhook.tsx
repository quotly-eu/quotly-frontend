import React, { useEffect } from 'react';
import { useQuery } from 'hooks/useQuery';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { $api } from 'utils/api';

/**
 * Webhook Page to verify the Discord authorization
 */
const Webhook = () => {
  const { search } = useLocation();
  const query = useQuery(search);
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(['state', 'token']);
  const { mutate: mutateWebhook, isError, isSuccess } = $api.useMutation('post', '/v1/users/webhook'); 

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
    mutateWebhook({
      body: {
        code: query.get('code')!,
      }
    });
  }, [cookies.state, navigate, query, removeCookie, mutateWebhook]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/settings', {
        replace: true
      });
    } else if (process.env.NODE_ENV === 'production' && isError) {
      navigate('/settings?error', {
        replace: true
      });
    }
  }, [isError, isSuccess, navigate]);

  return <></>;
};

export default Webhook;
