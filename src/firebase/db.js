import { db } from '@/firebase/client'

import {
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
  arrayRemove,
  arrayUnion,
  increment,
  getDoc,
  deleteDoc,
} from 'firebase/firestore'

import { mapUserFromFirebase, DEFAULT_INFO, mapLittFromFirebase } from './utils'

/* SUBSCRIPTIONS */

export const listenLitts = callback => {
  // make onsnapshot every 5 minutes
  return onSnapshot(
    collection(db, 'litts'),
    { includeMetadataChanges: true },
    querySnapshot => {
      const litts = querySnapshot.docs.map(mapLittFromFirebase)

      const orderedLitts = litts.sort((a, b) => b.createdAt - a.createdAt)

      callback(orderedLitts)
    }
  )
}

/* SAVE */

export const saveLittWithId = async ({
  user_id,
  userId,
  userName,
  name,
  avatar,
  content,
  img,
}) => {
  try {
    await addDoc(collection(db, 'litts'), {
      user_id,
      userId,
      userName,
      name,
      avatar,
      content,
      likes: [],
      likesCount: 0,
      shares: [],
      sharesCount: 0,
      createdAt: Timestamp.fromDate(new Date()),
      img,
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }
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

  const litts = querySnapshot.docs.map(mapLittFromFirebase)

  const orderedLitts = litts.sort((a, b) => b.createdAt - a.createdAt)

  return orderedLitts
}

export const fetchAllLitts = async () => {
  const querySnapshot = await getDocs(
    collection(db, 'litts'),
    orderBy('createdAt', 'asc')
  )

  const litts = querySnapshot.docs.map(mapLittFromFirebase)

  const orderedLitts = litts.sort((a, b) => b.createdAt - a.createdAt)

  return orderedLitts
}

export const fetchFollowers = async user_id => {
  const q = query(
    collection(db, 'users'),
    where('following', 'array-contains', user_id)
  )

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return null
  }

  const users = querySnapshot.docs.map(mapUserFromFirebase)

  return users
}

export const fetchFollowing = async user_id => {
  const q = query(
    collection(db, 'users'),
    where('followers', 'array-contains', user_id)
  )

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return null
  }

  const users = querySnapshot.docs.map(mapUserFromFirebase)

  return users
}

export const fetchLittById = async litt_id => {
  const docRef = doc(db, 'litts', litt_id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return mapLittFromFirebase(docSnap)
  }

  return null
}

export const fetchLikedLitts = async user_id => {
  const q = query(
    collection(db, 'litts'),
    where('likes', 'array-contains', user_id)
  )

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return null
  }

  const litts = querySnapshot.docs.map(mapLittFromFirebase)

  const orderedLitts = litts.sort((a, b) => b.createdAt - a.createdAt)

  return orderedLitts
}

/* UPDATE */

export const updateUserById = async (id, data) => {
  const docRef = doc(db, 'users', id)
  await updateDoc(docRef, data)
}

export const updateAllLittsByUserId = async (user_id, data) => {
  const q = query(collection(db, 'litts'), where('user_id', '==', user_id))

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return null
  }

  const litts = querySnapshot.docs.map(mapLittFromFirebase)

  const orderedLitts = litts.sort((a, b) => b.createdAt - a.createdAt)

  orderedLitts.forEach(async litt => {
    const docRef = doc(db, 'litts', litt.id)
    await updateDoc(docRef, data)
  })
}

export const addLikeToLitt = async (litt_id, user_id) => {
  const docRef = doc(db, 'litts', litt_id)

  await updateDoc(docRef, {
    likes: arrayUnion(user_id),
    likesCount: increment(1),
  })
}

export const removeLikeFromLitt = async (litt_id, user_id) => {
  const docRef = doc(db, 'litts', litt_id)

  await updateDoc(docRef, {
    likes: arrayRemove(user_id),
    likesCount: increment(-1),
  })
}

export const addSharedToLitt = async (litt_id, user_id) => {
  const docRef = doc(db, 'litts', litt_id)

  await updateDoc(docRef, {
    shares: arrayUnion(user_id),
    sharesCount: increment(1),
  })
}

export const removeSharedFromLitt = async (litt_id, user_id) => {
  const docRef = doc(db, 'litts', litt_id)

  await updateDoc(docRef, {
    shares: arrayRemove(user_id),
    sharesCount: increment(-1),
  })
}

export const addFollowerToUser = async (user_id, follower_id) => {
  const docRef = doc(db, 'users', user_id)

  await updateDoc(docRef, {
    followers: arrayUnion(follower_id),
  })
}

export const removeFollowerFromUser = async (user_id, follower_id) => {
  const docRef = doc(db, 'users', user_id)

  await updateDoc(docRef, {
    followers: arrayRemove(follower_id),
  })
}

export const addFollowingToUser = async (user_id, following_id) => {
  const docRef = doc(db, 'users', user_id)

  await updateDoc(docRef, {
    following: arrayUnion(following_id),
  })
}

export const removeFollowingFromUser = async (user_id, following_id) => {
  const docRef = doc(db, 'users', user_id)

  await updateDoc(docRef, {
    following: arrayRemove(following_id),
  })
}

/* DELETE */

export const deleteLittById = async litt_id => {
  const docRef = doc(db, 'litts', litt_id)
  await deleteDoc(docRef)
}
