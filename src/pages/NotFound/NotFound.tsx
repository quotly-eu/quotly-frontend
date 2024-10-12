import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

import Button from 'components/Button/Button';

import { ButtonStyles } from 'components/Button/Button.type';

// Styles
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  ${({ theme }) => `
    gap: ${theme.spacing.m.rem};
    border-radius: ${theme.spacing.s.rem};

    font-size: ${theme.font.sizes.m.rem};
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.font.sizes.xxs.rem};
    }
  `}

  text-align: center;
  text-wrap: balance;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  ${({ theme }) => `
    background-color: ${theme.colors.accent_white_0};
    background-image: linear-gradient(105deg, transparent 30%, ${theme.colors.transparency.black(0.1)}, transparent 70%);
    background-size: 100vw 100%;
    padding: ${theme.spacing.xxs.em};
    border-radius: 100vmax;

    animation: gradient 5s linear infinite;
  `}

  @keyframes gradient {
    0% {background-position: 40vw}
    100% {background-position: 140vw}
  }
  font-weight: unset;
`;

const Style_Button = styled(Button)`
  font-weight: inherit;
  ${({ theme }) => `
    font-size: ${theme.font.sizes.s.em};
  `}
`;

/**
 * Catch-All Page that weren't found ( 404 )
 */
const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <NotFoundContainer>
      <Title>
        <strong>{t('page_not_found.404')}</strong> - {t('page_not_found.title')}
      </Title>
      <p>
        {t('page_not_found.description')}
      </p>
      <Style_Button 
        onClick={() => navigate(-1)}
        style={ButtonStyles.primary}
        gap={theme.spacing.xs.em}
      >
        <i className='fas fa-arrow-left'></i> {t('page_not_found.return')}
      </Style_Button>
    </NotFoundContainer>
  );
};

export default NotFound;