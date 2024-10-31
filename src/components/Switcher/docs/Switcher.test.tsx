import React from 'react';
import { render } from 'utils/quotly-testing';
import Switcher from '../Switcher';

describe('Switcher', () => {
  it('renders', () => {
    expect(render(
      <Switcher 
        breakpoint='0'
        mobile={<></>}
        desktop={<></>}
      />
    )).not.toBeNull();
  });
  it('renders mobile', () => {
    const { getByTestId } = render(
      <Switcher 
        breakpoint='mockMobile'
        mobile={<div data-testid='mobile' />}
        desktop={<></>}
      />
    );

    expect(getByTestId('mobile')).toBeInTheDocument();
  });
  it('renders desktop', () => {
    const { getByTestId } = render(
      <Switcher 
        breakpoint='0'
        mobile={<></>}
        desktop={<div data-testid='desktop' />}
      />
    );
    expect(getByTestId('desktop')).toBeInTheDocument();
  });
});