import { initializeApp } from 'firebase/app'

import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth'

import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs,
  orderBy,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore'

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

import {
  mapUserFromFirebaseAuth,
  mapUserFromFirebase,
  DEFAULT_INFO,
} from './utils'

const firebaseConfig = {
  apiKey: 'AIzaSyDRbXsOqf6DC3vvWkTCbMIzqmcvFxtN8iE',
  authDomain: 'concers-30991.firebaseapp.com',
  projectId: 'concers-30991',
  storageBucket: 'concers-30991.appspot.com',
  messagingSenderId: '22020402225',
  appId: '1:22020402225:web:d00921e038db1b10117910',
}

// TODO: Agregar límite de dominios

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getFirestore(app)

const storage = getStorage(app)

/* AUTH */

export const loginWithGithub = async () => {
  const provider = new GithubAuthProvider()
  signInWithPopup(auth, provider).then(async data => {
    const { user } = data

    const userInDb = await fetchUserByField('userId', user.uid)

    if (userInDb === null) {
      await saveUser(mapUserFromFirebaseAuth(user))
    }
  })
}

export const onAuthStateChange = onChange => {
  return auth.onAuthStateChanged(async user => {
    const userFirebase = user
      ? await fetchUserByField('userId', user.uid)
      : null

    onChange(userFirebase)
  })
}

/* SUBSCRIPTIONS */

export const listenLitts = callback => {
  return onSnapshot(
    collection(db, 'litts'),
    orderBy('createdAt', 'desc'),
    snapshot => {
      const litts = snapshot.docs.map(mapUserFromFirebase)
      const orderedLitts = litts.sort((a, b) => b.createdAt - a.createdAt)
      callback(orderedLitts)
    }
  )
}

/* SAVE */

export const saveLitt = async ({
  userId,
  userName,
  name,
  avatar,
  content,
  img,
}) => {
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
      img,
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const saveImage = file => {
  const imgRef = ref(storage, `images/${file.name}`)
  const task = uploadBytesResumable(imgRef, file)
  return task
}

export const saveImageAndGetURL = async file => {
  const task = saveImage(file)
  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      snapshot => {},
      error => {
        reject(error)
      },
      () => {
        const imgURL = fetchImageURL(`images/${file.name}`)
        resolve(imgURL)
      }
    )
  })
}

export const saveUser = async user => {
  const { userId, userName, name, email, avatar } = user
  const colecRef = collection(db, 'users')

  await addDoc(colecRef, {
    userId,
    userName,
    name,
    email,
    avatar,
    followers: [],
    following: [],
    header: DEFAULT_INFO.header,
    biography: '',
    createdAt: Timestamp.fromDate(new Date()),
  })
}

/* GET */

export const fetchImageURL = async fileName => {
  const imgRef = ref(storage, `${fileName}`)
  return await getDownloadURL(imgRef)
}

export const fetchUserByField = async (search, expect) => {
  const q = query(collection(db, 'users'), where(search, '==', expect))

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return null
  }

  const user = querySnapshot.docs[0]

  return mapUserFromFirebase(user)
}

export const fetchLittsByField = async (search, expect) => {
  const q = query(collection(db, 'litts'), where(search, '==', expect))

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return null
  }

  const litts = querySnapshot.docs.map(mapUserFromFirebase)

  const orderedLitts = litts.sort((a, b) => b.createdAt - a.createdAt)

  return orderedLitts
}

export const fetchAllLitts = async () => {
  const querySnapshot = await getDocs(
    collection(db, 'litts'),
    orderBy('createdAt', 'asc')
  )
  const orderedLitts = querySnapshot.docs.map(mapUserFromFirebase)
  return orderedLitts.sort((a, b) => b.createdAt - a.createdAt)
}

/* UPDATE */

export const updateUserById = async (id, data) => {
  const docRef = doc(db, 'users', id)
  await updateDoc(docRef, data)
}
