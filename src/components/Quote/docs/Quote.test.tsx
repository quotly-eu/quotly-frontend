import React from 'react';
import { render } from 'utils/quotly-testing';
import Quote from '../Quote';

describe('Quote', () => {
  it('renders', () => {
    expect(render(
      <Quote 
        quote='**Test**'
        quoteId='1'
        createdAt={new Date(2024,4,7).toISOString()}
        user={{
          userId: 1,
          discordId: '1',
          avatarUrl: 'abc',
          displayName: 'Author',
          createdAt: new Date(2024,4,7).toISOString()
        }}
      />
    )).not.toBeNull();
  });
  it('renders text', () => {
    const text = `**Test:** 'test'`;
    const { getByText } = render(
      <Quote 
        quote={text}
        quoteId='1'
        createdAt={new Date(2024,4,7).toISOString()}
        user={{
          userId: 1,
          discordId: '1',
          avatarUrl: 'abc',
          displayName: 'Author',
          createdAt: new Date(2024,4,7).toISOString()
        }}
      />
    );
    expect(getByText(text, {exact:false})).toBeInTheDocument();
  });
  it('renders author', () => {
    const author = 'Author';
    const { getByText } = render(
      <Quote 
        quote='**Test**'
        quoteId='1'
        createdAt={new Date(2024,4,7).toISOString()}
        user={{
          userId: 1,
          discordId: '1',
          avatarUrl: 'abc',
          displayName: author,
          createdAt: new Date(2024,4,7).toISOString()
        }}
      />
    );
    expect(getByText(author, {exact:false})).toBeInTheDocument();
  });
  it('renders dated', () => {
    const dated = new Date(2024,4,7).toISOString();
    const { getByText } = render(
      <Quote 
      quote='**Test**'
        quoteId='1'
        createdAt={dated}
        user={{
          userId: 1,
          discordId: '1',
          avatarUrl: 'abc',
          displayName: 'Author',
          createdAt: new Date(2024,4,7).toISOString()
        }}
      />
    );
    expect(getByText(new Date(dated).toLocaleDateString(undefined, {dateStyle: 'long'}), {exact:false})).toBeInTheDocument();
  });
});