
export default function Avatar ({ name, src, alt, withText }) {
  return (
    <div className="flex gap-1 items-center">
      <img src={src} className="w-12 rounded-full" alt={alt} />
      {withText && <strong>{name || alt}</strong>}
    </div>
  )
}
