export const timeAgo = (date) => {
  const now = new Date()
  const seconds = Math.floor((now - new Date(date)) / 1000)

  const interval = Math.floor(seconds / 31536000) // 년
  if (interval > 1) return `${interval} years ago`

  const months = Math.floor(seconds / 2592000) // 월
  if (months > 1) return `${months} months ago`

  const weeks = Math.floor(seconds / 604800) // 주
  if (weeks > 1) return `${weeks} weeks ago`

  const days = Math.floor(seconds / 86400) // 일
  if (days > 1) return `${days} days ago`

  const hours = Math.floor(seconds / 3600) // 시간
  if (hours > 1) return `${hours} hours ago`

  const minutes = Math.floor(seconds / 60) // 분
  if (minutes > 1) return `${minutes} minutes ago`

  const secs = Math.floor(seconds) // 초
  if (secs > 1) return `${secs} seconds ago`

  return 'just now'
}
