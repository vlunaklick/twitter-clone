import { firestore } from '@/firebase/admin'

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  const { query } = req
  const { id } = query

  firestore
    .collection('litts')
    .doc(id)
    .get()
    .then(doc => {
      const data = doc.data()

      res.json({
        ...data,
        id,
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).end()
    })
}
