import { ADD_NEW_TODO, DELETE_TODO, EDIT_TODO, MOVE_TODO } from "./actions"

export interface TTodo {
  id: string
  title: string
  about: string
  index: number
  checked: boolean
}

export interface IState {
  todos: TTodo[]
}

export type TodosAction =
  | {
      type: typeof ADD_NEW_TODO
      payload: TTodo
    }
  | {
      type: typeof DELETE_TODO
      payload: string
    }
  | {
      type: typeof MOVE_TODO
      payload: TTodo[]
    }
  | {
      type: typeof EDIT_TODO
      payload: TTodo
    }
