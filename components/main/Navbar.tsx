"use client";
import { Socials } from "@/constants";
import Image from "next/image";
import React from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageContext";
import { getImagePath } from "@/utils/paths";

const Navbar = () => {
  const { t } = useLanguage();
  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        {/* Левая часть - Логотип и название */}
        <a
          href="#about-me"
          className="h-auto w-auto flex flex-row items-center"
        >
          <Image
            src={getImagePath("/NavLogo.png")}
            alt={t.logo}
            width={70}
            height={70}
            className="cursor-pointer hover:animate-slowspin"
          />
          <span className="font-bold ml-[10px] hidden md:block text-gray-300">
            lovly Dev
          </span>
        </a>

        {/* Центральная часть - Навигация */}
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-between h-auto border border-[#7042f861] bg-[#0300145e] px-[30px] py-[10px] rounded-full text-gray-200 gap-8">
            <a href="#about-me" className="cursor-pointer hover:text-purple-400 transition-colors">
              {t.about_me}
            </a>
            <a href="#skills" className="cursor-pointer hover:text-purple-400 transition-colors">
              {t.skills}
            </a>
            <a href="#projects" className="cursor-pointer hover:text-purple-400 transition-colors">
              {t.projects}
            </a>
          </div>
        </div>

        {/* Правая часть - Социальные сети и переключатель языка */}
        <div className="flex flex-row gap-3 items-center">
          {Socials.map((social) => (
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              key={social.name}
              className="hover:scale-110 transition-transform duration-200"
            >
              <Image
                src={getImagePath(social.src)}
                alt={social.name}
                width={20}
                height={20}
                className="cursor-pointer opacity-80 hover:opacity-100"
              />
            </a>
          ))}
          <div className="ml-2">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
