'use client';

import React from "react";
import { useLanguage } from "@/components/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div className="flex border border-[#7042f861] bg-[#0300145e] rounded-full overflow-hidden">
      <button
        className={`px-3 py-1 text-sm transition-all duration-200 ${
          language === "ru" 
            ? "bg-purple-600 text-white" 
            : "text-gray-300 hover:text-purple-400"
        }`}
        onClick={() => setLanguage("ru")}
      >
        RU
      </button>
      <button
        className={`px-3 py-1 text-sm transition-all duration-200 ${
          language === "en" 
            ? "bg-purple-600 text-white" 
            : "text-gray-300 hover:text-purple-400"
        }`}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
