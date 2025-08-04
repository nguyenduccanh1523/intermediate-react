import React, { useState } from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import TodoStats from "./TodoStats";
import { useTranslation } from "react-i18next";
import {
  getProcessedTodos,
  getTodoStats,
  searchTodos,
} from "../../utils/todoList/helpers";

const TodoList = () => {
  const { t } = useTranslation();
  const todos = useSelector((state) => state.todos);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("date");
  const [searchTerm, setSearchTerm] = useState("");

  // Áp dụng search trước, sau đó filter và sort
  const searchedTodos = searchTodos(todos, searchTerm);
  const processedTodos = getProcessedTodos(
    searchedTodos,
    filter,
    sortOrder,
    sortBy
  );
  const stats = getTodoStats(searchedTodos);

  if (todos.length === 0) {
    return (
      <div className="mt-6 relative bg-gradient-to-r from-orange-500 to-orange-900 dark:from-orange-900 dark:to-orange-500 p-6 rounded-xl shadow-lg text-white">
        <div className="text-center py-8">
          <div className="text-6xl mb-4 opacity-50">📝</div>
          <p className="text-lg opacity-80">{t("todoNote")}</p>
        </div>
      </div>
    );
  }

  const filterButtons = [
    {
      key: "all",
      label: t("filterAll"),
      count: searchedTodos.length,
    },
    {
      key: "active",
      label: t("filterPending"),
      count: searchedTodos.filter((todo) => !todo.completed).length,
    },
    {
      key: "completed",
      label: t("filterCompleted"),
      count: searchedTodos.filter((todo) => todo.completed).length,
    },
  ];

  return (
    <div className="mt-6 relative bg-gradient-to-r from-orange-500 to-orange-900 dark:from-orange-900 dark:to-orange-500 p-6 rounded-xl shadow-xl text-white">
      {/* Header with title and stats */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t("todoListTask")}</h3>
        <div className="flex items-center gap-2">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            {stats.active} / {stats.total}
          </span>
          <span className="bg-green-500/30 px-2 py-1 rounded-full text-xs">
            {stats.completionRate}%
          </span>
        </div>
      </div>

      {/* Statistics Component */}
      <TodoStats todos={searchedTodos} />

      {/* Search Box */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t("search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all duration-200"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
            🔍
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="mb-4 space-y-3">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-white/80 font-medium mr-2 flex items-center">
            {t("filter")}:
          </span>
          {filterButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                filter === btn.key
                  ? "bg-white text-orange-600 shadow-md"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {btn.label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  filter === btn.key
                    ? "bg-orange-200 text-orange-700"
                    : "bg-white/20"
                }`}
              >
                {btn.count}
              </span>
            </button>
          ))}
        </div>

        {/* Sort controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-white/80 font-medium">{t("sort")}:</span>

          {/* Sort by options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 py-1 rounded-lg text-sm bg-white/20 text-white border border-white/30 focus:outline-none focus:border-white/60"
          >
            <option value="date" className="text-black">
              {t("sortDate")}
            </option>
            <option value="text" className="text-black">
              A-Z
            </option>
          </select>

          {/* Sort order toggle */}
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="px-3 py-1 rounded-lg text-sm font-medium bg-white/20 text-white hover:bg-white/30 transition-all duration-200 flex items-center gap-1"
          >
            {sortBy === "date"
              ? sortOrder === "desc"
                ? `↓ ${t("sortDateDesc")}`
                : `↑ ${t("sortDateAsc")}`
              : sortOrder === "asc"
              ? "↓ A-Z"
              : "↑ Z-A"}
          </button>
        </div>
      </div>

      {/* Todo List */}
      {processedTodos.length === 0 ? (
        <div className="text-center py-6">
          <div className="text-4xl mb-2 opacity-50">🔍</div>
          <p className="text-white/80">{t("noResults")}</p>
        </div>
      ) : (
        <ul className="space-y-2 max-h-96 overflow-y-auto">
          {processedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
