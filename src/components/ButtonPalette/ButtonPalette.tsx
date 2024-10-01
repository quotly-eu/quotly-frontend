import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button/Button';

interface ButtonPaletteProps {
  $active: boolean;
}

const ButtonPaletteContainer = styled.div`
  position: relative;
`;

const ButtonPaletteMenu = styled.div<ButtonPaletteProps>`
  position: absolute;
  display: flex;

  right: 0;
  top: 50%;
  translate: 10px -50%;

  border-radius: 100vmax;
  justify-content: start;
  transition: all 0.3s ease-in-out;
  ${({ theme, $active }) => `
    width: fit-content;

    box-shadow: ${theme.shadows.default}, inset ${theme.shadows.default};
    backdrop-filter: brightness(1.075) blur(10px);
    ${$active ? `
      opacity: 1;
      pointer-events: all;
      translate: 0 -50%;
      ` : `
      opacity: 0;
      pointer-events: none;
    `}
  `}
`;

/**
 * ButtonPalette Component to display a list of buttons
 * @param {ReactElement<typeof Button>[]} buttons - Array of buttons to display
 * @example
 * <ButtonPalette buttons={[
 *  <Button isIconButton={true} style={ButtonStyles.transparent} children={<Icon icon="fluent-emoji:red-heart" height="100%" />} />,
 *  <Button isIconButton={true} style={ButtonStyles.transparent} children={<Icon icon="fluent-emoji:thumbs-up" height="100%" />} />,
 * ]} />
 */
const ButtonPalette = ({triggerElement, buttons}:{
  triggerElement: ReactElement;
  buttons: ReactElement<typeof Button>[]
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const cloneTriggerElement = React.cloneElement(triggerElement, {
    onClick: toggleMenu
  });

  useEffect(() => {
    const toggleOutside = (event: MouseEvent) => {
      const menuTarget = menuRef.current;
      if(menuTarget && !menuTarget.contains(event.target as Node)) 
        setIsOpen(false);
    };
    document.addEventListener('click', toggleOutside);

    return () => {document.removeEventListener('click', toggleOutside);};
  });

  return (
    <ButtonPaletteContainer ref={menuRef}>
      {cloneTriggerElement}
      <ButtonPaletteMenu $active={isOpen}>
        {buttons}
      </ButtonPaletteMenu>
    </ButtonPaletteContainer>
  );
};

export default ButtonPalette;
