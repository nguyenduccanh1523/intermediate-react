import React from "react";
import { useTranslation } from "react-i18next";
import cta from "../../assets/icons/cta.png";

const CTA = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="mt-20 mb-10 bg-gradient-to-r from-orange-500 to-gray-500 text-white py-16 px-4 text-center dark:from-orange-900 dark:to-gray-900">
        <img
          src={cta}
          className="w-16 h-16 mx-auto mb-4"
          alt="Call to Action Icon"
        />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("cta")}</h2>
        <p className="max-w-2xl mx-auto text-lg">{t("desCta")}</p>

        <div className="mt-8 max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">
            {t("ctaForm")}
          </h3>
          <form className="space-y-5">
            <div>
              <label className="block mb-1 font-medium">{t("name")}</label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">{t("email")}</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">{t("phone")}</label>
              <input
                type="tel"
                placeholder="0901234567"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold py-2 rounded"
              >
                {t("submit")}
              </button>
            </div>
          </form>
          <p className="text-sm mt-4 text-center text-gray-400">
            {t("contactInfo")}
          </p>
        </div>
      </section>
    </>
  );
};

export default CTA;
