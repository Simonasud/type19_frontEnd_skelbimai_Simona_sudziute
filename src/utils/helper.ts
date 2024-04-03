export function getNiceDate(dateString: string): string {
  const dateObj = new Date(dateString)
  const formattedDate = dateObj.toLocaleDateString('lt-LT',{dateStyle: 'medium'})
  return formattedDate;
}