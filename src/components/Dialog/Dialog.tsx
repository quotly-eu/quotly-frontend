import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { DialogType } from './Dialog.type';

const Style_QuoteDialog = styled.dialog`
  ${({ theme }) => `
    background-color: ${theme.colors.accent_white_0};
    gap: ${theme.spacing.s.rem};
    
    border-radius: ${theme.spacing.s.rem};
    box-shadow: ${theme.shadows.default};
  `}
  width: 100%;
  max-width: 800px;
  
  border: none;
  place-self: center;

  &::backdrop {
    backdrop-filter: brightness(0.5) blur(5px);
  }
`;

const Dialog = forwardRef<HTMLDialogElement, DialogType>(({
  open=false, 
  toggleDialog,
  children
}, ref) => {
  const onClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      toggleDialog();
    }
  };

  return (
    <Style_QuoteDialog ref={ref} onClick={onClick} open={open}>
      {children}
    </Style_QuoteDialog>
  );
});

export default Dialog;