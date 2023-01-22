export default function Header({ children }) {
  return (
    <header className="sticky top-0 flex h-[50px] w-full items-center border-b border-slate-200 backdrop-blur dark:border-slate-700">
      {children}
    </header>
  )
}
