import { ADD_NEW_TODO, DELETE_TODO } from "./actions"

export interface TTodo {
  id: string
  title: string
  about: string
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
