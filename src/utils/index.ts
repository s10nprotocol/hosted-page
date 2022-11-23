export * from './formatter'

export const sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export const callAndRetry = async (fn: () => void, count: number = 3) => {
  if (count > 0) {
    try {
      await fn()
    } catch (e) {
      console.log(e)
      callAndRetry(fn, count - 1)
    }
  }
}
