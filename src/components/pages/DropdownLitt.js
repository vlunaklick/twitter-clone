import { deleteLittById } from '@/firebase'
import { useRouterNavigation } from '@/hooks/useRouterNavigation'
import { useDropdown } from '@/hooks/useDropdown'

import ThreeDots from '../svg/ThreeDots'
import Button from '../app/Button'

export default function DropdownLitt({ littId }) {
  const { refreshData } = useRouterNavigation()

  const { isOpen, toggle, dropdownRef } = useDropdown()

  const deleteLitt = async () => {
    await deleteLittById(littId)
    refreshData()
  }

  return (
    <div
      ref={dropdownRef}
      className={'relative ml-auto flex items-center justify-center'}
    >
      <Button onClick={toggle} variant="header_icon">
        <ThreeDots
          className={
            'w-5 fill-gray-500 stroke-gray-500 dark:fill-gray-400 dark:stroke-gray-400'
          }
        />
      </Button>

      {isOpen && (
        <div className="absolute right-2 top-2 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg outline-none dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-900">
          <div className="py-1">
            <button
              onClick={deleteLitt}
              className="block w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Eliminar twitter
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
