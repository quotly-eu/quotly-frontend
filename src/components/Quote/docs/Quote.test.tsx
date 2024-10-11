import React from "react";
import { render } from "utils/quotly-testing";
import Quote from "../Quote";

describe("Quote", () => {
  it("renders", () => {
    expect(render(
      <Quote 
      quote={{
        id: '1',
        text: `**Test**`,
        url: '/',
        dated: new Date(2024,4,7)
      }}
      author={{
        name: 'Author',
        avatarUrl: '/',
        url: '/'
      }}
      />
    )).not.toBeNull();
  });
  it("renders text", () => {
    const text = `**Test:** "test"`;
    const { getByText } = render(
      <Quote 
        quote={{
          id: '1',
          text: text,
          url: '/',
          dated: new Date(2024,4,7)
        }}
        author={{
          name: 'Author',
          avatarUrl: '/',
          url: '/'
        }}
      />
    );
    expect(getByText(text, {exact:false})).toBeInTheDocument();
  });
  it("renders author", () => {
    const author = "Author";
    const { getByText } = render(
      <Quote 
        quote={{
          id: '1',
          text: `**Test**`,
          url: '/',
          dated: new Date(2024,4,7)
        }}
        author={{
          name: author,
          avatarUrl: '/',
          url: '/'
        }}
      />
    );
    expect(getByText(author, {exact:false})).toBeInTheDocument();
  });
  it("renders dated", () => {
    const dated = new Date(2024,4,7);
    const { getByText } = render(
      <Quote 
      quote={{
        id: '1',
        text: `**Test**`,
        url: '/',
        dated: dated
      }}
      author={{
        name: 'Author',
        avatarUrl: '/',
        url: '/'
      }}
      />
    );
    expect(getByText(dated.toLocaleDateString(undefined, {dateStyle: 'long'}), {exact:false})).toBeInTheDocument();
  });
});