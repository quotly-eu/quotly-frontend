/**
 * SwitcherType to define the props of the Switcher component
 * @example
 * import Switcher from '../Switcher/Switcher';
 * 
 * <Switcher breakpoint='40rem' mobile={<MobileComponent />} desktop={<DesktopComponent />} />
 */
export type SwitcherType = {
  breakpoint: string, 
  desktop: React.ReactNode
  mobile: React.ReactNode, 
};