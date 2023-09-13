// import { useState, useRef } from 'react';

import * as React from '../packages/react'
const { useState, useRef } = React;
import useCountDown from './hooks/useCountDown'

function Child() {
  const { value, start, stop, pause, resume } = useCountDown(10);
  return (
    <div>
      <div>当前计数器: {value}</div>
      <div><button onClick={start}>START</button> <button onClick={() => stop()}>STOP</button></div>
      <div><button onClick={pause}>PAUSE</button> <button onClick={resume}>RESUME</button></div>
    </div>
  )
}



export default Child