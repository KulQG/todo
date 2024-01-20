import { FC, useEffect, useState } from "react"
import styles from "./notification.module.scss"

interface INotification {
  text: string
  time?: number
}

const Notification: FC<INotification> = ({ text, time = 3000 }) => {
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const disactive = () => setIsActive(false)
    const timerId = setTimeout(disactive, time)

    return () => clearTimeout(timerId)
  }, [time])

  return (
    isActive && (
      <>
        <div className={styles.notification}>
          <p>{text}</p>
        </div>
      </>
    )
  )
}

export default Notification
