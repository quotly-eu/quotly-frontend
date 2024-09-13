import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { mockMatchMedia } from '../../../mockData/window';

describe('App', () => {
  mockMatchMedia();
  
  it('Renders', () => {
    expect(render(<App />)).not.toBeNull();
  });
});
