/* eslint-disable jsx-a11y/alt-text */
import Button from '@/components/app/Button'

export default function ImagePreview({
  imgURL,
  handleRemoveImage,
  isRemoveImageDisabled,
}) {
  if (!imgURL) return null

  return (
    <>
      <picture className="relative flex max-h-[334px] max-w-[334px] items-center justify-center overflow-hidden rounded-md border-2 border-slate-200 shadow-inner dark:border-slate-600">
        <Button
          onClick={() => handleRemoveImage()}
          variant={'img_cancel'}
          disabled={isRemoveImageDisabled}
          maxWidth
        >
          ✖
        </Button>

        <img src={imgURL} className="rounded object-cover" />
      </picture>
    </>
  )
}
