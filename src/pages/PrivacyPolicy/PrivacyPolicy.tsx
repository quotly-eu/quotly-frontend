import React from 'react';

import { useTranslation } from 'react-i18next';
import useFetch from 'hooks/useFetch';

import MarkdownPage from 'pages/_MarkdownPage/MarkdownPage';
/**
 * Privacy Policy Content of Quotly.
 */
const PrivacyPolicy = () => {
  const { t, i18n: { language } } = useTranslation();
  const url = new URL(`/locales/${language}/PrivacyPolicy.md`, window.location.href).href;
  const markdown = useFetch<string>(url, undefined, true);

  return (
    <>
      <MarkdownPage children={markdown.data} title={t('guides.privacy_policy')} />
    </>
  );
};

export default PrivacyPolicy;
