export default function Button ({ children, onClick }) {
  return (
    <button
      className="p-2 w-full border border-slate-200 rounded text-slate-500 font-medium text-sm hover:bg-slate-100 transition-colors"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
