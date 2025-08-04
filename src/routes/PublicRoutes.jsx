import HomePage from "../pages/HomePage";
import AboutPage from '../pages/AboutPage';

const publicRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />
  }
];

export default publicRoutes;
