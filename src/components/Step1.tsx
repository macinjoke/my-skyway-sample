import React, { MouseEventHandler } from 'react'

type Props = {
  isGetUserMediaError: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Step1 = ({ isGetUserMediaError, onClick }: Props) => {
  return (
    <div>
      <p>
        Please click `allow` on the top of the screen so we can access your webcam and microphone
        for calls.
      </p>
      {isGetUserMediaError && (
        <>
          <p>
            Failed to access the webcam and microphone. Make sure to run this demo on an http server
            and click allow when asked for permission by the browser.
          </p>
          <button onClick={onClick}>Retry</button>
        </>
      )}
    </div>
  )
}

export default Step1
