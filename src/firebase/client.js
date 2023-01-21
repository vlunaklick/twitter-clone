import { initializeApp } from 'firebase/app'
import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs,
  orderBy
} from 'firebase/firestore'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDRbXsOqf6DC3vvWkTCbMIzqmcvFxtN8iE',
  authDomain: 'concers-30991.firebaseapp.com',
  projectId: 'concers-30991',
  storageBucket: 'concers-30991.appspot.com',
  messagingSenderId: '22020402225',
  appId: '1:22020402225:web:d00921e038db1b10117910'
}

// TODO: Agregar límite de dominios

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getFirestore(app)

const storage = getStorage(app)

const mapUserFromFirebaseAuth = user => {
  const { displayName, email, photoURL, uid, reloadUserInfo } = user
  const { screenName } = reloadUserInfo

  return {
    userId: uid,
    userName: screenName,
    name: displayName,
    email,
    avatar: photoURL
  }
}

const mapLittFromFirebase = doc => {
  const data = doc.data()
  const { createdAt } = data

  return {
    ...data,
    id: doc.id,
    createdAt: +createdAt.toDate()
  }
}

export const loginWithGithub = () => {
  const provider = new GithubAuthProvider()
  return signInWithPopup(auth, provider)
}

export const onAuthStateChange = onChange => {
  return auth.onAuthStateChanged(user => {
    const normalizeUser = user ? mapUserFromFirebaseAuth(user) : null

    onChange(normalizeUser)
  })
}

export const addLitt = async ({ userId, userName, name, avatar, content, img }) => {
  try {
    await addDoc(collection(db, 'litts'), {
      userId,
      userName,
      name,
      avatar,
      content,
      likesCount: 0,
      sharedCount: 0,
      createdAt: Timestamp.fromDate(new Date()),
      img
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const getLitts = async () => {
  const querySnapshot = await getDocs(collection(db, 'litts'), orderBy('createdAt', 'desc'))
  return querySnapshot.docs.map(mapLittFromFirebase)
}

export const uploadImage = (file) => {
  const imgRef = ref(storage, `images/${file.name}`)
  const task = uploadBytesResumable(imgRef, file)
  return task
}

export const getImage = async (fileName) => {
  const imgRef = ref(storage, `${fileName}`)
  return await getDownloadURL(imgRef)
}

export const uploadImageAndGetURL = async (file) => {
  const task = uploadImage(file)
  return new Promise((resolve, reject) => {
    task.on('state_changed', snapshot => {
      /**
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log(`Upload is ${progress}% done`)
      */
    },
    error => {
      reject(error)
    },
    () => {
      const imgURL = getImage(`images/${file.name}`)
      resolve(imgURL)
    })
  })
}
