import React, { useEffect } from 'react';
import useFetch from 'hooks/useFetch';
import MarkdownPage from 'pages/_MarkdownPage/MarkdownPage';
import { useTranslation } from 'react-i18next';

/**
 * Usage of Cookies Page, displays info how and why we use cookies
 */
const TermsOfService = () => {
  const { t, i18n: { language } } = useTranslation();
  const url = new URL(`/locales/${language}/TermsOfService.md`, window.location.href).href;
  const markdown = useFetch<string>(url, {
    headers: [
      ['Accept', 'text/markdown']
    ]
  }, true);

  useEffect(() => markdown.runFetch(), []);

  return (
    <MarkdownPage children={markdown.response?.data} title={t('guides.tos')} maxDepth={3} />
  );
};

export default TermsOfService;
