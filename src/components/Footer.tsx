import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
}

const _Footer = styled.footer`
  border: solid 1px #cccccc;
  width: 100%;
  height: 64px;
  font-family: 'Century Gothic', sans-serif;
`

const Footer: FC<Props> = ({ className }) => {
  return (
    <_Footer className={className}>
      <p>
        Author: <a href="https://twitter.com/macinjoke">macinjoke</a>
      </p>
    </_Footer>
  )
}

export default Footer
