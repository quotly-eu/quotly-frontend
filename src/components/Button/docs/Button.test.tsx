import React from 'react';
import { render } from 'utils/quotly-testing';
import Button from '../Button';

describe('Button', () => {
  it('renders', () => {
    expect(render(
      <Button 
        href='/'
      >
        Button
      </Button>
    )).not.toBeNull();
  });
  it('renders text', () => {
    const text = 'Button';
    const { getByText } = render(
      <Button 
        href='/'
      >
        {text}
      </Button>
    );
    expect(getByText(text)).toBeInTheDocument();
  });
  it('has href', () => {
    const href = '/';
    const { getByRole } = render(
      <Button 
        as='a'
        href={href}
      >
        Button
      </Button>
    );
    expect(getByRole('link')).toHaveAttribute('href', href);
  });
  it('triggers onClick', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button 
        onClick={onClick}
      >
        Button
      </Button>
    );
    getByText('Button').click();
    expect(onClick).toHaveBeenCalled();
  });
});