import React from 'react';
import Markdown from 'react-markdown';
import PageTitle from 'components/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Style_PrivacyPolicyPage = styled.div`
  grid-area: route;
  max-width: 1000px;
  ${({ theme }) => `
    padding: ${theme.spacing.xl.rem};
  `}
  place-self: center;
`;

/**
 * Privacy Policy Content of Quotly.
 */
const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <Style_PrivacyPolicyPage>
      <PageTitle title={t('guides.privacy_policy')} />
      <Markdown />
    </Style_PrivacyPolicyPage>
  );
};

export default PrivacyPolicy;
