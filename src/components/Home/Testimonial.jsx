import React from "react";
import { useTranslation } from "react-i18next";
import feedback from "../../assets/icons/feedback.png";

const Testimonial = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-20 text-black py-12">
      <img src={feedback} className="w-16 h-16 mx-auto mb-4" alt="Feedback Icon" />
      <h2 className="text-center text-2xl font-bold mb-8 dark:text-white">
        {t("testimonial")}
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-6 max-w-5xl mx-auto">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
          <p>
            "{t("test1")}"
          </p>
          <p className="mt-2 font-semibold">– {t("man")} Huy, CTO ABC Co.</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
          <p>"{t("test2")}"</p>
          <p className="mt-2 font-semibold">– {t("woman")} Mai, Freelancer</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
