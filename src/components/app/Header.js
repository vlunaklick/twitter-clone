export default function Header({ children }) {
  return (
    <header className="sticky top-0 z-50 flex h-[50px] w-full items-center border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      {children}
    </header>
  )
}
