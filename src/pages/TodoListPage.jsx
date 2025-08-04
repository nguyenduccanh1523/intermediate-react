import React from "react";
import { useTranslation } from "react-i18next";
import TodoInput from "../components/Todo/TodoInput";
import TodoList from "../components/Todo/TodoList";

const TodoListPage = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen mb-10 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900 dark:from-blue-900 dark:via-blue-800 dark:to-blue-500">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white dark:text-white mb-2 drop-shadow-lg">
            {t("todoList")}
          </h1>
          <p className="text-white/80 text-lg">{t("todoListspan")}</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoListPage;
