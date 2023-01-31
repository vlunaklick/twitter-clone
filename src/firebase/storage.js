import { storage } from '@/firebase/client'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export const saveImage = file => {
  const imgRef = ref(storage, `images/${file.name}`)
  const task = uploadBytesResumable(imgRef, file)
  return task
}

export const fetchImageURL = async fileName => {
  const imgRef = ref(storage, `${fileName}`)
  return await getDownloadURL(imgRef)
}
