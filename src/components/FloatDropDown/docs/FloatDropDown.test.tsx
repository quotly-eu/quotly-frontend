import React, { act } from 'react';
import { render } from 'utils/quotly-testing';
import FloatDropDown from '../FloatDropDown';
import { DropDownItem } from '../FloatDropDown.type';

describe('FloatDropDown', () => {
  it('renders', () => {
    expect(render(
      <FloatDropDown 
        triggerElement={<div />}
        dropDownItems={[]}
      />
    )).not.toBeNull();
  });
  it('renders triggerElement', () => {
    const triggerElement = <div data-testid='triggerElement' />;
    const { getByTestId } = render(
      <FloatDropDown 
        triggerElement={triggerElement}
        dropDownItems={[]}
      />
    );
    expect(getByTestId('triggerElement')).toBeInTheDocument();
  });
  it('renders dropDownItems', () => {
    const dropDownItems: DropDownItem[] = [
      { label: 'Test' },
      { label: 'Test2' },
      { label: (<div data-testid='Test3' />) }
    ];
    const { getByText, getByTestId } = render(
      <FloatDropDown 
        triggerElement={<div />}
        dropDownItems={dropDownItems}
      />
    );
    expect(getByText('Test')).toBeInTheDocument();
    expect(getByText('Test2')).toBeInTheDocument();
    expect(getByTestId('Test3')).toBeInTheDocument();
  });
  it('opens on triggerElement click', () => {
    const dropDownItems: DropDownItem[] = [
      { label: 'Test' },
    ];
    const { getByTestId } = render(
      <FloatDropDown 
        triggerElement={<div data-testid='triggerElement' />}
        dropDownItems={dropDownItems}
        data-testid='float-dropdown'
      />
    );
    act(() => {
      getByTestId('triggerElement').click();
    });
    expect(getByTestId('float-dropdown')).toHaveStyle('opacity: 1;');
  });
  it('triggers onClick', () => {
    const onClick = jest.fn();
    const dropDownItems: DropDownItem[] = [
      { label: 'Test', onClick },
    ];
    const { getByText } = render(
      <FloatDropDown 
        triggerElement={<div />}
        dropDownItems={dropDownItems}
      />
    );
    act(() => {
      getByText('Test').click();
    });
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('has href', () => { 
    const dropDownItems: DropDownItem[] = [
      { label: 'Test', href: '/' },
    ];
    const { getByText } = render(
      <FloatDropDown 
        triggerElement={<div />}
        dropDownItems={dropDownItems}
      />
    );
    expect(getByText('Test').closest('a')).toHaveAttribute('href', '/');
  });
});