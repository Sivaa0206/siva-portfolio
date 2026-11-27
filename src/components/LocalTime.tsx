import { useEffect, useState } from 'react'

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState(() => formatter.format(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatter.format(new Date())), 30_000)
    return () => window.clearInterval(id)
  }, [])

  return <span className={className}>{time} IST</span>
}
