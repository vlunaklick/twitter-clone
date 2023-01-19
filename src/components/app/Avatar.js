
export default function Avatar ({ name, src, alt }) {
  return (
    <div className="flex items-center min-w-max max-h-max h-full">
      <img src={src} className="w-12 h-12 rounded-full" alt={alt} />
      {name && <strong className="ml-2">{name}</strong>}
    </div>
  )
}
