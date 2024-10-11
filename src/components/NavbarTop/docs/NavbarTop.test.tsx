import React from "react";
import { render } from "utils/quotly-testing";
import NavbarTop from "../NavbarTop";

describe("NavbarTop", () => {
  it("renders", () => {
    expect(render(<NavbarTop />)).not.toBeNull();
  });
  it("renders search input", () => {
    const { getByRole } = render(<NavbarTop />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });
});