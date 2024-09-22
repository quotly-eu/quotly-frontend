import React from "react";
import { render } from "utils/quotly-testing";
import NavbarTop from "../NavbarTop";
import { ThemeProvider } from "styled-components";
import theme from "../../../assets/themes/default";

describe("NavbarTop", () => {
  it("renders", () => {
    expect(render(<ThemeProvider theme={theme}><NavbarTop /></ThemeProvider>)).not.toBeNull();
  });
});