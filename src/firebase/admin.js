import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

try {
  initializeApp({
    credential: applicationDefault(),
    databaseURL: 'https://concers-30991.firebaseio.com'
  }, 'admin')
} catch (e) {
  console.log('Firebase admin already initialized')
}

export const firestore = getFirestore()

export const getLitBySlug = async (slug) => {
  const doc = await firestore.collection('littys').doc(slug).get()

  if (!doc.exists) {
    return null
  }

  const data = doc.data()
  const { createdAt } = data

  return {
    ...data,
    id: slug,
    createdAt: +createdAt.toDate()
  }
}
