import { initializeApp } from 'firebase/app'
import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth'

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

const mapUserFromFirebaseAuth = user => {
  const { displayName, email, photoURL, reloadUserInfo } = user
  const { screenName } = reloadUserInfo

  return {
    username: screenName,
    name: displayName,
    email,
    photo: photoURL
  }
}

export const loginWithGithub = () => {
  const provider = new GithubAuthProvider()
  return signInWithPopup(auth, provider)
}

export const onAuthStateChange = onChange => {
  return auth.onAuthStateChanged(user => {
    const normalizeUser = mapUserFromFirebaseAuth(user)

    onChange(normalizeUser)
  })
}
