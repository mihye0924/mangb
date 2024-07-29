import { differenceInDays, parseISO } from 'date-fns'

function isWithinTwoWeeks(dateString) {
  if (!dateString) {
    return
  }
  const today = new Date();
  const givenDate = dateString.replace(/(\d{4})\D\s?(\d{1,2})\D\s?(\d{1,2}).+/, (_, yyyy, mm, dd) => {
    return parseISO(`${today.getFullYear()}-${mm.padStart(2, 0)}-${dd.padStart(2, 0)}`)
  })
  const daysDifference = differenceInDays(today, givenDate);

  return daysDifference <= 0 && daysDifference >= -14 && { date: dateString, diff: daysDifference };
}

export { isWithinTwoWeeks }