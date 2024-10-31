import React from 'react';
import { render } from 'utils/quotly-testing';
import Input from '../Input';

describe('NavbarLeft', () => {
  it('renders', () => {
    expect(render(
      <Input />
    )).not.toBeNull();
  });
  it('renders input', () => {
    const { getByRole } = render(
      <Input />
    );
    expect(getByRole('textbox')).toBeInTheDocument();
  });
  it('renders label', () => {
    const { getByTestId } = render(
      <Input 
        icon='house'
        testing={true}
      />
    );
    const label = getByTestId('label').tagName;
    expect(label).toBe('LABEL');
  });
  it('renders placeholder', () => {
    const placeholder = 'Test';
    const { getByPlaceholderText } = render(
      <Input 
        placeholder={placeholder}
      />
    );
    expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
  });
});