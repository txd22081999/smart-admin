export const getErrorMessage = (err) => {
  const {
    response: {
      data: { message },
    },
  } = err
  console.log(message)
  return { message }
}
