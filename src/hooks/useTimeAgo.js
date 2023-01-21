import { useState } from 'react'

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiffs = timestamp => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000 // Te da en milisegundos

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'seconds') {
      const value = Math.floor(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo (createdAt) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(createdAt))
  const rtf = new Intl.RelativeTimeFormat('es-AR', { style: 'narrow' })

  /* useEffect(() => {
    const timeOut = setTimeout(() => {
      const newTimeAgo = getDateDiffs(createdAt)
      setTimeAgo(newTimeAgo)
    }, 15000)

    return () => clearTimeout(timeOut)
  }) */
  return {
    timeAgo: rtf.format(timeAgo.value, timeAgo.unit)
  }
}
