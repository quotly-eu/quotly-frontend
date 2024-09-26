import React from "react";
import { render } from "utils/quotly-testing";
import Quote from "../Quote";

describe("Quote", () => {
  it("renders", () => {
    expect(render(
      <Quote 
        text={`**Test:** "test"`}
        authorName="Author"
        authorUrl="/"
        authorAvatarUrl='/'
        dated="vor 2 Tagen"
      />
    )).not.toBeNull();
  });
  it("renders text", () => {
    const text = `**Test:** "test"`;
    const { getByText } = render(
      <Quote 
        text={text}
        authorName="Author"
        authorUrl="/"
        authorAvatarUrl='/'
        dated="vor 2 Tagen"
      />
    );
    expect(getByText(text, {exact:false})).toBeInTheDocument();
  });
  it("renders author", () => {
    const author = "Author";
    const { getByText } = render(
      <Quote 
        text={`**Test:** "test"`}
        authorName={author}
        authorUrl="/"
        authorAvatarUrl='/'
        dated="vor 2 Tagen"
      />
    );
    expect(getByText(author, {exact:false})).toBeInTheDocument();
  });
  it("renders dated", () => {
    const dated = "vor 2 Tagen";
    const { getByText } = render(
      <Quote 
        text={`**Test:** "test"`}
        authorName="Author"
        authorUrl="/"
        authorAvatarUrl='/'
        dated={dated}
      />
    );
    expect(getByText(dated, {exact:false})).toBeInTheDocument();
  });
});