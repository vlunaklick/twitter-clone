import Navbar from './Navbar'

export default function NavLayout({ children }) {
  return (
    <>
      <div className="flex h-full flex-col justify-between min-[520px]:h-[90vh] min-[520px]:max-w-lg min-[520px]:flex-row-reverse min-[520px]:rounded-md">
        <div className="w-full">{children}</div>
        <Navbar />
      </div>
    </>
  )
}
