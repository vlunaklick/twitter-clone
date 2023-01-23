export const DEFAULT_INFO = {
  header:
    'https://firebasestorage.googleapis.com/v0/b/concers-30991.appspot.com/o/default%2Fdefault-header.png?alt=media&token=d18913d7-e0c4-4479-a77a-883c664f72c6',
}

export const mapUserFromFirebaseAuth = user => {
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

export const mapUserFromFirebase = doc => {
  const data = doc.data()

  const { createdAt } = data

  return {
    ...data,
    id: doc.id,
    createdAt: +createdAt.toDate(),
  }
}

export const mapLittFromFirebase = doc => {
  const data = doc.data()

  const { createdAt } = data

  return {
    ...data,
    id: doc.id,
    createdAt: +createdAt.toDate(),
  }
}
