import React from 'react';
import { render } from "utils/quotly-testing";
import Main from '../Main';

describe('Main', () => {
  it('renders page', () => {
    expect(render(<Main />)).not.toBeNull();
  });
});
