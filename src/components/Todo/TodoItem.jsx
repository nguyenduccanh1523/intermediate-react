import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../../store/redux/todosSlice";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <li className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-2 hover:bg-white/20 transition-all duration-200 border border-white/20">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
          className="w-5 h-5 rounded border-2 border-white/50 bg-transparent checked:bg-white checked:border-white cursor-pointer"
        />
        <span
          onClick={() => dispatch(toggleTodo(todo.id))}
          className={`flex-1 cursor-pointer select-none ${
            todo.completed ? "line-through text-white/60" : "text-white"
          } hover:text-white/80 transition-colors duration-200`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="ml-3 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-500 text-white font-bold flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        ×
      </button>
    </li>
  );
};

export default TodoItem;
