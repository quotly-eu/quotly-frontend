import Button from "components/Button/Button";
import { ReactElement } from "react";
import { PlaceOrientation } from "types/placeOrientation.type";

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
  alwaysOpen?: boolean;
};