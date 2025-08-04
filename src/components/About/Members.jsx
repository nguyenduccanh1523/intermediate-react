import React from "react";
import avt1 from "../../assets/aboutus/avt1.png";
import avt2 from "../../assets/aboutus/avt2.webp";
import avt3 from "../../assets/aboutus/avt3.jpg";
import { useTranslation } from "react-i18next";
import vision from "../../assets/aboutus/vision.png";
import value from "../../assets/aboutus/value.png";
import integrity from "../../assets/aboutus/integrity.png";
import innovation from "../../assets/aboutus/innovation.png";
import customerCentric from "../../assets/aboutus/customer.png";
const Members = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className=" text-gray-900 dark:text-white py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">{t("members")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="text-center">
            <img
              src={avt1}
              alt="Duy"
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Ken Nguyen</h3>
            <p className="text-sm text-gray-400">CEO & Founder</p>
          </div>
          <div className="text-center">
            <img
              src={avt2}
              alt="Linh"
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Lucy Nguyen</h3>
            <p className="text-sm text-gray-400">UI/UX Designer</p>
          </div>
          <div className="text-center">
            <img
              src={avt3}
              alt="Thanh"
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Ocean Pham</h3>
            <p className="text-sm text-gray-400">Full-stack Developer</p>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white dark:bg-gradient-to-r dark:from-blue-700 dark:to-purple-700 py-16 px-4 rounded-lg shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <img src={vision} alt="Vision" className="w-24 h-24 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">{t("vision")}</h2>
          <p className="text-lg">{t("mission")}</p>
          <p className="text-lg">{t("visionDescription")}</p>
        </div>
      </section>

      <section className="py-16 mt-10 mb-10  text-gray-800 dark:text-white">
        <div className="max-w-5xl mx-auto text-center">
          <img
            src={value}
            alt="Core Values"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold mb-20">{t("coreValues")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img
                src={integrity}
                alt="Integrity"
                className="w-16 h-16 mx-auto mb-2"
              />
              <h3 className="text-xl font-semibold mb-2">{t("integrity")}</h3>
              <p className="text-sm">{t("integrityDescription")}</p>
            </div>
            <div>
              <img
                src={innovation}
                alt="Innovation"
                className="w-16 h-16 mx-auto mb-2"
              />
              <h3 className="text-xl font-semibold mb-2">{t("innovation")}</h3>
              <p className="text-sm">{t("innovationDescription")}</p>
            </div>
            <div>
              <img
                src={customerCentric}
                alt="Customer Centric"
                className="w-16 h-16 mx-auto mb-2"
              />
              <h3 className="text-xl font-semibold mb-2">
                {t("customerCentric")}
              </h3>
              <p className="text-sm">{t("customerCentricDescription")}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Members;
