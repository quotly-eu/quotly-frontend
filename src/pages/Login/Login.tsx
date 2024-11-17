import React, { useContext } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ApiContext } from 'contexts/ApiContext/ApiContext';

import Button from 'components/Button/Button';
import { ButtonStyles } from 'components/Button/Button.type';
import GuideLinks from 'components/GuideLinks/GuideLinks';

import { Style_Link } from 'utils/stylingTemplates';

import { ReactComponent as Logo } from 'assets/img/quotly.svg';

const Style_PageContainer = styled.div`
  display: grid;
  grid-area: route;
  grid-template-rows: 1fr auto;
`;

const Style_LoginContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto auto;

  ${({ theme }) => `
    padding: ${theme.spacing.m.rem};
    gap: ${theme.spacing.xl.rem};

    @media (max-width: ${theme.breakpoints.md}) {
      grid-auto-flow: row;
      grid-template-columns: none;
      grid-template-rows: 1fr auto auto;
    }
  `}

  place-self: center;
`;

const Style_LeftContainer = styled.div`
  max-width: 600px;
  place-self:center;
`;

const Style_Separator = styled.div`
  width: 1px;
  ${({ theme }) => `
    background-color: ${theme.colors.accent_white_1};

    @media (max-width: ${theme.breakpoints.md}) {
      width: unset;
      height: 1px;
    }
  `}
`;

const Style_RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;

  ${({ theme }) => `
    gap: ${theme.spacing.m.rem};
    // border-left: 2px solid ${theme.colors.transparency.black(0.1)};
    border-radius: ${theme.spacing.m.rem};
  `}
  place-self: center;
`;

const Style_Footer = styled.footer`
  ${({ theme }) => `
    padding: ${theme.spacing.xs.rem};
  `}
`;

const Style_Logo = styled(Logo)`
  width: 100%;
`;

const Style_Description = styled.h2`
  text-wrap: pretty;
  font-weight: 900;
`;

const Style_AuthInfo = styled.small`
  ${({ theme }) => `
    color: ${theme.colors.text.gray};
  `}
`;

const Style_GuideLink = styled.a`
  ${Style_Link}
`;

/**
 * Login page / Landing page for Quotly.
 */
const Login = () => {
  const { discordAuth } = useContext(ApiContext);
  const { t } = useTranslation();

  return (
    <Style_PageContainer>
    <Style_LoginContainer>
      <Style_LeftContainer>
        <Style_Logo />
      </Style_LeftContainer>
      <Style_Separator />
      <Style_RightContainer>
        <Style_Description>{t('description')}</Style_Description>
        <Button href={discordAuth} style={ButtonStyles.default}>
          <FontAwesomeIcon icon={['fab', 'discord']} />
          {t('login.discord_btn')}
        </Button>
        <Style_AuthInfo>
          <Trans i18nKey='login.auth_info'>
            <Style_GuideLink href='/tos'>TOS</Style_GuideLink>
            <Style_GuideLink href='/privacy'>Privacy Policy</Style_GuideLink>
            <Style_GuideLink href='/cookies'>Cookies</Style_GuideLink>
          </Trans>
        </Style_AuthInfo>
      </Style_RightContainer>
    </Style_LoginContainer>
    <Style_Footer>
      <GuideLinks textAlign='center' links={[
        {
          label: t('guides.privacy_policy'),
          url: '/privacy'
        },
        {
          label: t('guides.terms_of_service'),
          url: '/tos'
        },
        {
          label: t('guides.cookies'),
          url: '/cookies'
        },
        {
          label: '© 2024 ' + t('quotly')
        }
      ]} />
    </Style_Footer>
    </Style_PageContainer>
  );
};

export default Login;
