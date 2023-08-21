function map(callback) {
  const arr = this;
  const newArr = [];
  for (let i in arr) {
    newArr[i] = callback(arr[i], i, arr);
  }
  return newArr;
}

// map.call(new Array(2));

function testArrMap() {
  const arr = new Array(3);
  arr[0] = 1;
  arr[2] = 3;

  // console.log(arr.map((value) => value));
  // arr.map((value) => console.log(value));
  // map.call(arr, (value) => console.log(value));
  console.log(map.call(arr, (value) => value));
}

testArrMap();
