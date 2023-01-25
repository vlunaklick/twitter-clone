export default function Dropdown() {
  return (
    <div className="dark: absolute right-4 top-5 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg outline-none">
      <div className="px-4 py-3">
        <p className="text-sm text-gray-500">Signed in as</p>
        <p className="truncate text-sm font-medium text-gray-900">Valen</p>
      </div>
      <div className="py-1">
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          Your Profile
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          Settings
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          Sign out
        </a>
      </div>
    </div>
  )
}
