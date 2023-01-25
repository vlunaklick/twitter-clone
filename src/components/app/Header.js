export default function Header({ children }) {
  return (
    <header className="sticky top-0 z-50 flex h-[50px] w-full items-center border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      {children}
    </header>
  )
}
