const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000

export function getDateByDays(days: number) {
  const fixedBaseDate = new Date(1997, 9, 7)

  const baseDateTime = fixedBaseDate.getTime()
  const daysInTime = days * DAY_IN_MILLISECONDS

  const date = new Date(baseDateTime + daysInTime)

  const [formattedDate] = date.toISOString().split('T')

  return formattedDate
}
