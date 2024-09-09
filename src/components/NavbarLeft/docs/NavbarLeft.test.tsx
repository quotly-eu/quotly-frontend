import React from "react";
import { render } from "@testing-library/react";
import NavbarLeft from "../NavbarLeft";
import { ThemeProvider } from "styled-components";
import theme from "../../../assets/themes/default";

describe("NavbarLeft", () => {
  it("renders", () => {
    expect(render(<ThemeProvider theme={theme}><NavbarLeft /></ThemeProvider>)).not.toBeNull();
  });
});