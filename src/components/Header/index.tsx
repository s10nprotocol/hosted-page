import Account from './Account'
import NetworkSelector from './NetworkSelector'
import { NotificationCenter } from './NotificationCenter'

function Header() {
  return (
    <div className="w-full sticky top-0 p-4 pl-2 z-[99]">
      <header
        className={`px-4 w-full relative  bg-white bg-opacity-10 z-30 rounded-2xl border border-gray-400 border-opacity-20`}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur z-[-1] rounded-2xl" />
        <div className="w-full">
          <div className="flex items-center justify-between h-16 md:h-16">
            {/* Site navigation */}
            <nav className="flex flex-grow">
              <ul className="flex flex-grow justify-end flex-wrap items-center">
                <li className="mx-2">
                  <NetworkSelector />
                </li>
                <li className="mx-2">
                  <Account />
                </li>
                <li className="ml-2">
                  <NotificationCenter />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
