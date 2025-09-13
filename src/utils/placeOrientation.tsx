import { css } from "styled-components";
import { PlaceOrientation, PlaceOrientationProps } from "types/placeOrientation.type";

/**
 * @example
 * import { placeOrientation } from 'utils/placeOrientation';
 * import { PlaceOrientation, PlaceOrientationProps } from 'types/placeOrientation.type';
 * 
 * const FloatDropDownMenu = styled.div<PlaceOrientationProps>`
 *  position:absolute;
 *  ${placeOrientation}
 * `;
 */
export const placeOrientation = css<PlaceOrientationProps>`
${({ $placeOrientation, $margin }) => {
    switch($placeOrientation) {
      case PlaceOrientation.TopLeft: 
        return css`
          bottom: 100%;
          left: 0;
          translate: 0 calc(-${$margin});
          transform-origin: bottom left;
        `;
      case PlaceOrientation.Top: 
        return css`
          bottom: 100%;
          left: 50%;
          translate: -50% calc(-${$margin});
          transform-origin: bottom;
        `;
      case PlaceOrientation.TopRight: 
        return css`
          bottom: 100%;
          right: 0;
          translate: 0 calc(-${$margin});
          transform-origin: bottom right;
        `;

      case PlaceOrientation.Left: 
        return css`
          bottom: 50%;
          right: 100%;
          translate: calc(-${$margin}) 50%;
          transform-origin: left;
        `;
      case PlaceOrientation.Center:
        return css`
          bottom: 50%;
          left: 50%;
          translate: calc(-50% -${$margin}) 50%;
        `;
      case PlaceOrientation.Right:
        return css`
          bottom: 50%;
          left: 100%;
          translate: calc(${$margin}) 50%;
          transform-origin: right;
        `;

      case PlaceOrientation.LeftInlineTop:
        return css`
          top: 0;
          right: 100%;
          translate: calc(-${$margin}) 0;
          transform-origin: top right;
        `;
      case PlaceOrientation.LeftInlineBottom:
        return css`
          bottom: 0;
          right: 100%;
          translate: calc(-${$margin}) 0;
          transform-origin: bottom right;
        `;

      case PlaceOrientation.RightInlineTop:
        return css`
          top: 0;
          left: 100%;
          translate: calc(${$margin}) 0;
          transform-origin: top left;
        `;
      case PlaceOrientation.RightInlineBottom:
        return css`
          bottom: 0;
          left: 100%;
          translate: calc(${$margin}) 0;
          transform-origin: bottom left;
        `;

      case PlaceOrientation.BottomLeft:
        return css`
          top: 100%;
          left: 0;
          translate: 0 calc(${$margin});
          transform-origin: top left;
        `;
      case PlaceOrientation.Bottom:
        return css`
          top: 100%;
          left: 50%;
          translate: -50% calc(${$margin});
          transform-origin: top;
        `;
      case PlaceOrientation.BottomRight:
        return css`
          top: 100%;
          right: 0;
          translate: 0 calc(${$margin});
          transform-origin: top right;
        `;

      case PlaceOrientation.InsetTopLeft:
        return css`
          top: 0;
          left: 0;
          translate: calc(${$margin}) calc(${$margin});
          transform-origin: top left;
        `;
      case PlaceOrientation.InsetTop:
        return css`
          top: 0;
          left: 50%;
          translate: -50% calc(${$margin});
          transform-origin: top;
        `;
      case PlaceOrientation.InsetTopRight:
        return css`
          top: 0;
          right: 0;
          translate: calc(-${$margin}) calc(${$margin});
          transform-origin: top right;
        `;

      case PlaceOrientation.InsetLeft:
        return css`
          top: 50%;
          left: 0;
          translate: calc(${$margin}) -50%;
          transform-origin: left;
        `;
      case PlaceOrientation.InsetRight:
        return css`
          top: 50%;
          right: 0;
          translate: calc(${$margin}) -50%;
          transform-origin: right;
        `;

      case PlaceOrientation.InsetBottomLeft:
        return css`
          bottom: 0;
          left: 0;
          translate: calc(${$margin}) calc(-${$margin});
          transform-origin: bottom left;
        `;
      case PlaceOrientation.InsetBottom:
        return css`
          bottom: 0;
          left: 50%;
          translate: -50% calc(-${$margin});
          transform-origin: bottom;
        `;
      case PlaceOrientation.InsetBottomRight:
        return css`
          bottom: 0;
          right: 0;
          translate: calc(-${$margin}) calc(-${$margin});
          transform-origin: bottom right;
        `;
      default:
        return ``;
    }
  }}
`;