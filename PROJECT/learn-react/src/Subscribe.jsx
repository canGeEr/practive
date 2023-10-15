
import React from 'react'
import { useSelector } from './store/index'

const Subscribe = () => {
  const [data, dispatch] = useSelector(data => data.value);

  console.log(data, 'Subscribe 刷新了')

  return (
    <div>
      这里是Subscribe 
      <h3>这里是data {data}</h3>
      <ul>
        <li><button onClick={() => {
          dispatch({action: 'add', payload: 4})
        }}>Add</button></li>
        <li onClick={() => {
          dispatch({action: 'sub', payload: 2})
        }}><button>Sub</button></li>
        <li><button>Multi</button></li>
      </ul>
    </div>
  )
}

export default Subscribe