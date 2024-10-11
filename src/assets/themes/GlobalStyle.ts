import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    color: ${props => props.theme.colors.text.dark};
    background-color: ${props => props.theme.colors.accent_white_0};
    background-image: linear-gradient(to bottom left, ${props => props.theme.colors.accent_white_0}, ${props => props.theme.colors.accent_white_1});

    height: 100dvh;

    font-family: ${props => props.theme.font.family.default};
  }
  #root {
    height: inherit;
  }
`;

export default GlobalStyle;