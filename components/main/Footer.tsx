'use client';

import React from "react";
import { SiGmail } from "react-icons/si";

import { useLanguage } from "@/components/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <div className="w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px] ">
        <div className="w-full flex flex-col items-center justify-center m-auto">
            <div className="w-full h-full flex flex-row items-center justify-center">
                <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
                    <p className="flex flex-row items-center my-[15px] cursor-pointer">
                        <a href="mailto:aporaartema@gmail.com" className="flex flex-row items-center hover:text-red-400 transition-colors">
                          <SiGmail className="text-[20px]" />
                          <span className="text-[15px] ml-[6px]">aporaartema@gmail.com</span>
                        </a>
                    </p>
                </div>
            </div>

            <div className="mb-[20px] text-[15px] text-center">
                &copy; Артем lovly Dev {new Date().getFullYear()} Inc. {t.copyright}
            </div>
        </div>
    </div>
  )
}

export default Footer