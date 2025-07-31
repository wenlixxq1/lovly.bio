type SkillItem = { skill_name: string; Image: string; width: number; height: number };
type SocialItem = { name: string; src: string; url: string };

const SKILLS = {
  HTML: { skill_name: "Html 5", Image: "/html.png", width: 80, height: 80 },
  CSS: { skill_name: "Css", Image: "/css.png", width: 80, height: 80 },
  NODE_JS: { skill_name: "Node js", Image: "/node-js.png", width: 80, height: 80 },
  TYPESCRIPT: { skill_name: "Type Script", Image: "/ts.png", width: 80, height: 80 },
  PYTHON: { skill_name: "Python", Image: "/python.svg", width: 80, height: 80 },
  REACT: { skill_name: "React", Image: "/react.png", width: 80, height: 80 },
} as const;

export const Skill_data: SkillItem[] = [
  SKILLS.HTML,
  SKILLS.CSS,
  SKILLS.NODE_JS,
  SKILLS.TYPESCRIPT,
  SKILLS.PYTHON,
  SKILLS.REACT,
];

export const Socials: SocialItem[] = [
  {
    name: "Telegram",
    src: "/telegram.svg",
    url: "https://t.me/lovlyher"
  },
  {
    name: "GitHub",
    src: "/github-142-svgrepo-com.svg",
    url: "https://github.com/wenlixxq1"
  },
  {
    name: "TikTok",
    src: "/tiktok.svg",
    url: "https://tiktok.com/@whylovlygod"
  },
  {
    name: "YouTube",
    src: "/youtube-svgrepo-com.svg",
    url: "https://youtube.com/@yourchannelname"
  },
];

export const Frontend_skill: SkillItem[] = [
  SKILLS.HTML,
  SKILLS.CSS,
  SKILLS.TYPESCRIPT,
  SKILLS.REACT,
];

export const Backend_skill: SkillItem[] = [
  SKILLS.NODE_JS,
  SKILLS.PYTHON,
];

export const Full_stack: SkillItem[] = [
  SKILLS.REACT,
  SKILLS.NODE_JS,
  SKILLS.PYTHON,
];

export const Other_skill: SkillItem[] = [];