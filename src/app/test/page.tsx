'use client'
import React from 'react'
import {toast} from 'sonner'

function Test() {
  return (

    <>
    <h1>Test</h1>
    <button onClick={() => toast('My first toast')}>Give me a toast</button>
    </>
  )
}

export default Test