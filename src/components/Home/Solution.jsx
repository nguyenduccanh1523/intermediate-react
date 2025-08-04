import { useTranslation } from "react-i18next";
import todolist from "../../assets/icons/todolist.png";
import weatherApp from "../../assets/icons/weather.png";
import ecommerceWebsite from "../../assets/icons/ecommerce.png";
import templateWebsite from "../../assets/icons/templete.png";

const Solution = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-20 py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-center text-orange-600 mb-2 dark:text-orange-400">
        {t('solution')}
      </h2>
      <h1 className="text-3xl font-bold text-center mb-12 text-red-600 dark:text-red-400">
        {t('solutionTitle')}
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Bên trái */}
        <div className="space-y-10">
          <div>
            <img src={todolist} className="w-10 h-10 mb-2" alt="" />
            <h3 className="font-semibold text-lg dark:text-white">{t('todoList')}</h3>
            <p className="text-sm mt-2 dark:text-gray-300">
              {t('desTodoList')}
            </p>
          </div>
          <div>
            <img src={weatherApp} className="w-10 h-10 mb-2" alt="" />
            <h3 className="font-semibold text-lg dark:text-white">{t('weatherApp')}</h3>
            <p className="text-sm mt-2 dark:text-gray-300">
              {t('desWeatherApp')}
            </p>
          </div>
        </div>

        {/* Bên phải */}
        <div className="space-y-10">
          <div>
            <img src={ecommerceWebsite} className="w-10 h-10 mb-2" alt="" />
            <h3 className="font-semibold text-lg dark:text-white">{t('ecommerceWebsite')}</h3>
            <p className="text-sm mt-2 dark:text-gray-300">
              {t('desEcommerceWebsite')}
            </p>
          </div>
          <div>
            <img src={templateWebsite} className="w-10 h-10 mb-2" alt="" />
            <h3 className="font-semibold text-lg dark:text-white">{t('templateWebsite')}</h3>
            <p className="text-sm mt-2 dark:text-gray-300">
              {t('desTemplateWebsite')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solution;