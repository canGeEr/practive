const o = (function (){
  const obj = {
      a:1,
      b:2
  }

  Object.freeze(obj)

  return {
      get(k){
          return obj[k]
      }
  }
})();


Object.defineProperty(Object.prototype, 'temp', {
  get() {
    return this
  }
})


console.log(o.get('temp'))
