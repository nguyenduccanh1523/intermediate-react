import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { useTranslation } from "react-i18next";

const TodoList = () => {
  const { t } = useTranslation();
  const todos = useSelector((state) => state.todos);

  if (todos.length === 0) {
    return (
      <div className="mt-6 relative bg-gradient-to-r from-orange-500 to-orange-900 dark:from-orange-900 dark:to-orange-500 p-6 rounded-xl shadow-lg text-white">
        <div className="text-center py-8">
          <div className="text-6xl mb-4 opacity-50">📝</div>
          <p className="text-lg opacity-80">
            {t('todoNote')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 relative bg-gradient-to-r from-orange-500 to-orange-900 dark:from-orange-900 dark:to-orange-500 p-6 rounded-xl shadow-xl text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t('todoListTask')}</h3>
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
          {todos.filter((todo) => !todo.completed).length} / {todos.length}
        </span>
      </div>
      <ul className="space-y-2 max-h-96 overflow-y-auto">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
