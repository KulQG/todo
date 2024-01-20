import { FC, useState } from "react"
import styles from "./todo.module.scss"
import { TTodo } from "../../services/types"
import { useDrag, useDrop } from "react-dnd"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { EDIT_TODO, MOVE_TODO } from "../../services/actions"
import Textarea from "../textarea/textarea"
import done from "../../images/done.svg"
import EditorButton from "./editor-button/editor-button"

type TTodoProps = TTodo & {
  deletefn: () => void
  canDnd: boolean
}

export const Todo: FC<TTodoProps> = ({
  id,
  title,
  about,
  deletefn,
  index,
  checked,
  canDnd,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isChecked, setIsChecked] = useState(checked)
  const [editor, setEditor] = useState({
    title: title,
    about: about,
  })

  const dispatch = useAppDispatch()
  const todos = useAppSelector((s) => s.todos.todos)

  const [{ isDrag }, dragRef] = useDrag({
    type: "todo",
    item: { id, title, about, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  })

  const [, dropItem] = useDrop({
    accept: "todo",
    drop(item: TTodo) {
      const dragIndex = item.index
      const hoverIndex = index
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  // перемещение тудушек
  const moveCard = (fromIndex: number, toIndex: number) => {
    const newCardList = Array.from(todos)
    const [removedCard] = newCardList.splice(fromIndex, 1)
    newCardList.splice(toIndex, 0, removedCard)
    dispatch({ type: MOVE_TODO, payload: newCardList })
  }

  const changeInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { className, value } = e.currentTarget
    setEditor((prevEditor) => ({
      ...prevEditor,
      [className]: value,
    }))
  }

  return (
    !isDrag && (
      <div
        className={`${styles.todo} ${isOpen ? styles.todoActive : ""} ${
          isChecked ? styles.todoDone : ""
        }`}
        ref={
          // включено ли перетаскивание
          canDnd
            ? (node) => {
                dragRef(dropItem(node))
              }
            : null
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="checkbox"
          onChange={() => {
            setIsChecked(!isChecked)
            dispatch({
              type: EDIT_TODO,
              payload: {
                title: editor.title,
                about: editor.about,
                id,
                index,
                checked: !isChecked,
              },
            })
          }}
          checked={isChecked}
          name={id}
          id={id}
          className={styles.checkbox}
        />
        <div className={styles.text}>
          {!isEditing ? (
            <>
              <h3 className={styles.title}>{editor.title}</h3>
              <p className={styles.subtitle}>{editor.about}</p>
            </>
          ) : (
            <>
              <input
                value={editor.title}
                className="title"
                type="text"
                placeholder="Заголовок"
                onChange={changeInput}
              />
              <Textarea value={editor.about} onChange={changeInput} />
              <button
                onClick={() => {
                  setIsEditing(false)
                  dispatch({
                    type: EDIT_TODO,
                    payload: {
                      title: editor.title,
                      about: editor.about,
                      id,
                      index,
                      checked,
                    },
                  })
                }}
                className={styles.okBtn}
              >
                <img src={done} alt="Ок" />
              </button>
            </>
          )}
        </div>
        <div className={styles.editor}>
          <EditorButton
            disabled={isEditing}
            onClick={() => setIsEditing(true)}
            type="edit"
          />
          <EditorButton disabled={isEditing} onClick={deletefn} type="delete" />
        </div>
      </div>
    )
  )
}
