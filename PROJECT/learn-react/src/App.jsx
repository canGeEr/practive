
import * as React from "../packages/react";
// import { useState, useEffect } from "../packages/react";
// import * as React from 'react'
const { useState } = React;
import Child from './Child'

function App () {
  const [flag, reRender] = useState(false);
  console.log('当前执行了APP')
  return (
    <div>
      {/* {flag} */}
      {/* <button onClick={() => {
        reRender(!flag)
      }}>修改App</button>
      <Child /> */}
    </div>
  )
}

export default App