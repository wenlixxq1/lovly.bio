/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

// Имя репозитория будет передаваться из GitHub Actions.
// NEXT_PUBLIC_ делает переменную доступной и на клиенте.
const repositoryName = process.env.NEXT_PUBLIC_REPOSITORY_NAME || '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Устанавливаем префикс для путей на страницах (для Link) и для ассетов (картинки, css, js).
  // Это ключевое исправление для GitHub Pages.
  basePath: isProd ? `/${repositoryName}` : '',
  assetPrefix: isProd ? `/${repositoryName}/` : '',
};

module.exports = nextConfig;
