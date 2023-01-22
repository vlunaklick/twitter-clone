const isRelativeTimeFormatSupported = false

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const DATE_AR = {
  day: 'día',
  hour: 'hora',
  minute: 'minuto',
  second: 'segundo'
}

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

export const formatTimeAgo = (timestamp) => {
  const dateDiffs = getDateDiffs(timestamp)

  if (!isRelativeTimeFormatSupported) {
    const { value, unit } = dateDiffs

    return `Hace ${value * -1} ${DATE_AR[unit]}${value !== 1 ? 's' : ''}`
  }

  const rtf = new Intl.RelativeTimeFormat('es-AR', { style: 'narrow' })

  return rtf.format(dateDiffs.value, dateDiffs.unit)
}

export default function useTimeAgo (createdAt) {
  return {
    timeAgo: formatTimeAgo(createdAt)
  }
}
