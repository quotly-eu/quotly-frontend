import React from "react";
import { render } from "utils/quotly-testing";
import ProfileButton from "../ProfileButton";

describe("ProfileButton", () => {
  it("renders", () => {
    expect(render(
      <ProfileButton 
        src="/"
      />
    )).not.toBeNull();
  });
  it("renders image", () => {
    const { getByRole } = render(
      <ProfileButton 
        src="/"
      />
    );
    expect(getByRole("img")).toBeInTheDocument();
  });
  it("appends alt text", () => {
    const alt = "Test";
    const { getByAltText } = render(
      <ProfileButton 
        src="/"
        alt={alt}
      />
    );
    expect(getByAltText(alt)).toBeInTheDocument();
  });
  it("triggers onClick", () => {
    const onClick = jest.fn();
    const { container } = render(
      <ProfileButton 
        src="/"
        onClick={onClick}
      />
    );
    container.firstChild?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});