/* eslint-disable @next/next/no-img-element */
import { useOnLoad } from '@/hooks/useOnLoad'

export default function Avatar({ name, src, alt }) {
  const { loaded, handleLoad } = useOnLoad()

  return (
    <div className="flex h-full max-h-max min-w-max items-center">
      <div className="h-12 w-12 overflow-hidden rounded-full border border-slate-400 dark:border-slate-600">
        {!loaded && (
          <div className="h-full w-full animate-pulse bg-slate-200 dark:bg-slate-700" />
        )}
        <img
          className="h-full w-full rounded object-cover"
          src={src}
          alt={alt}
          onLoad={handleLoad}
        />
      </div>
      {name && <strong className="ml-2">{name}</strong>}
    </div>
  )
}
