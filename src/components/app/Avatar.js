export default function Avatar({ name, src, alt }) {
  return (
    <div className="flex h-full max-h-max min-w-max items-center">
      <img src={src} className="h-12 w-12 rounded-full" alt={alt} />
      {name && <strong className="ml-2">{name}</strong>}
    </div>
  )
}
