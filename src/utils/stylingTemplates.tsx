import { css } from 'styled-components';

export const Style_Link = css`
  ${({theme}) => `
    color: ${theme.colors.text.gray};
    transition: color ${theme.transition.times.m};
    &[href] {
      cursor: pointer;
      &:hover {
        color: ${theme.colors.primary};
      }
    }
  `}
  text-decoration: none;
`;