/**
 * DropDownItem type for FloatDropDown
 * @example
 * import FloatDropDown from 'components/FloatDropDown/FloatDropDown';
 * import { DropDownItem } from 'types/FloatDropDown.type';
 * 
 * const dropDownItems: DropDownItem[] = [
 *  {label: 'Item 1'},
 *  {label: 'Item 2'}
 * ];
 * 
 * <FloatDropDown dropDownItems={dropDownItems} />
 */
export type DropDownItem = {
  id?: string | number;
  label: React.ReactNode;
  href?: string;
  type?: DropDownItemType;
  active?: boolean;
  onClick?: (event?: React.MouseEvent) => void;
};

/**
 * DropDownItemType for DropDownItem
 * @example
 * import { DropDownItemTypes } from 'types/FloatDropDown.type';
 * 
 * const dropDownItems: DropDownItem[] = [
 * {label: 'Item 1', type: DropDownItemTypes.A},
 * {label: 'Item 2', type: DropDownItemTypes.LINK}
 * ];
 */
export enum DropDownItemType {
  A = 'a',
  LINK = 'link'
}

