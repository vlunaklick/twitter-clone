const isDateTimeFormatSupported = typeof Intl !== 'undefined' && Intl.DateTimeFormat

export const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const language = 'es-AR'

  if (!isDateTimeFormatSupported) {
    const options = {
      year: 'numeric',
      month: 'numeric',
      weekday: 'short',
      day: 'numeric'
    }

    return date.toLocaleDateString(language, options)
  }

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }

  return new Intl.DateTimeFormat(language, options).format(date)
}

export default function useDateFormat (timestamp) {
  console.log(formatDate(timestamp))
  return { formattedDate: formatDate(timestamp) }
}
