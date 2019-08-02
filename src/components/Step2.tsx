import React, { FC } from 'react'

type Props = {
  id: string
}

const Step2: FC<Props> = ({ id }) => {
  return (
    <div id="step2">
      <p>
        Your id: <span id="my-id">{id}</span>
      </p>
      <p>Share this id with others so they can call you.</p>
      <h3>Make a call</h3>
      <form id="make-call" className="pure-form">
        <input type="text" placeholder="Call user id..." id="callto-id" />
        <button className="pure-button pure-button-success" type="submit">
          Call
        </button>
      </form>
    </div>
  )
}

export default Step2
