// Lọc danh sách todo theo trạng thái: all | active | completed
export const filterTodos = (todos, filter) => {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    case "all":
    default:
      return todos;
  }
};

// Sắp xếp todo theo thời gian tạo (mới nhất trước)
export const sortTodosByDate = (todos, order = "desc") => {
  return [...todos].sort((a, b) => {
    if (order === "asc") {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });
};

// Sắp xếp todo theo priority (nếu có trường priority)
export const sortTodosByPriority = (todos, order = "desc") => {
  return [...todos].sort((a, b) => {
    const aPriority = a.priority || 0;
    const bPriority = b.priority || 0;

    if (order === "asc") {
      return aPriority - bPriority;
    } else {
      return bPriority - aPriority;
    }
  });
};

// Sắp xếp todo theo alphabet
export const sortTodosByText = (todos, order = "asc") => {
  return [...todos].sort((a, b) => {
    if (order === "asc") {
      return a.text.localeCompare(b.text);
    } else {
      return b.text.localeCompare(a.text);
    }
  });
};

// Kết hợp filter và sort
export const getProcessedTodos = (
  todos,
  filter = "all",
  order = "desc",
  sortBy = "date"
) => {
  const filtered = filterTodos(todos, filter);

  switch (sortBy) {
    case "priority":
      return sortTodosByPriority(filtered, order);
    case "text":
      return sortTodosByText(filtered, order);
    case "date":
    default:
      return sortTodosByDate(filtered, order);
  }
};

// Thống kê todos
export const getTodoStats = (todos) => {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    active,
    completionRate,
  };
};

// Tìm kiếm todos theo text
export const searchTodos = (todos, searchTerm) => {
  if (!searchTerm.trim()) return todos;

  return todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
