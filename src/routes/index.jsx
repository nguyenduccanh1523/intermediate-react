import { Route, Routes } from "react-router-dom";
import publicRoutes from "./PublicRoutes";
import MainLayout from "../layouts/MainLayout/MainLayout";
// import AuthRoutes from './AuthRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<MainLayout>{element}</MainLayout>}
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
