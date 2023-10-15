
import * as React from "react";
import { StoreProvider, store } from './store/index'
import Subscribe from './Subscribe'
import Child from './Child'

function App () {
  console.log('App刷新了')
  return (
    <StoreProvider value={store}>
      这里是App
      <Subscribe />
      <Child />
    </StoreProvider>
  )
}

export default App