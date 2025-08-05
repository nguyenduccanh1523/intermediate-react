import HomePage from "../pages/HomePage";
import AboutPage from '../pages/AboutPage';
import TodoListPage from "../pages/TodoListPage";
import WeatherPage from "../pages/WeatherPage";
import Ecommerce from "../pages/Ecommerce";

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
  },
  {
    path: "/weather",
    element: <WeatherPage />
  },
  {
    path: "/ecommerce",
    element: <Ecommerce />
  }

];

export default publicRoutes;
