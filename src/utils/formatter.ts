export const getEllipsisText = (str: string, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`
  }
  return ''
}

export const getBillingPeriodString = (billingPeriod: number) => {
  switch (billingPeriod) {
    case 0:
      return 'DAY'
    case 1:
      return 'WEEK'
    case 2:
      return 'MONTH'
    case 3:
      return 'QUARTER'
    case 4:
      return 'YEAR'
    default:
      return 'Unknown'
  }
}

export const getDate = (date: Date | number | string) => {
  return new Date(date).toLocaleDateString()
}

export const formatTimeString = (date: Date | number | string) => {
  return new Date(date).toLocaleString()
}

interface Query {
  [k: string]: string | string[]
}

export const formatQueryToString = (q: Query) => {
  const nq: Record<string, string> = {}
  Object.keys(q).forEach((k) => {
    if (q[k] instanceof Array) {
      nq[k] = q[k][0]
    } else {
      nq[k] = q[k] as string
    }
  })
  return nq
}

export const formatQueryBooleanValue = (v: string) => {
  return v === 'true' ? true : v === 'false' ? false : undefined
}
