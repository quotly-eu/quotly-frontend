/**
 * PlaceOrientationProps for placeOrientation
 * @example
 * import { PlaceOrientation, PlaceOrientationProps } from 'types/placeOrientation.type';
 * import { placeOrientation } from 'utils/placeOrientation';
 * 
 * const FloatDropDownMenu = styled.div<PlaceOrientationProps>`
 *  position:absolute;
 *  ${placeOrientation}
 * `;
 */
export interface PlaceOrientationProps {
  $placeOrientation?: PlaceOrientation,
  $margin: string,
}

/**
 * PlaceOrientation enum for placeOrientation
 * @example
 * import FloatDropDown from 'components/FloatDropDown/FloatDropDown';
 * import { PlaceOrientation } from 'types/placeOrientation.type';
 * 
 * <FloatDropDown place={PlaceOrientation.TopLeft} />
 */
export enum PlaceOrientation {
  TopLeft,
  Top,
  TopRight,

  Left,
  Center,
  Right,
  LeftInlineTop,
  LeftInlineBottom,
  RightInlineTop,
  RightInlineBottom,

  BottomLeft,
  Bottom,
  BottomRight,

  InsetTopLeft,
  InsetTop,
  InsetTopRight,

  InsetLeft,
  InsetRight,
  
  InsetBottomLeft,
  InsetBottom,
  InsetBottomRight
}