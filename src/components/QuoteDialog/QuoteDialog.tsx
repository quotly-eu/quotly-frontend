import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { QuoteDialogType } from './QuoteDialog.type';
import Button from 'components/Button/Button';
import { ButtonStyles } from 'components/Button/Button.type';
import Dialog from 'components/Dialog/Dialog';
import Input from 'components/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Style_Form = styled.form`
  display: grid;
  grid-template-areas:
    'textarea'
    'actions';
    grid-template-columns: 1fr;
  gap: 1rem;

  ${({ theme }) => `
    padding: ${theme.spacing.s.rem};
  `}
`;

const Style_ActionsContainer = styled.div`
  grid-area: actions;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

/**
 * QuoteDialog component
 */
const QuoteDialog = forwardRef<HTMLDialogElement, QuoteDialogType>(
  ({open=false, toggleDialog}, ref) => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const quote = formData.get('quote');
      // TODO: POST form to create a new quote, then close the Dialog
      console.log(quote);
    };
    
    return (
      <Dialog ref={ref} toggleDialog={toggleDialog} open={open}>
        <Style_Form method='dialog' onSubmit={onSubmit}>
          <Input 
            id='quote' 
            name='quote' 
            as='textarea'
            placeholder='Quote...' 
            required 
          />
          <Style_ActionsContainer>
            <Button style={ButtonStyles.primary} as='button' type='submit'><FontAwesomeIcon icon='plus' /> Publish</Button>
          </Style_ActionsContainer>
        </Style_Form>
      </Dialog>
    );
  }
);

export default QuoteDialog;