import { auth } from '@/firebase/client'

import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'

import { fetchUserByField } from './db'

import { mapUserFromFirebaseAuth } from './utils'

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

export const refetchUser = async uid => {
  const user = await fetchUserByField('userId', uid)
  return user
}

export const logout = () => {
  auth.signOut()
}
