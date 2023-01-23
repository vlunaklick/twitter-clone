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
      <picture className="relative mx-auto flex max-h-[334px] max-w-[334px] items-center justify-center rounded-md bg-slate-50 shadow-inner dark:bg-slate-800">
        <Button
          onClick={() => handleRemoveImage()}
          variant={'img_cancel'}
          disabled={isRemoveImageDisabled}
        >
          ✖
        </Button>

        <img src={imgURL} className="rounded object-contain" />
      </picture>
    </>
  )
}
