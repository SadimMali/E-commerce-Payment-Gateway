import { UserMenu } from "./UserMenu"

const TopBar = () => {
  return (
    <nav className='w-full flex justify-between'>
        <div></div>
        <div>
          <UserMenu />
        </div>
    </nav>
  )
}

export default TopBar