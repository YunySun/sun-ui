export function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

export function indexDiff(baseArr, diffArr) {
  for(var i=0, len=baseArr.length; i<len; i++) {
    if (baseArr[i] !== diffArr[i]) {
      return i
    }
  }
}
