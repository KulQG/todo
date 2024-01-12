import { ADD_NEW_TODO, DELETE_TODO } from "../actions"
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
    default: {
      return state
    }
  }
}
