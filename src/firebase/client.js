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
  doc,
  getDoc,
  query,
  where,
} from 'firebase/firestore'

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

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

const mapUserFromFirebaseAuth = user => {
  const { displayName, email, photoURL, uid, reloadUserInfo } = user
  const { screenName } = reloadUserInfo

  return {
    userId: uid,
    userName: screenName,
    name: displayName,
    email,
    avatar: photoURL,
  }
}

const mapLittFromFirebase = doc => {
  const data = doc.data()
  const { createdAt } = data

  return {
    ...data,
    id: doc.id,
    createdAt: +createdAt.toDate(),
  }
}

export const loginWithGithub = async () => {
  const provider = new GithubAuthProvider()
  signInWithPopup(auth, provider).then(async data => {
    const { user } = data

    const userInDb = await getUserById('userId', user.uid)

    if (userInDb === null) {
      await saveUser(mapUserFromFirebaseAuth(user))
    }
  })
}

export const onAuthStateChange = onChange => {
  return auth.onAuthStateChanged(user => {
    const normalizeUser = user ? mapUserFromFirebaseAuth(user) : null

    onChange(normalizeUser)
  })
}

export const addLitt = async ({
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

export const getLitts = async () => {
  const querySnapshot = await getDocs(
    collection(db, 'litts'),
    orderBy('createdAt', 'asc')
  )
  const orderedLitts = querySnapshot.docs.map(mapLittFromFirebase)
  return orderedLitts.sort((a, b) => b.createdAt - a.createdAt)
}

export const listenLitts = callback => {
  return onSnapshot(
    collection(db, 'litts'),
    orderBy('createdAt', 'desc'),
    snapshot => {
      const litts = snapshot.docs.map(mapLittFromFirebase)
      const orderedLitts = litts.sort((a, b) => b.createdAt - a.createdAt)
      callback(orderedLitts)
    }
  )
}

export const uploadImage = file => {
  const imgRef = ref(storage, `images/${file.name}`)
  const task = uploadBytesResumable(imgRef, file)
  return task
}

export const getImage = async fileName => {
  const imgRef = ref(storage, `${fileName}`)
  return await getDownloadURL(imgRef)
}

export const uploadImageAndGetURL = async file => {
  const task = uploadImage(file)
  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      snapshot => {
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
    header: '',
    createdAt: Timestamp.fromDate(new Date()),
  })
}

export const getUserById = async (search, expect) => {
  const q = query(collection(db, 'users'), where(search, '==', expect))

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return null
  }

  const user = querySnapshot.docs[0]

  return mapLittFromFirebase(user)
}

export const getLittsById = async (search, expect) => {
  const q = query(collection(db, 'litts'), where(search, '==', expect))

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return null
  }

  const litts = querySnapshot.docs.map(mapLittFromFirebase)

  const orderedLitts = litts.sort((a, b) => b.createdAt - a.createdAt)

  return orderedLitts
}
