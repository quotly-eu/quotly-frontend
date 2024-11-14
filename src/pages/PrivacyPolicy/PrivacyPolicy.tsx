import PageTitle from 'components/PageTitle/PageTitle';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Style_PrivacyPolicyPage = styled.div`
grid-area: route;
max-width: 1000px;
${({ theme }) => `
  padding: ${theme.spacing.xl.rem};
  h1, h2, p, ul, ol {
    padding-block: ${theme.spacing.xxs.rem};
  }

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
    </Style_PrivacyPolicyPage>
  );
};

export default PrivacyPolicy;
