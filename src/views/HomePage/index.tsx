import { useRouter } from 'next/router'
import React, { FC, memo, useCallback, useState } from 'react'

export const HomePage: FC = memo(() => {
  const router = useRouter()
  const [value, setValue] = useState<number | undefined>()
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value
    console.log(newVal, Number(newVal) > 0)
    if (newVal === undefined || newVal === '') {
      setValue(undefined)
    } else if (Number(newVal) > 0) {
      setValue(Math.floor(Number(newVal)))
    } else {
      setValue(0)
    }
  }, [])

  const handleClick = useCallback(() => {
    if (value) {
      router.push(`/${value}`)
    }
  }, [router, value])
  return (
    <div className="h-screen w-full pl-2 pr-4 hero-content flex-col">
      <h1 className="text-4xl font-bold mb-10">Merchant Explorer</h1>
      <input
        value={value}
        onChange={handleChange}
        type="number"
        placeholder="Please enter a merchant id"
        className="input w-96"
      />
      <button className="btn btn-primary w-96" onClick={handleClick}>
        Go
      </button>
    </div>
  )
})
