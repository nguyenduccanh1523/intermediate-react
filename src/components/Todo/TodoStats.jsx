import React from "react";
import { getTodoStats } from "../../utils/todoList/helpers";
import { useTranslation } from "react-i18next";

const TodoStats = ({ todos }) => {
  const { t } = useTranslation();
  const stats = getTodoStats(todos);

  if (todos.length === 0) return null;

  return (
    <div className="mb-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
      <h4 className="text-sm font-medium text-white/90 mb-3">{t("todoStats")}</h4>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-xs text-white/70">{t("todoTotal")}</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-blue-300">{stats.active}</div>
          <div className="text-xs text-white/70">{t("todoPending")}</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-green-300">
            {stats.completed}
          </div>
          <div className="text-xs text-white/70">{t("todoCompleted")}</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-300">
            {stats.completionRate}%
          </div>
          <div className="text-xs text-white/70">{t("todoProgress")}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-white/70 mb-1">
          <span>{t("todoProgressCompleted")}</span>
          <span>{stats.completionRate}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${stats.completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;
