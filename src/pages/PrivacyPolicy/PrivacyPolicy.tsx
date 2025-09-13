import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import useFetch from 'hooks/useFetch';

import MarkdownPage from 'pages/_MarkdownPage/MarkdownPage';
/**
 * Privacy Policy Content of Quotly.
 */
const PrivacyPolicy = () => {
  const { t, i18n: { language } } = useTranslation();
  const url = new URL(`/locales/${language}/PrivacyPolicy.md`, window.location.href).href;
  const  { runFetch, response } = useFetch<string>(url, {
    headers: [
      ['Accept', 'text/markdown']
    ]
  }, true);

  useEffect(() => runFetch(), [runFetch]);

  return (
    <MarkdownPage title={t('guides.privacy_policy')}>{response?.data}</MarkdownPage>
  );
};

export default PrivacyPolicy;
