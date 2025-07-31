/**
 * Utility function to handle asset paths for GitHub Pages deployment
 * This ensures that images and other assets load correctly both in development and production
 */

// Для GitHub Pages basePath будет автоматически добавлен Next.js
// Поэтому мы просто возвращаем путь как есть
const basePath = '';

export const getAssetPath = (path: string): string => {
  // Убираем ведущий слеш если он есть, чтобы избежать двойных слешей
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
};

export const getImagePath = (imagePath: string): string => {
  return getAssetPath(imagePath);
};

export const getVideoPath = (videoPath: string): string => {
  return getAssetPath(videoPath);
};
