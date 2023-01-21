import { initializeApp } from 'firebase/app'
import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs
} from 'firebase/firestore'

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

const mapLittys = snapshot => {
  return snapshot.docs.map(doc => {
    const data = doc.data()
    const { createdAt } = data

    return {
      ...data,
      id: doc.id,
      createdAt: +createdAt.toDate()
    }
  })
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

export const addLitty = async ({ userId, userName, name, avatar, content }) => {
  try {
    await addDoc(collection(db, 'littys'), {
      userId,
      userName,
      name,
      avatar,
      content,
      likesCount: 0,
      sharedCount: 0,
      createdAt: Timestamp.fromDate(new Date())
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const getLittys = async () => {
  const querySnapshot = await getDocs(collection(db, 'littys'))
  const unorderedLittys = mapLittys(querySnapshot)
  const orderedLittys = unorderedLittys.sort((a, b) => b.createdAt - a.createdAt)
  return orderedLittys
}
