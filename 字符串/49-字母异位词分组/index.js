/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
  const map = {};
  const length = strs.length;
  for (let i = 0; i < length; i++) {
    const target = Array.from(strs[i]).sort();
    const key = target.join("");
    if (!map[key]) map[key] = [];
    map[key].push(strs[i]);
  }

  return Object.values(map);
}

/**
 *
 * @param {string []} strs
 */
function groupAnagrams(strs) {
  const map = {};
  const length = strs.length;
  for (let i = 0; i < length; i++) {
    const arr = new Array(26).fill(0);
    const str = strs[i];
    for (let j = 0; j < str.length; j++) {
      const charIndex = str[j].charCodeAt(0) - 97;
      arr[charIndex]++;
    }
    const key = arr.join("*");
    if (!map[key]) map[key] = [];
    map[key].push(str);
  }

  return Object.values(map);
}

const test = [["eat", "tea", "tan", "ate", "nat", "bat"], [""], ["a"]];

console.log(test.map(groupAnagrams));

/**
 * 排序法
 * 哈希法
 */
