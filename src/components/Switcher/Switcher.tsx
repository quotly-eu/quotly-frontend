import React, { useState } from 'react';
import { SwitcherType } from './Switcher.type';
import { useTheme } from 'styled-components';

/**
 * Switcher Component to switch between mobile and desktop components based on a breakpoint
 * @example
 * import Switcher from '../Switcher/Switcher';
 * 
 * <Switcher breakpoint='40rem' mobile={<MobileComponent />} desktop={<DesktopComponent />} />
 */
const Switcher = ({breakpoint, mobile=<></>, desktop=<></>}:SwitcherType) => {
  const theme = useTheme();
  const query = `(max-width: ${breakpoint || theme.breakpoints.md})`;
  const [screenIsMobile, setScreenIsMobile] = useState(window.matchMedia(query).matches);
  window.addEventListener('resize', () => {
    setScreenIsMobile(window.matchMedia(query).matches);
  });
  
  return (
    <>
      {!screenIsMobile && desktop}
      {screenIsMobile && mobile}
    </>
  );
};

export default Switcher;