import { ADD_NEW_TODO, DELETE_TODO, EDIT_TODO, MOVE_TODO } from "../actions"
import { IState, TodosAction } from "../types"

const initialState: IState = {
  todos: [],
}

export const todosReducer = (state = initialState, action: TodosAction) => {
  switch (action.type) {
    case ADD_NEW_TODO: {
      return { ...state, todos: [...state.todos, action.payload] }
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((i) => i.id !== action.payload),
      }
    }
    case MOVE_TODO: {
      return {
        ...state,
        todos: action.payload,
      }
    }
    case EDIT_TODO: {
      return {
        ...state,
        todos: state.todos.map((i) => {
          if (i.id === action.payload.id) {
            i = action.payload
          }
          return i
        }),
      }
    }
    default: {
      return state
    }
  }
}
