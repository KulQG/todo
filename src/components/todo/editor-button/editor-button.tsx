import { FC } from "react"
import styles from "./editor-button.module.scss"
import edit from "../../../images/edit.png"
import del from "../../../images/delete.png"

interface IButtonEditor {
  disabled: boolean
  onClick: () => void
  type?: "edit" | "delete"
  img?: string
}

const EditorButton: FC<IButtonEditor> = ({ disabled, onClick, type, img }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={styles.editorBtn}>
      <img
        src={type ? (type === "edit" ? edit : del) : img}
        alt="Редактировать"
      />
    </button>
  )
}

export default EditorButton
