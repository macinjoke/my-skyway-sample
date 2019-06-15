import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

console.log('hoge')
const element = document.getElementById('app')

render(<App />, element)
