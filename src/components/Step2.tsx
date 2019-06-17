import React from 'react'

const Step2 = () => {
  return (
    <div id="step2">
      <p>
        Your id: <span id="my-id">...</span>
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
