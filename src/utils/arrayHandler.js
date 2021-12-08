export function removeElementInArray(arr, i) {
  const remainArr = [...arr];
  remainArr.splice(i, 1);
  return remainArr;
}
