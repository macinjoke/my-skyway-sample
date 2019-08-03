import React, {
  ChangeEventHandler,
  FormEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'

type Props = {
  id: string
  onSubmit: FormEventHandler<HTMLFormElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  fieldValue: string
}

export type ImperativeObject = {
  focus: () => void
}

const Step2 = forwardRef<ImperativeObject, Props>(({ id, onSubmit, fieldValue, onChange }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (!inputRef.current) return
      inputRef.current.focus()
    },
  }))
  return (
    <div id="step2">
      <p>
        Your id: <span id="my-id">{id}</span>
      </p>
      <p>Share this id with others so they can call you.</p>
      <h3>Make a call</h3>
      <form onSubmit={onSubmit} className="pure-form">
        <input
          ref={inputRef}
          placeholder="Call user id..."
          value={fieldValue}
          onChange={onChange}
        />
        <button className="pure-button pure-button-success" type="submit">
          Call
        </button>
      </form>
    </div>
  )
})
Step2.displayName = 'Step2'

export default Step2
