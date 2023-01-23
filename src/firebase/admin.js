import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

try {
  initializeApp()
} catch (e) {
  console.log('Firebase admin already initialized')
}

export const firestore = getFirestore()

export const getLitBySlug = async slug => {
  const doc = await firestore.collection('litts').doc(slug).get()

  if (!doc.exists) {
    return null
  }

  const data = doc.data()
  const { createdAt } = data

  return {
    ...data,
    id: slug,
    createdAt: +createdAt.toDate(),
  }
}
