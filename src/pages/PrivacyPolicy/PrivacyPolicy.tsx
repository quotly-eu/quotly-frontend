import React from 'react';

import { useTranslation } from 'react-i18next';
import useFetch from 'hooks/useFetch';

import MarkdownPage from 'pages/_MarkdownPage/MarkdownPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
/**
 * Privacy Policy Content of Quotly.
 */
const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { t, i18n: { language } } = useTranslation();
  const url = new URL(`/locales/${language}/PrivacyPolicy.md`, window.location.href).href;
  const markdown = useFetch<string>(url, undefined, true);

  const returnOnClick = () => navigate(-1);

  return (
    <>
      <Button isIconButton onClick={returnOnClick}><FontAwesomeIcon icon='arrow-left' /></Button>
      <MarkdownPage children={markdown.data} title={t('guides.privacy_policy')} />
    </>
  );
};

export default PrivacyPolicy;
