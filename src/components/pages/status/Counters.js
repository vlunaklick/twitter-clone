export default function Counters({ count, text }) {
  if (!count || count < 1) return null

  return (
    <p className="text-black dark:text-white">
      {count} <span className="font-normal text-slate-500">{text}</span>
    </p>
  )
}
