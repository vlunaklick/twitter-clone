import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'

import { getStorage } from 'firebase/storage'

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

export const auth = getAuth(app)

export const db = getFirestore(app)

export const storage = getStorage(app)
