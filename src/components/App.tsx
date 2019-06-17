import React, { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

const App: React.FC = () => {
  const [step, setStep] = useState(1)

  return (
    <div className="pure-g">
      <div className="pure-u-2-3">
        <video autoPlay></video>
        <video muted autoPlay></video>
      </div>

      <div className="pure-u-1-3">
        <h2>SkyWay Video Chat</h2>

        <div className="select">
          <label htmlFor="audioSource">Audio input source: </label>
          <select id="audioSource"></select>
        </div>

        <div className="select">
          <label htmlFor="videoSource">Video source: </label>
          <select id="videoSource"></select>
        </div>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        <button onClick={() => setStep(step + 1)}>up</button>
        <button onClick={() => setStep(step - 1)}>down</button>
      </div>
    </div>
  )
}

export default App
