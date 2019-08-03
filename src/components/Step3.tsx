import React, { MouseEventHandler } from 'react'

type Props = {
  localPeerId: string
  remotePeerId: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Step3 = ({ localPeerId, remotePeerId, onClick }: Props) => {
  return (
    <div>
      <p>Your id: {localPeerId}</p>
      <p>Currently in call with {remotePeerId}</p>
      <p>
        <button onClick={onClick}>End call</button>
      </p>
    </div>
  )
}

export default Step3
