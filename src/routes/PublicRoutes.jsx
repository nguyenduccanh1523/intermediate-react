import HomePage from "../pages/HomePage";
import AboutPage from '../pages/AboutPage';
import TodoListPage from "../pages/TodoListPage";

const publicRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />
  },
  {
    path: "/todo",
    element: <TodoListPage />
  }

];

export default publicRoutes;
