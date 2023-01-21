import { useState } from 'react'

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLODAING: 2,
  COMPLETE: 3
}

export default function useUploadImage () {
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [file, setFile] = useState(null)
  const [imgURL, setImgUrl] = useState(null)

  const handerDragEnter = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDragDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    setFile(file)
    uploadAndGetUrl(file)
  }

  const handleRemoveImage = () => {
    setFile(null)
    setImgUrl(null)
  }

  const handleUploadImage = (e) => {
    if (e.target.files[0]) {
      uploadAndGetUrl(e.target.files[0])
      setFile(e.target.files[0])
    }
  }

  const uploadAndGetUrl = (file) => {
    if (file.type.match(/image\//)) {
      const src = URL.createObjectURL(file)
      setImgUrl(src)
    }
  }

  const dragged = drag === DRAG_IMAGE_STATES.DRAG_OVER

  return {
    imgURL,
    file,
    dragged,
    handerDragEnter,
    handleDragLeave,
    handleDragDrop,
    handleRemoveImage,
    handleUploadImage
  }
}
