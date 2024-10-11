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
        dated: '2 days ago'
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
          dated: '2 days ago'
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
          dated: '2 days ago'
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
    const dated = "vor 2 Tagen";
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
    expect(getByText(dated, {exact:false})).toBeInTheDocument();
  });
});