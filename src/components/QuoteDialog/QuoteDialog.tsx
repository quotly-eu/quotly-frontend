import React, { forwardRef, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Markdown from 'react-markdown';

import Button from 'components/Button/Button';
import Dialog from 'components/Dialog/Dialog';
import Input from 'components/Input/Input';
import GuideLinks from 'components/GuideLinks/GuideLinks';

import { ButtonStyles } from 'components/Button/Button.type';
import { QuoteDialogType } from './QuoteDialog.type';
import useFetch from 'hooks/useFetch';
import { ApiContext } from 'contexts/ApiContext/ApiContext';
import { useCookies } from 'react-cookie';

const Style_Form = styled.form`
  display: grid;
  grid-template-areas:
    'links'
    'textarea'
    'actions';
    grid-template-columns: 1fr;
    grid-template-rows: auto 2fr auto;
  gap: 1rem;

  ${({ theme }) => `
    padding: ${theme.spacing.s.rem};
  `}
`;

const Style_Markdown = styled.div`
  ${({ theme }) => `
    background-color: ${theme.colors.transparency.white(0.5)};
    padding: ${theme.spacing.s.rem};
    border-radius: ${theme.spacing.m.rem};
    font-size: ${theme.font.sizes.s.rem};
    box-shadow: ${theme.shadows.default};
  `}
  text-align:center;
  text-wrap: balance;
`;

const Style_ActionsContainer = styled.div`
  grid-area: actions;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
`;

/**
 * QuoteDialog component
 */
const QuoteDialog = forwardRef<HTMLDialogElement, QuoteDialogType>(
  ({open=false, toggleDialog}, ref) => {
    const { t } = useTranslation();
    const { routes } = useContext(ApiContext);
    const [cookies] = useCookies(['token']);
    
    const [quoteText, setQuoteText] = useState<string>('');
    const [preview, setPreview] = useState<boolean>(false);
    const [isSubmitDisabled, setIsButtonDisabled] = useState(false);
    const { runFetch, response } = useFetch(routes.quotes.sub?.create() || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        quote: quoteText,
        token: cookies.token
      })
    });

    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      runFetch();
      setIsButtonDisabled(true);
    };
    
    useEffect(() => {
      if(!response) return;
      toggleDialog();
      setQuoteText('');
      setIsButtonDisabled(false);
    }, [response]);

    return (
      <Dialog ref={ref} toggleDialog={toggleDialog} open={open}>
        <Style_Form method='dialog' onSubmit={onSubmit}>
          <GuideLinks 
            links={[
              {
                label: (<><FontAwesomeIcon icon={['fab', 'markdown']} /> Markdown</>), 
                url: 'https://www.markdownguide.org/basic-syntax/'
              }
            ]} 
          />
          {!preview ? 
            <Input 
              id='quote' 
              name='quote' 
              as='textarea'
              placeholder={`${t('quote.quote')}...`}
              onChange={setQuoteText}
              value={quoteText}
              required
              rows={4}
            /> // TODO: Add autofocus on Input
            : 
            <Style_Markdown children={<Markdown children={quoteText} />} />
          }
          <Style_ActionsContainer>
            <Button
              btnStyle={ButtonStyles.transparent} 
              onClick={() => setPreview(!preview)}
            >
              <FontAwesomeIcon icon='repeat' /> {!preview ? t('quote.preview') : t('quote.write')}
            </Button>
            <Button 
              btnStyle={ButtonStyles.primary} 
              onClick={() => setPreview(false)}
              as='button'
              type='submit'
              disabled={isSubmitDisabled}
            >
              <FontAwesomeIcon icon='quote-right' /> {t('quote.publish')}
            </Button>
          </Style_ActionsContainer>
        </Style_Form>
      </Dialog>
    );
  }
);

export default QuoteDialog;