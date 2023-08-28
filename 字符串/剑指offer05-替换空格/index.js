/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
  const newArr = Array.from(s)
  //1. 先计算最终的长度
  var spaceCount = Array.from(s).reduce((count, char) => {
    return count + Number(char === ' ')
  }, 0)
  if(!spaceCount) return s
  // 创建对应长度的数组 
  const newLength = newArr.length + spaceCount * 2
  for(var i = s.length-1, j=newLength-1; i >=0 & j>=0; i--, j--) {
    if(s[i] !== ' ') {
      newArr[j] = s[i]
    } else {
      newArr[j--] = '0'
      newArr[j--] = '2'
      newArr[j] = '%'
    }
  }
  return newArr.join('')
};

const test = [
  "We are happy.",
  "I love you."
]

console.log(test.map(replaceSpace))

/**
 * 
 * 1. replaceAll | 正则
 * 2. 遍历字符串，创建新字符串
 * 3. encodeURIComponent
 * 4. 考虑某些语言特性，C++可以原地修改数组
 */