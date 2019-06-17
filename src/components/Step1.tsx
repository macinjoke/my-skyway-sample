import React from 'react'

const Step1 = () => {
  return (
    <div id="step1">
      <p>
        Please click `allow` on the top of the screen so we can access your
        webcam and microphone for calls.
      </p>
      <div id="step1-error">
        <p>
          Failed to access the webcam and microphone. Make sure to run this demo
          on an http server and click allow when asked for permission by the
          browser.
        </p>
        <a href="#" className="pure-button pure-button-error" id="step1-retry">
          Try again
        </a>
      </div>
    </div>
  )
}

export default Step1
