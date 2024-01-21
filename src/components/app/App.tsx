import { useEffect, useState } from "react"
import "./App.scss"
import plusIcon from "../../images/plus.svg"
import { useAppDispatch, useAppSelector } from "../../services/hooks"
import { Todo } from "../todo/todo"
import {
  ADD_NEW_TODO,
  CHECK_SAVED_TODOS,
  DELETE_TODO,
} from "../../services/actions"
import { v4 as uuidv4 } from "uuid"
import { DndProvider } from "react-dnd"
import { getBackend, isMobile, opts } from "../../utils/constants"
import Textarea from "../textarea/textarea"
import FilterPanel from "../filter-panel/filter-panel"
import DragButton from "../drag-button/drag-button"
import { TTodo } from "../../services/types"

function App() {
  const [isFiltered, setIsFiltered] = useState<"all" | "done" | "no done">(
    "all",
  )
  const [creator, setCreator] = useState({
    title: "",
    about: "",
  })
  const [isCanDrag, setIsCanDrag] = useState(isMobile ? false : true)

  const dispatch = useAppDispatch()
  useEffect(() => {
    // проверка наличия сохраненных туду в localStorage
    dispatch({ type: CHECK_SAVED_TODOS })
  }, [])

  const todos = useAppSelector((s) => s.todos.todos)

  const changeInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { className, value } = e.currentTarget
    setCreator((prevCreator) => ({
      ...prevCreator,
      [className]: value,
    }))
  }

  // добавление новых туду
  const addNewToDo = (e: React.FormEvent) => {
    e.preventDefault()
    if (creator.title || creator.about) {
      const id = uuidv4()
      dispatch({
        type: ADD_NEW_TODO,
        payload: { ...creator, id, checked: false },
      })

      setCreator({
        title: "",
        about: "",
      })
    }
  }

  const deleteTodo = (id: string) => {
    dispatch({ type: DELETE_TODO, payload: id })
  }

  const renderTodo = (i: TTodo, index: number) => {
    return (
      <Todo
        key={i.id}
        deletefn={() => {
          deleteTodo(i.id)
        }}
        id={i.id}
        title={i.title}
        about={i.about}
        index={index}
        checked={i.checked}
        canDnd={isCanDrag}
      />
    )
  }

  // рендер тудушек в зависимости от их активности
  const renderTodos = () => {
    if (todos) {
      if (isFiltered === "all") {
        return todos.map((i, index) => {
          return renderTodo(i, index)
        })
      } else if (isFiltered === "done") {
        return todos.map((i, index) => {
          if (i.checked === true) {
            return renderTodo(i, index)
          } else {
            return null
          }
        })
      } else if (isFiltered === "no done") {
        return todos.map((i, index) => {
          if (i.checked === false) {
            return renderTodo(i, index)
          } else {
            return null
          }
        })
      }
    } else {
      return null
    }
  }

  return (
    <>
      <div className="page">
        <div className="creator">
          <form onSubmit={addNewToDo} className="creator-form">
            <div className="inputs">
              <input
                value={creator.title}
                className="title"
                type="text"
                placeholder="Заголовок"
                onChange={changeInput}
              />
              <Textarea value={creator.about} onChange={changeInput} />
            </div>
            <button onClick={addNewToDo} type="submit">
              <img src={plusIcon} alt="Добавить" />
            </button>
          </form>
        </div>
        <nav className="nav">
          <FilterPanel
            disabled={isFiltered === "all"}
            text="Все"
            onClick={() => setIsFiltered("all")}
          />
          <FilterPanel
            disabled={isFiltered === "no done"}
            text="Невыполненные"
            onClick={() => setIsFiltered("no done")}
          />
          <FilterPanel
            disabled={isFiltered === "done"}
            text="Выполненные"
            onClick={() => setIsFiltered("done")}
          />
        </nav>
        <div className="todos">
          <DndProvider backend={getBackend()} options={opts}>
            {renderTodos()}
          </DndProvider>
        </div>
      </div>
      {isMobile && (
        <DragButton
          onClick={() => setIsCanDrag(!isCanDrag)}
          isCanDrag={isCanDrag}
        />
      )}
    </>
  )
}

export default App
