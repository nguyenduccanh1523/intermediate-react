import Header from "../../components/Sidebar/Header/Header";

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-100 transition-colors duration-300">
    <div className="max-w-7xl mx-auto">
      <Header />
      <main className="">{children}</main>

    </div>
  </div>
);

export default MainLayout;
