export default function Header ({ children }) {
  return (
    <header className="sticky top-0 w-full border-b border-slate-200 h-[50px] backdrop-blur flex items-center">
      {children}
    </header>
  )
}
