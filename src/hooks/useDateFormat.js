export default function useDateFormat (timepstamp) {
  const date = new Date(timepstamp)
  const language = 'es-AR'

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }

  return { formattedDate: new Intl.DateTimeFormat(language, options).format(date) }
}
