import React, { useState } from 'react'


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
  )
}

export default Switcher