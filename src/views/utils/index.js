export const isEmpty = (arr) => {
  return arr.some((item) => item === '' || item.length === 0)
}
