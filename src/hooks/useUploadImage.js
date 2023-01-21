import { useEffect, useState } from 'react'

import { uploadImage, getImage } from '@/firebase/client'

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLODAING: 2,
  COMPLETE: 3
}

export default function useUploadImage () {
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgUrl] = useState(null)

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = async () => {
        const url = await getImage(task.snapshot.metadata.fullPath)
        setImgUrl(url)
      }

      task.on('state_changed', onProgress, onError, onComplete)
    }
  }, [task])

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
    // TODO: Evitar que se suban cosas que no sean image/files (e.dataTransfer.files[0])
    setDrag(DRAG_IMAGE_STATES.NONE)

    const task = uploadImage(e.dataTransfer.files[0])

    setTask(task)
  }

  const handleRemoveImage = () => {
    setImgUrl(null)
  }

  const handleUploadImage = (e) => {
    if (e.target.files[0]) {
      const task = uploadImage(e.target.files[0])
      setTask(task)
    }
  }

  const dragged = drag === DRAG_IMAGE_STATES.DRAG_OVER

  return {
    drag,
    imgURL,
    dragged,
    handerDragEnter,
    handleDragLeave,
    handleDragDrop,
    handleRemoveImage,
    handleUploadImage
  }
}
