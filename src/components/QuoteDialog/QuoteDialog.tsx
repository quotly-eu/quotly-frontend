import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { QuoteDialogType } from './QuoteDialog.type';
import Button from 'components/Button/Button';
import { ButtonStyles } from 'components/Button/Button.type';
import Dialog from 'components/Dialog/Dialog';

const Style_Form = styled.form`
  display: grid;
  grid-template-areas:
    'label textarea'
    'actions actions';
    grid-template-columns: auto 1fr;
  gap: 1rem;

  ${({ theme }) => `
    padding: ${theme.spacing.s.rem};
  `}
`;

const Style_ActionsContainer = styled.div`
  grid-area: actions;
  display: flex;
  justify-content: flex-end;
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

      console.log(quote);
    };
    
    return (
      <Dialog ref={ref} toggleDialog={toggleDialog} open={open}>
        <Style_Form method='dialog' onSubmit={onSubmit}>
          <label htmlFor='quote'>Quote</label>
          <textarea id='quote' name='quote' required />
          <Style_ActionsContainer>
            <Button type='button' style={ButtonStyles.transparent} onClick={toggleDialog}>Cancel</Button>
            <Button type='submit' style={ButtonStyles.primary}>Submit</Button>
          </Style_ActionsContainer>
        </Style_Form>
      </Dialog>
    );
  }
);

export default QuoteDialog;