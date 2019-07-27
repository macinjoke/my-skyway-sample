import React, { useEffect, useReducer, useRef, useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

type State = {
  mediaDevices: MediaDeviceInfo[]
}

const initialState: State = {
  mediaDevices: [],
}

type Action = {
  type: 'addMediaDevicesInfo'
  payload: MediaDeviceInfo[]
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'addMediaDevicesInfo':
      return { mediaDevices: action.payload }
    default:
      return state
  }
}

const App: React.FC = () => {
  const [step, setStep] = useState(1)
  const localVideoRef = useRef(null)

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(deviceInfos => {
      console.log(deviceInfos)
      dispatch({ type: 'addMediaDevicesInfo', payload: deviceInfos })
    })
  }, [])

  return (
    <div className="pure-g">
      <div className="pure-u-2-3">
        <video ref={localVideoRef} autoPlay></video>
        <video muted autoPlay></video>
      </div>

      <div className="pure-u-1-3">
        <h2>SkyWay Video Chat</h2>

        <div className="select">
          <label htmlFor="audioSource">Audio input source: </label>
          <select id="audioSource">
            {state.mediaDevices
              .filter(device => device.kind === 'audioinput')
              .map((device, i) => (
                <option key={device.deviceId}>
                  {device.label || `Microphone ${i + 1}`}
                </option>
              ))}
          </select>
        </div>

        <div className="select">
          <label htmlFor="videoSource">Video source: </label>
          <select id="videoSource">
            {state.mediaDevices
              .filter(device => device.kind === 'videoinput')
              .map((device, i) => (
                <option key={device.deviceId}>
                  {device.label || `Camera ${i + 1}`}
                </option>
              ))}
          </select>
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
