import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

/**
 * Allow to easily change the current document title with a component
 * @param title 
 */
const PageTitle = ({ title, prefix }:{ title? : string, prefix?: string }) => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${prefix ?? t('quotly')}${title ? (' - ' + title) : ''}`;
  }, [location, title]);

  return null;
};

export default PageTitle;