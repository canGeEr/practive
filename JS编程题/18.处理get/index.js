function splitStr(str) {
  const length = str.length;
  let begin = 0;
  let stack = [];
  const paths = [];
  while(begin < length) {
    const char = str[begin];
    if(char === '.' || char === ']' || char ===  '[') {
      if(stack.length) {
        paths.push(stack.join(''));
        stack = [];
      }
      begin++;
      continue;
    }
    stack.push(char);
    begin++;
  }
  if(stack.length) {
    paths.push(stack.join(''))
  }
  return paths
}

const test = [
  'bdsads[1dsadsa].b1',
  'cdsa[0][0].c1',
  'cdsa[0][0dsads]',
  'cdsa[1][0dsa].c1'
]

console.log(test.map(splitStr))