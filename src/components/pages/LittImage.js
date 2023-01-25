/* eslint-disable @next/next/no-img-element */

export default function LittImage({ src, alt }) {
  if (!src) return

  return (
    <picture className="mt-2 flex max-h-[334px] w-fit max-w-[334px] ">
      <div className="max-h-[334px] max-w-[334px] overflow-hidden rounded-md border border-gray-400 dark:border-gray-600">
        <img
          className="max-h-[334px] max-w-[334px] rounded object-cover "
          src={src}
          alt={alt}
        />
      </div>
    </picture>
  )
}
