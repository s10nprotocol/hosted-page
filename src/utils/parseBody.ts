export const parseBody = (body: string) => {
  try {
    const obj = JSON.parse(body)
    if (typeof obj === 'object') {
      return obj
    }
  } catch {}
  return null
}
