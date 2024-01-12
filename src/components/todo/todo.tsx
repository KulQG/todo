import { FC } from "react"
import styles from "./todo.module.scss"
import { TTodo } from "../../services/types"
import edit from "../../images/edit.png"
import del from "../../images/delete.png"

type TTodoProps = TTodo & {
  deletefn: (id: string) => void
}

export const Todo: FC<TTodoProps> = ({ id, title, about, deletefn }) => {
  return (
    <div className={styles.todo}>
      <div className={styles.text}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{about}</p>
      </div>
      <div className={styles.editor}>
        <button className={styles.edit}>
          <img src={edit} alt="Редактировать" />
        </button>
        <button onClick={() => deletefn(id)} className={styles.delete}>
          <img src={del} alt="удалить" />
        </button>
      </div>
    </div>
  )
}
