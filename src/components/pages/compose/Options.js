import UploadImage from '@/components/svg/UploadImage'

export default function Options({ handleUploadImage }) {
  return (
    <>
      <section className="flex h-full max-h-[50px] w-full items-center border-b border-gray-200 p-1 px-4 dark:border-gray-700">
        <input
          type={'file'}
          id={'file'}
          onChange={handleUploadImage}
          accept="image/*"
          className="hidden"
        />

        <label htmlFor={'file'} className="flex items-center justify-center">
          <UploadImage
            className="w-8 cursor-pointer fill-sky-500"
            width={28}
            height={28}
          />
        </label>
      </section>
    </>
  )
}
