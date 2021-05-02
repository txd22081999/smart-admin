export const getErrorMessage = (err) => {
  const {
    response: {
      data: { message },
    },
  } = err
  return { message }
}
