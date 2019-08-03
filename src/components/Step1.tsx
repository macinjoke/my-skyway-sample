import React from 'react'

type Props = {
  isGetUserMediaError: boolean
}

const Step1 = ({ isGetUserMediaError }: Props) => {
  return (
    <div>
      <p>
        Please click `allow` on the top of the screen so we can access your webcam and microphone
        for calls.
      </p>
      {isGetUserMediaError && (
        <div>
          <p>
            Failed to access the webcam and microphone. Make sure to run this demo on an http server
            and click allow when asked for permission by the browser.
          </p>
          <a href="#">Try again</a>
        </div>
      )}
    </div>
  )
}

export default Step1
