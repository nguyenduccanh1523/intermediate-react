import Footer from "../../components/Sidebar/Footer/Footer";
import Header from "../../components/Sidebar/Header/Header";

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 ">
    <div className="max-w-7xl mx-auto">
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  </div>
);

export default MainLayout;
