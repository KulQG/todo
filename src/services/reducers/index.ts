import { combineReducers } from "@reduxjs/toolkit"
import { todosReducer } from "./todos"

export const rootReducer = combineReducers({
  todos: todosReducer,
})
