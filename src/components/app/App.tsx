import { useState } from "react"
import "./App.scss"
import plusIcon from "../../images/plus.svg"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { Todo } from "../todo/todo"
import { ADD_NEW_TODO, DELETE_TODO } from "../../services/actions"
import { v4 as uuidv4 } from "uuid"

function App() {
  const todos = useAppSelector((s) => s.todos.todos)

  const [creator, setCreator] = useState({
    title: "",
    about: "",
  })

  const changeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { className, value } = e.currentTarget
    setCreator((prevCreator) => ({
      ...prevCreator,
      [className]: value,
    }))
  }

  const dispatch = useAppDispatch()

  const addNewToDo = (e: React.FormEvent) => {
    e.preventDefault()
    if (creator.title || creator.about) {
      const id = uuidv4()
      console.log(id)
      dispatch({ type: ADD_NEW_TODO, payload: { ...creator, id } })

      setCreator({
        title: "",
        about: "",
      })
    }
  }

  return (
    <div className="page">
      <div className="creator">
        {/* <form onSubmit={addNewToDo} className="creator-form"> */}
        <div className="creator-form">
          <input
            value={creator.title}
            className="title"
            type="text"
            placeholder="Заголовок"
            onChange={changeInput}
          />
          <input
            value={creator.about}
            className="about"
            type="text"
            placeholder="Текст"
            onChange={changeInput}
          />
          <button onClick={addNewToDo} type="button">
            <img src={plusIcon} alt="Добавить" />
          </button>
        </div>
        {/* </form> */}
      </div>
      <div className="todos">
        {todos &&
          todos.map((i) => {
            return (
              <Todo
                key={i.id}
                deletefn={(id: string) => {
                  dispatch({ type: DELETE_TODO, payload: id })
                  console.log(id)
                }}
                id={i.id}
                title={i.title}
                about={i.about}
              ></Todo>
            )
          })}
      </div>
    </div>
  )
}

export default App
