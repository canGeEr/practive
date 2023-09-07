import { useState, useRef } from 'react';

// 时间
function useCountDown(time) {
  const [value, setValue] = useState(time);
  const timerRef = useRef(null);
  const restRef = useRef(time);

  function start(force = true) {
    force && stop(time);
    // 开始定时器
    timerRef.current = setInterval(() => {
      restRef.current--;
      setValue(restRef.current);
      if(restRef.current <= 0) {
        stop();
      }
    }, 1000)
  }

  function pause() {
    timerRef.current && clearInterval(timerRef.current);
  }

  function resume() {
    start(false)
  }

  /**
   * 以什么数值结尾
   * @param {number} time 
   */
  function stop(time = 0) {
    pause();
    restRef.current = time;
    setValue(time);
  }

  return {
    value,
    start,
    stop,
    resume,
    pause
  }
}


export default useCountDown