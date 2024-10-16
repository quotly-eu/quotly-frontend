import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { placeOrientation } from 'utils/placeOrientation';
import { PlaceOrientation, PlaceOrientationProps } from 'types/placeOrientation.type';
import { ButtonPaletteType } from './ButtonPalette.type';

interface ButtonPaletteProps extends PlaceOrientationProps {
  $active: boolean;
}

const ButtonPaletteContainer = styled.div`
  position: relative;
`;

const ButtonPaletteMenu = styled.div<ButtonPaletteProps>`
  position: absolute;
  display: flex;
  ${placeOrientation}

  border-radius: 100vmax;
  justify-content: start;
  transition: all 0.3s ease-in-out;
  z-index: 1;
  ${({ theme, $active }) => `
    box-shadow: ${theme.shadows.default}, inset ${theme.shadows.default};
    backdrop-filter: brightness(1.075) blur(10px);
    ${$active ? `
      opacity: 1;
      pointer-events: all;
      ` : `
      opacity: 0;
      pointer-events: none;
      scale: 0.9 1;
    `}
  `}
`;

/**
 * ButtonPalette Component to display a list of buttons
 * @param {ReactElement<typeof Button>[]} buttons - Array of buttons to display
 * @example
 * <ButtonPalette 
 *  buttons={[
 *   <Button isIconButton={true} style={ButtonStyles.transparent} children={<Icon icon="fluent-emoji:red-heart" height="100%" />} />,
 *   <Button isIconButton={true} style={ButtonStyles.transparent} children={<Icon icon="fluent-emoji:thumbs-up" height="100%" />} />,
 *  ]} 
 * />
 */
const ButtonPalette = ({triggerElement, buttons, place=PlaceOrientation.InsetLeft, margin="0rem", startMargin="0rem", alwaysOpen=false}:ButtonPaletteType) => {
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
      <ButtonPaletteMenu 
        $active={alwaysOpen || isOpen} 
        $margin={isOpen ? margin : startMargin} 
        $placeOrientation={place}
      >
        {buttons}
      </ButtonPaletteMenu>
    </ButtonPaletteContainer>
  );
};

export default ButtonPalette;
