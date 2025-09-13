import Button from 'components/Button/Button';
import { Dispatch, ReactElement, SetStateAction } from 'react';
import { PlaceOrientation } from 'types/placeOrientation.type';

/**
 * ButtonPaletteType for ButtonPalette
 * @example
 * import ButtonPalette from 'components/ButtonPalette/ButtonPalette';
 * 
 * <ButtonPalette />
 */
export type ButtonPaletteType = {
  triggerElement: ReactElement;
  place?: PlaceOrientation;
  margin?: string;
  startMargin?: string;
  buttons: ReactElement<typeof Button>[];
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
};