import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import mr from "./locales/mr.json";
import hi from "./locales/hi.json"; 
import sa from "./locales/sa.json"; 
import gu from "./locales/gu.json"; // <-- add Gujarati

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      mr: { translation: mr },
      hi: { translation: hi },  
      sa: { translation: sa },   
      gu: { translation: gu } // <-- add here
    },
    lng: localStorage.getItem("lang") || "hi",  // default to Hindi if not set
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;