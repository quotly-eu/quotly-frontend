import React from 'react';
import { render } from "utils/quotly-testing";
import Main from '../Main';

test('renders page', () => {
  expect(render(<Main />)).not.toBeNull();
});
