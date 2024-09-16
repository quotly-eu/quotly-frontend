import React from 'react'
import styled from 'styled-components'

export type DropDownItem = {
  label: React.ReactNode,
  href?: string
  onClick?: () => void
}

const FloatDropDownContainer = styled.div`
  position:relative;
`;

const FloatDropDownMenu = styled.div`
  position:absolute;
  background-color: ${props => props.theme.colors.transparency.white(0.9)};

  width: max-content;
  bottom:100%;

  border-radius: ${props => props.theme.spacing.xs.em};

  overflow:hidden;
  box-shadow: ${props => props.theme.shadows.default};
`;

const FloatDropDownItem = styled.a`
  display:block;
  color: ${props => props.theme.colors.text.dark};

  padding: ${props => props.theme.spacing.s.rem};

  font-size: ${props => props.theme.font.sizes.ss};

  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.transparency.black(0.1)};
  }
`;

const FloatDropDown = ({
  triggerElement,
  dropDownItems
}:{
  triggerElement: React.ReactNode
  dropDownItems: DropDownItem[]
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleTriggerElementClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <FloatDropDownContainer>
      <div onClick={handleTriggerElementClick}>
        {triggerElement}
      </div>
      {isOpen && <FloatDropDownMenu>
        {dropDownItems.map(dropDownItem => (
          <FloatDropDownItem href={dropDownItem.href} onClick={dropDownItem.onClick}>
            {dropDownItem.label}
          </FloatDropDownItem>
        ))}
      </FloatDropDownMenu>}
    </FloatDropDownContainer>
  )
}

export default FloatDropDown