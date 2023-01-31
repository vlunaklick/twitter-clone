import { logout } from '@/firebase'
import { useUser } from '@/context/userContext'
import { useDropdown } from '@/hooks/useDropdown'
import { useRouterNavigation } from '@/hooks/useRouterNavigation'

import Button from '@/components/app/Button'
import ThreeDots from '@/components/svg/ThreeDots'

export default function Dropdown() {
  const { user } = useUser()

  const { handleHome } = useRouterNavigation()

  const { isOpen, toggle, dropdownRef } = useDropdown()

  const handleLogout = async () => {
    logout()
    handleHome()
  }

  return (
    <div
      ref={dropdownRef}
      className={'relative ml-auto mr-3 flex items-center justify-center'}
    >
      <Button onClick={toggle} variant="header_icon">
        <ThreeDots
          className={
            'w-8 fill-gray-500 stroke-gray-500 dark:fill-gray-400 dark:stroke-gray-400'
          }
        />
      </Button>

      {isOpen && (
        <div className="absolute right-4 top-5 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg outline-none dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900">
          <div className="px-4 py-3">
            <p className="text-sm text-gray-500">Conectado como</p>
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {user?.userName}
            </p>
          </div>
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
