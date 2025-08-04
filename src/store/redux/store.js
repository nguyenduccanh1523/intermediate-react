import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../redux/todosSlice";

// Create the Redux store

export const store = configureStore({
  reducer: {
    todos: todosReducer
  }
});