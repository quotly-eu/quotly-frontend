import React from 'react';
import { render } from 'utils/quotly-testing';
import ButtonPalette from '../ButtonPalette';
import Button from 'components/Button/Button';

describe('ButtonPalette', () => {
  const buttons = [
    <Button href='#' key={0} />,
    <Button href='#' key={1} />,
  ];

  const triggerElement = <button>Toggle Menu</button>;

  it('renders ButtonPalette component', () => {
    const { getByText } = render(<ButtonPalette triggerElement={triggerElement} buttons={buttons} />);
    expect(getByText('Toggle Menu')).toBeInTheDocument();
  });

  it('renders ButtonPalette component has buttons', () => {
    const { getAllByRole } = render(<ButtonPalette triggerElement={triggerElement} buttons={buttons} />);
    expect(getAllByRole('link')).toHaveLength(2);
  });
});