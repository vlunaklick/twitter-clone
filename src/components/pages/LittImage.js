export default function LittImage({ src, alt }) {
  if (!src) return

  return (
    <picture className="mt-2 flex max-h-[334px] w-fit max-w-[334px] overflow-hidden rounded-md border border-slate-400 shadow-inner dark:border-slate-600">
      <img
        className="max-h-[334px] w-fit max-w-[334px] rounded object-contain "
        src={src}
        alt={alt}
      />
    </picture>
  )
}
