import React from "react";
import { render } from "utils/quotly-testing";
import NavbarTop from "../NavbarTop";

describe("NavbarTop", () => {
  it("renders", () => {
    expect(render(<NavbarTop />)).not.toBeNull();
  });
});