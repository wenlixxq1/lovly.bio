'use client';

import React from "react";
import ProjectCard from "../sub/ProjectCard";
import { useLanguage } from "@/components/LanguageContext";

const Projects = () => {
  const { t } = useLanguage();
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      id="projects"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        {t.my_projects}
      </h1>
      <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10 items-center justify-center">
        <span className="text-[80px] font-extrabold text-white opacity-60 select-none">{t.soon}</span>
      </div>
    </div>
  );
};

export default Projects;
