import React from 'react';
import { render } from 'utils/quotly-testing';
import Button from '../Button';

describe('Button', () => {
  it('renders', () => {
    expect(render(
      <Button 
        children='Button'
        href='/'
      />
    )).not.toBeNull();
  });
  it('renders text', () => {
    const text = 'Button';
    const { getByText } = render(
      <Button 
        children={text}
        href='/'
      />
    );
    expect(getByText(text)).toBeInTheDocument();
  });
  it('has href', () => {
    const href = '/';
    const { getByRole } = render(
      <Button 
        children='Button'
        href={href}
      />
    );
    expect(getByRole('link')).toHaveAttribute('href', href);
  });
  it('triggers onClick', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button 
        children='Button'
        onClick={onClick}
      />
    );
    getByText('Button').click();
    expect(onClick).toHaveBeenCalled();
  });
});