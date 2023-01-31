import { fetchLittById } from '@/firebase'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { query } = req
  const { id } = query

  const litt = await fetchLittById(id)

  if (!litt) {
    res
      .status(404)
      .json({
        error: 'Litt not found',
      })
      .end()
    return
  }

  res.status(200).json(litt)
}
