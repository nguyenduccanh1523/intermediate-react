import React from "react";
import whyus from "../../assets/icons/whyus.png";
import { useTranslation } from "react-i18next";

const WhyUs = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-40 text-center py-16 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white dark:from-indigo-900 dark:to-indigo-500 dark:text-white">
      <img src={whyus} className="w-16 h-16 mx-auto mb-4 rounded-full" alt="Why Us Icon" />
      <h2 className="text-2xl font-bold mb-4">{t("whyUs")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
        <div>
          <h3 className="font-semibold text-lg mb-2">{t("why1")}</h3>
          <p>{t("desWhy1")}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{t("why2")}</h3>
          <p>{t("desWhy2")}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{t("why3")}</h3>
          <p>{t("desWhy3")}</p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
