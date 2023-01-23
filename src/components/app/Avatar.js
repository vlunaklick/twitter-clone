export default function Avatar({ name, src, alt }) {
  return (
    <div className="flex h-full max-h-max min-w-max items-center">
      <img
        src={src}
        className="aspect-square h-12 w-12 rounded-full bg-slate-900 object-cover dark:bg-white"
        alt={alt}
      />
      {name && <strong className="ml-2">{name}</strong>}
    </div>
  )
}
