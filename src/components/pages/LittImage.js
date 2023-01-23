export default function LittImage({ src, alt }) {
  if (!src) return null

  return (
    <picture className="mt-2 flex max-h-[334px] max-w-[334px] items-center justify-center rounded-md bg-slate-50 shadow-inner dark:bg-slate-800">
      <img className="rounded-md object-cover" src={img} alt={alt} />
    </picture>
  )
}
