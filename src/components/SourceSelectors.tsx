import React, { ChangeEventHandler, FC } from 'react'
import Select from './atoms/Select'

type Props = {
  mediaDevices: MediaDeviceInfo[]
  onChangeAudio: ChangeEventHandler<HTMLSelectElement>
  onChangeVideo: ChangeEventHandler<HTMLSelectElement>
  className?: string
}

const SourceSelectors: FC<Props> = ({ mediaDevices, onChangeAudio, onChangeVideo, className }) => {
  return (
    <div className={className}>
      <div>
        <label htmlFor="audioSource">Audio input source: </label>
        <Select id="audioSource" onChange={onChangeAudio}>
          {mediaDevices
            .filter(device => device.kind === 'audioinput')
            .map((device, i) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Microphone ${i + 1}`}
              </option>
            ))}
        </Select>
      </div>
      <div>
        <label htmlFor="videoSource">Video source: </label>
        <Select id="videoSource" onChange={onChangeVideo}>
          {mediaDevices
            .filter(device => device.kind === 'videoinput')
            .map((device, i) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${i + 1}`}
              </option>
            ))}
        </Select>
      </div>
    </div>
  )
}

export default SourceSelectors
