import { FC, memo } from 'react'

interface ItemProps {
  img: string
  title: string
  desc: string
  onClick: () => void
}

export const Item: FC<ItemProps> = memo(({ img, title, desc, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex w-4/5 my-2 p-4 border border-gray-600 rounded-3xl items-center cursor-pointer hover:bg-black hover:bg-opacity-10 hover:scale-105 transition"
    >
      <div className="hero-content p-5 rounded-2xl mr-4 shrink-0">
        <img alt="" src={img} className="filter invert" width={100} height={100} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className=" text-gray-400">{desc}</p>
      </div>
    </div>
  )
})
