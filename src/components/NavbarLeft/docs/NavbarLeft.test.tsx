import React from "react";
import { render } from "utils/quotly-testing";
import NavbarLeft from "../NavbarLeft";

describe("NavbarLeft", () => {
  it("renders", () => {
    expect(render(<NavbarLeft />)).not.toBeNull();
  });
});