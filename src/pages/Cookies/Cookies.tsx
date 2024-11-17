import React from 'react';
import useFetch from 'hooks/useFetch';
import MarkdownPage from 'pages/_MarkdownPage/MarkdownPage';
import { useTranslation } from 'react-i18next';

/**
 * Usage of Cookies Page, displays info how and why we use cookies
 */
const Cookies = () => {
  const { t, i18n: { language } } = useTranslation();
  const url = new URL(`/locales/${language}/Cookies.md`, window.location.href).href;
  const markdown = useFetch<string>(url, {
    headers: [
      ['Accept', 'text/markdown']
    ]
  }, true);

  return (
    <MarkdownPage children={markdown.data} title={t('guides.cookies')} maxDepth={2} />
  );
};

export default Cookies;
