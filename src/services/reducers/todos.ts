import {
  ADD_NEW_TODO,
  CHECK_SAVED_TODOS,
  DELETE_TODO,
  EDIT_TODO,
  MOVE_TODO,
} from "../actions"
import { IState, TTodo, TodosAction } from "../types"

const initialState: IState = {
  todos: [],
}

export const todosReducer = (state = initialState, action: TodosAction) => {
  switch (action.type) {
    case ADD_NEW_TODO: {
      const newTodos = [...state.todos, action.payload]

      if (localStorage.todos) {
        localStorage.todos = JSON.stringify(newTodos)
      } else {
        localStorage.setItem("todos", JSON.stringify(newTodos))
      }

      return { ...state, todos: newTodos }
    }
    case DELETE_TODO: {
      const newTodos = state.todos.filter((i) => i.id !== action.payload)

      localStorage.todos = JSON.stringify(newTodos)

      return {
        ...state,
        todos: newTodos,
      }
    }
    case MOVE_TODO: {
      const newTodos = action.payload

      localStorage.todos = JSON.stringify(newTodos)

      return {
        ...state,
        todos: newTodos,
      }
    }
    case EDIT_TODO: {
      const newTodos = state.todos.map((i) => {
        if (i.id === action.payload.id) {
          i = action.payload
        }
        return i
      })

      localStorage.todos = JSON.stringify(newTodos)

      return {
        ...state,
        todos: newTodos,
      }
    }
    case CHECK_SAVED_TODOS: {
      if (localStorage.todos) {
        return {
          ...state,
          todos: JSON.parse(localStorage.todos) as TTodo[],
        }
      } else {
        return state
      }
    }
    default: {
      return state
    }
  }
}
