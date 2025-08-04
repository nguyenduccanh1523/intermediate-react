import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/redux/todosSlice";
import { useTranslation } from "react-i18next";

const TodoInput = () => {
  const {t} = useTranslation();
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text.trim()));
      setText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 mb-6">
      <div className="relative flex-1 max-w-md">
        <input
          placeholder={t('todoPlaceholder')}
          className="w-full border-2 border-white/30 bg-white/10 backdrop-blur-sm p-3 pl-4 pr-4 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all duration-200"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-lg"
        onClick={handleAdd}
        disabled={!text.trim()}
      >
        {t('todoAdd')}
      </button>
    </div>
  );
};

export default TodoInput;
