import React, { useState } from 'react';

/**
 * Switcher Component to switch between mobile and desktop components based on a breakpoint
 * @example
 * import Switcher from '../Switcher/Switcher';
 * 
 * <Switcher breakpoint='40rem' mobile={<MobileComponent />} desktop={<DesktopComponent />} />
 */
const Switcher = ({breakpoint, mobile, desktop}:{breakpoint:string, mobile: React.ReactNode, desktop: React.ReactNode}) => {
  const [screenIsMobile, setScreenIsMobile] = useState(window.matchMedia(`(max-width: ${breakpoint})`).matches);
  window.addEventListener('resize', () => {
    setScreenIsMobile(window.matchMedia(`(max-width: ${breakpoint})`).matches);
  });
  
  return (
    <>
      {!screenIsMobile && desktop}
      {screenIsMobile && mobile}
    </>
  );
};

export default Switcher;