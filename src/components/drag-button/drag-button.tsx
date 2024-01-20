import { FC } from "react"
import styles from "./drag-button.module.scss"
import dragImg from "../../images/drag.png"
import Notification from "../notification/notification"

interface IDragButton {
  onClick: () => void
  isCanDrag: boolean
}

const DragButton: FC<IDragButton> = ({ onClick, isCanDrag }) => {
  return (
    <>
      <button className={styles.dragBtn} onClick={onClick}>
        <img src={dragImg} alt="Включить перетаскивание" />
      </button>
      {isCanDrag && <Notification text="включено перетаскивание" />}
      {!isCanDrag && <Notification text="перетаскивание выключено" />}
    </>
  )
}

export default DragButton
