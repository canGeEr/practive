// import { createRoot } from "../packages/react-dom/client";
// import * as React from '../packages/react'
import * as React from 'react'
// import App from "./App";
import { createRoot } from 'react-dom/client'

const { useState, useEffect, useMemo, useRef, useLayoutEffect, useCallback } = React;

const appEle = document.getElementById("app");

const root = createRoot(appEle);

const appReactElement = <App time={new Date('2023-09-18 18:35:00').getTime()} />

root.render(appReactElement);

function App() {
  return 'asds'
}

// function convert(time) {
//   return Math.floor(time / 1000)
// }


// function App(props) {
//   const time = convert(props.time);

//   const [state, setState] = useState(0);

//   useEffect(() => {
//     let start = convert(new Date().getTime());
//     setState(start);

//     const timer = setInterval(() => {
//       if(start >= time) {
//         clearInterval(timer);
//       } else {
//         start++;
//         setState(start);
//       }
//     }, 1000)

//     return () => clearInterval(timer);
//   }, [time]);

//   const value = useMemo(() => {
//     // 剩余多少秒
//     let restTime = time - state;
//     const s = restTime % 60;
//     // 剩下多少分钟
//     restTime = (restTime - s) / 60;
//     const m = restTime % 60;
//     // 剩下多少小时
//     restTime = (restTime - m) / 60;
//     const h = restTime
//     return [h,m,s].join(':');
//   }, [time, state]);

//   return value;
// }

// function App() {

//   const [state, setState] = useState(0);

//   let callback = function() {
//     setState(state => state + 1);
//     console.log('当前的state', state)
//   }

//   callback = useMemorizedFun(callback);


//   useEffect(() => {
//     setInterval(() => {
//       callback();
//     }, 1000)
//   }, [])

//   // 如何转换成异步逻辑
//   return state
// }

// function useMemorizedFun(callback) {
//   const callbackRef = useRef(null);

//   useLayoutEffect(() => {
//     callbackRef.current = callback;
//   });

//   return useCallback((...args) => {
//     callbackRef.current?.(...args)
//   }, [])
// }