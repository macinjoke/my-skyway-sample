import React, {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import { useEvent, usePrevious } from 'react-use'
import Step1 from './Step1'
import Step2, { ImperativeObject } from './Step2'
import Step3 from './Step3'
import Peer, { MediaConnection } from 'skyway-js'
import { CONFIG } from 'src/constants'

type State = {
  mediaDevices: MediaDeviceInfo[]
  isReady: boolean
  inputPeerId: string
  remotePeerId?: string
  selectedAudioId?: string
  selectedVideoId?: string
}

const initialState: State = {
  mediaDevices: [],
  isReady: false,
  inputPeerId: '',
}

type Action =
  | {
      type: 'addMediaDevicesInfo'
      payload: MediaDeviceInfo[]
    }
  | {
      type: 'changeAudio'
      payload: string
    }
  | {
      type: 'changeVideo'
      payload: string
    }
  | {
      type: 'setIsReady'
      payload: boolean
    }
  | {
      type: 'setInputPeerId'
      payload: string
    }
  | {
      type: 'setRemotePeerId'
      payload: string
    }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'addMediaDevicesInfo':
      return {
        ...state,
        mediaDevices: action.payload,
        selectedAudioId: '',
        selectedVideoId: action.payload.filter(device => device.kind === 'videoinput')[0].deviceId,
      }
    case 'changeAudio':
      return {
        ...state,
        selectedAudioId: action.payload,
      }
    case 'changeVideo':
      return {
        ...state,
        selectedVideoId: action.payload,
      }
    case 'setIsReady':
      return {
        ...state,
        isReady: action.payload,
      }
    case 'setInputPeerId':
      return {
        ...state,
        inputPeerId: action.payload,
      }
    case 'setRemotePeerId':
      return {
        ...state,
        remotePeerId: action.payload,
      }
    default:
      return state
  }
}

const usePeer = (...args: ConstructorParameters<typeof Peer>) => {
  const peerRef = useRef<Peer>()
  if (!peerRef.current) {
    peerRef.current = new Peer(...args)
    peerRef.current.off = peerRef.current.removeListener // なぜかoffがundefined なので必要
  }
  return peerRef.current
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const previousIsReady = usePrevious(state.isReady)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const localStreamRef = useRef<MediaStream>()
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const connectionRef = useRef<MediaConnection>()
  const step2Ref = useRef<ImperativeObject>(null)
  const peer = usePeer({
    key: CONFIG.skyway.apiKey,
    debug: 3,
  })

  const startVideoCommunication = () => {
    if (!connectionRef.current) return
    connectionRef.current.on('stream', stream => {
      if (!remoteVideoRef.current) return
      remoteVideoRef.current.srcObject = stream
    })
    connectionRef.current.on('close', () => {
      console.log('close')
      dispatch({ type: 'setRemotePeerId', payload: '' })
    })
    dispatch({ type: 'setRemotePeerId', payload: connectionRef.current.remoteId })
  }

  useEvent(
    'open',
    () => {
      console.log('open')
    },
    peer,
  )

  useEvent(
    'call',
    (connection: MediaConnection) => {
      connectionRef.current = connection
      if (!localStreamRef.current) return
      connection.answer(localStreamRef.current)
      startVideoCommunication()
    },
    peer,
  )

  useEvent(
    'error',
    (error: Error) => {
      console.error(error.message)
    },
    peer,
  )

  const onChangeAudio: ChangeEventHandler<HTMLSelectElement> = e => {
    dispatch({ type: 'changeAudio', payload: e.currentTarget.value })
  }

  const onChangeVideo: ChangeEventHandler<HTMLSelectElement> = e => {
    dispatch({ type: 'changeVideo', payload: e.currentTarget.value })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    connectionRef.current = peer.call(state.inputPeerId, localStreamRef.current)
    // if (existingCall) {
    //   existingCall.close()
    // }
    // Wait for stream on the call, then set peer video display
    if (!connectionRef.current) {
      throw new Error('call error')
    }
    startVideoCommunication()
    // UI stuff
    // existingCall = call
    // $('#their-id').text(call.remoteId)
    // call.on('close', step2)
    // $('#step1, #step2').hide()
    // $('#step3').show()
  }

  const onClickEndCall: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: 'setRemotePeerId', payload: '' })
    if (!connectionRef.current) return
    connectionRef.current.close()
  }

  const onChangeCallIdField: ChangeEventHandler<HTMLInputElement> = e => {
    dispatch({ type: 'setInputPeerId', payload: e.currentTarget.value })
  }

  const setStream = useCallback(async () => {
    if (!localVideoRef.current) return
    const constraints = {
      audio: state.selectedAudioId ? { deviceId: { exact: state.selectedAudioId } } : false,
      video: { deviceId: { exact: state.selectedVideoId } },
    }
    try {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia(constraints)
      localVideoRef.current.srcObject = localStreamRef.current
      dispatch({ type: 'setIsReady', payload: true })
    } catch (e) {
      console.error(e)
      // TODO エラー用のDOMを表示させるために dispatchをしたい
    }

    // if (existingCall) {
    //   existingCall.replaceStream(stream)
    //   return
    // }
    //
    // step2()
    // .catch(err => {
    //   $('#step1-error').show()
    //   console.error(err)
    // })
  }, [state.selectedAudioId, state.selectedVideoId])

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(deviceInfos => {
      dispatch({ type: 'addMediaDevicesInfo', payload: deviceInfos })
    })
  }, [])

  useEffect(() => {
    setStream()
  }, [setStream])

  useEffect(() => {
    if (!step2Ref.current) return
    if (!previousIsReady && state.isReady) {
      step2Ref.current.focus()
    }
  }, [state.isReady]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="pure-g">
      <div className="pure-u-2-3">
        <video ref={remoteVideoRef} autoPlay></video>
        <video ref={localVideoRef} muted autoPlay></video>
      </div>

      <div className="pure-u-1-3">
        <h2>SkyWay Video Chat</h2>

        <div className="select">
          <label htmlFor="audioSource">Audio input source: </label>
          <select id="audioSource" onChange={onChangeAudio}>
            {state.mediaDevices
              .filter(device => device.kind === 'audioinput')
              .map((device, i) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Microphone ${i + 1}`}
                </option>
              ))}
            <option value={''}>Unused</option>
          </select>
        </div>

        <div className="select">
          <label htmlFor="videoSource">Video source: </label>
          <select id="videoSource" onChange={onChangeVideo}>
            {state.mediaDevices
              .filter(device => device.kind === 'videoinput')
              .map((device, i) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${i + 1}`}
                </option>
              ))}
          </select>
        </div>
        {!state.isReady && <Step1 />}
        {state.isReady && !state.remotePeerId && (
          <Step2
            ref={step2Ref}
            id={peer.id}
            onSubmit={onSubmit}
            fieldValue={state.inputPeerId}
            onChange={onChangeCallIdField}
          />
        )}
        {state.remotePeerId && (
          <Step3 localPeerId={peer.id} remotePeerId={state.remotePeerId} onClick={onClickEndCall} />
        )}
      </div>
    </div>
  )
}

export default App
