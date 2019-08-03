import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const StyledButton = styled.button`
  height: 40px;
  border-radius: 3px;
  background: cornflowerblue;
  border: 2px solid cornflowerblue;
  outline: none;
  font-size: 16px;
  &:hover {
    background: #6ea3ff;
  }
  &:active {
    background: #608edb;
  }
`

const Button = forwardRef<HTMLButtonElement, Props>(({ children, ...props }, ref) => {
  return (
    <StyledButton ref={ref} {...props}>
      {children}
    </StyledButton>
  )
})
Button.displayName = 'Button'

export default Button
