import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    box-sizing: border-box;
  }

  html, body {
    ${({ theme }) => `
      color: ${theme.colors.text.dark};
      background-color: ${theme.colors.accent_white_0};
      background-image: linear-gradient(to bottom left, ${theme.colors.accent_white_0}, ${theme.colors.accent_white_1});

      font-family: ${theme.font.family.default};
      scroll-padding: ${theme.spacing.s.rem};
    `}

    min-height: 100dvh;
    scroll-behavior: smooth;
    overscroll-behavior: none;
  }
  #root {
    min-height: inherit;
    overscroll-behavior: none;
  }
`;

export default GlobalStyle;