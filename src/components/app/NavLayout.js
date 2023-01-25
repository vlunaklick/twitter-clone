import Navbar from './Navbar'

export default function NavLayout({ children }) {
  return (
    <>
      <div className="flex h-full flex-col justify-between min-[520px]:min-h-[90vh] min-[520px]:max-w-lg min-[520px]:flex-row-reverse min-[520px]:rounded-md">
        <div className="w-full min-[520px]:min-h-max min-[520px]:border-l min-[520px]:border-gray-200 dark:min-[520px]:border-gray-800">
          {children}
        </div>
        <Navbar />
      </div>
    </>
  )
}
