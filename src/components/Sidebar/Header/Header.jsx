import Flag from "react-world-flags";
import ChevronDown from "../../icons/ChevronDown";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../context/ThemeContext";
import DarkMode from "../../icons/DarkMode";
import LightMode from "../../icons/LightMode";
import { FaArrowUp } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
const Header = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, setDark } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [openLanguage, setOpenLanguage] = useState(false);
  const currentLanguage = i18n.language;
  const location = useLocation();

  // Function để xác định item nào đang active dựa trên pathname
  const getActiveNavItem = (pathname) => {
    if (pathname === "/") return "home";
    if (pathname === "/about") return "about";
    if (pathname === "/todo") return "todo";
    if (pathname === "/weather") return "weather";
    if (pathname === "/ecommerce") return "ecommerce";
    if (pathname === "/template") return "template";
    if (pathname === "/contact") return "contact";
    return "home"; // default
  };

  const activeNavItem = getActiveNavItem(location.pathname);

  const handleLanguageChange = async (lang) => {
    await i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setOpenLanguage(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
      setShowScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div
      className={`top-0 w-full z-50 transition-all duration-300 ${
        isSticky
          ? "fixed left-0 right-0 bg-white shadow text-gray-900 dark:bg-gray-900 dark:text-white"
          : "relative bg-gradient-to-r from-indigo-500 to-indigo-900 text-white dark:from-indigo-900 dark:to-indigo-500"
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto flex justify-between items-center px-6 py-3 ${
          isSticky ? "text-gray-900" : "text-white"
        } dark:text-white`}
      >
        <h1 className="text-x font-bold">My Application Intermediate</h1>
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li>
            <Link
              to="/"
              className={`hover:opacity-75 transition-opacity hover:text-orange-500 ${
                activeNavItem === "home" ? "text-orange-500" : ""
              }`}
            >
              {t("home")}
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`hover:opacity-75 transition-opacity hover:text-orange-500 ${
                activeNavItem === "about" ? "text-orange-500" : ""
              }`}
            >
              {t("about")}
            </Link>
          </li>
          <li>
            <Link
              to="/todo"
              className={`hover:opacity-75 transition-opacity hover:text-orange-500 ${
                activeNavItem === "todo" ? "text-orange-500" : ""
              }`}
            >
              {t("todo")}
            </Link>
          </li>
          <li>
            <Link
              to="/weather"
              className={`hover:opacity-75 transition-opacity hover:text-orange-500 ${
                activeNavItem === "weather" ? "text-orange-500" : ""
              }`}
            >
              {t("weather")}
            </Link>
          </li>
          <li>
            <Link
              to="/ecommerce"
              className={`hover:opacity-75 transition-opacity hover:text-orange-500 ${
                activeNavItem === "ecommerce" ? "text-orange-500" : ""
              }`}
            >
              {t("ecommerce")}
            </Link>
          </li>
          <li>
            <Link
              to="/template"
              className={`hover:opacity-75 transition-opacity hover:text-orange-500 ${
                activeNavItem === "template" ? "text-orange-500" : ""
              }`}
            >
              {t("template")}
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`hover:opacity-75 transition-opacity hover:text-orange-500 ${
                activeNavItem === "contact" ? "text-orange-500" : ""
              }`}
            >
              {t("contact")}
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setOpenLanguage(!openLanguage)}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {currentLanguage === "vi" ? (
                <Flag code="VN" style={{ width: 20, height: 14 }} />
              ) : (
                <Flag code="GB" style={{ width: 20, height: 14 }} />
              )}
              {currentLanguage.toUpperCase()}
              <ChevronDown />
            </button>

            {openLanguage && (
              <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-10">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white flex items-center gap-2"
                >
                  <Flag code="GB" style={{ width: 20, height: 14 }} /> English
                </button>
                <button
                  onClick={() => handleLanguageChange("vi")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white flex items-center gap-2"
                >
                  <Flag code="VN" style={{ width: 20, height: 14 }} /> Tiếng
                  Việt
                </button>
              </div>
            )}
          </div>

          {/* Nút toggle dark/light mode đẹp */}
          <button
            onClick={() => setDark(!dark)}
            className={`ml-2 flex items-center px-3 py-2 rounded-full transition-colors duration-300 focus:outline-none shadow ${
              dark
                ? "bg-gray-800 text-yellow-400"
                : "bg-yellow-400 text-gray-800"
            }`}
            aria-label="Toggle dark mode"
          >
            {dark ? <DarkMode /> : <LightMode />}
            {dark ? "Dark" : "Light"}
          </button>
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded bg-white text-blue-600"
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </nav>
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
      {menuOpen && (
        <ul className="md:hidden bg-blue-600 dark:bg-gray-800 text-white dark:text-white px-6 py-4 space-y-2">
          <li>
            <Link
              to="/"
              className={`block py-2 transition-colors hover:text-orange-500 ${
                activeNavItem === "home"
                  ? "text-orange-500 font-bold"
                  : "text-white font-normal"
              }`}
            >
              {t("home")}
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`block py-2 transition-colors hover:text-orange-500 ${
                activeNavItem === "about"
                  ? "text-orange-500 font-bold"
                  : "text-white font-normal"
              }`}
            >
              {t("about")}
            </Link>
          </li>
          <li>
            <Link
              to="/todo"
              className={`block py-2  transition-colors hover:text-orange-500 ${
                activeNavItem === "todo"
                  ? "text-orange-500 font-bold"
                  : "text-white font-normal"
              }`}
            >
              {t("todo")}
            </Link>
          </li>
          <li>
            <Link
              to="/weather"
              className={`block py-2 transition-colors hover:text-orange-500 ${
                activeNavItem === "weather"
                  ? "text-orange-500 font-bold"
                  : "text-white font-normal"
              }`}
            >
              {t("weather")}
            </Link>
          </li>
          <li>
            <Link
              to="/ecommerce"
              className={`block py-2 transition-colors hover:text-orange-500 ${
                activeNavItem === "ecommerce"
                  ? "text-orange-500 font-bold"
                  : "text-white font-normal"
              }`}
            >
              {t("ecommerce")}
            </Link>
          </li>
          <li>
            <Link
              to="/template"
              className={`block py-2  transition-colors hover:text-orange-500 ${
                activeNavItem === "template"
                  ? "text-orange-500 font-bold"
                  : "text-white font-normal"
              }`}
            >
              {t("template")}
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`block py-2 transition-colors hover:text-orange-500 ${
                activeNavItem === "contact"
                  ? "text-orange-500 font-bold"
                  : "text-white font-normal"
              }`}
            >
              {t("contact")}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
