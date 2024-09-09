import React from 'react';
import { render } from '@testing-library/react';
import Main from '../Main';

test('renders page', () => {
  expect(render(<Main />)).not.toBeNull();
});
