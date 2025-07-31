'use client';

import React, { useEffect, useRef } from 'react';

interface Meteor {
  x: number;
  y: number;
  vx: number; // скорость по X
  vy: number; // скорость по Y
  size: number;
  mass: number;
  trail: Array<{ x: number; y: number; opacity: number }>;
  life: number;
  maxLife: number;
  color: {
    r: number;
    g: number;
    b: number;
  };
  temperature: number; // для изменения цвета при нагреве
}

const Meteors = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meteorsRef = useRef<Meteor[]>([]);
  const animationRef = useRef<number>();

  // Физические константы
  const GRAVITY = 0.1;
  const AIR_RESISTANCE = 0.99;
  const SPAWN_RATE = 0.02; // вероятность появления метеора за кадр
  const MAX_METEORS = 15;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Настройка размера canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Создание нового метеора
    const createMeteor = (): Meteor => {
      const spawnSide = Math.random();
      let x, y, vx, vy;

      if (spawnSide < 0.7) {
        // Появляется сверху (70% случаев)
        x = Math.random() * canvas.width;
        y = -50;
        vx = (Math.random() - 0.5) * 8; // случайная горизонтальная скорость
        vy = Math.random() * 3 + 2; // падение вниз
      } else if (spawnSide < 0.85) {
        // Появляется слева (15% случаев)
        x = -50;
        y = Math.random() * canvas.height * 0.5; // только верхняя половина
        vx = Math.random() * 4 + 3; // движение вправо
        vy = Math.random() * 2 + 1; // небольшое падение
      } else {
        // Появляется справа (15% случаев)
        x = canvas.width + 50;
        y = Math.random() * canvas.height * 0.5;
        vx = -(Math.random() * 4 + 3); // движение влево
        vy = Math.random() * 2 + 1;
      }

      const size = Math.random() * 4 + 2;
      const mass = size * 0.5;

      return {
        x,
        y,
        vx,
        vy,
        size,
        mass,
        trail: [],
        life: 1,
        maxLife: Math.random() * 300 + 200,
        color: {
          r: 255,
          g: Math.random() * 100 + 155, // 155-255
          b: Math.random() * 50 + 50,   // 50-100
        },
        temperature: Math.random() * 0.5 + 0.5, // 0.5-1.0
      };
    };

    // Обновление физики метеора
    const updateMeteor = (meteor: Meteor) => {
      // Применяем гравитацию
      meteor.vy += GRAVITY * meteor.mass;

      // Применяем сопротивление воздуха
      meteor.vx *= AIR_RESISTANCE;
      meteor.vy *= AIR_RESISTANCE;

      // Обновляем позицию
      meteor.x += meteor.vx;
      meteor.y += meteor.vy;

      // Добавляем точку в след
      meteor.trail.push({
        x: meteor.x,
        y: meteor.y,
        opacity: meteor.life,
      });

      // Ограничиваем длину следа
      if (meteor.trail.length > 20) {
        meteor.trail.shift();
      }

      // Уменьшаем время жизни
      meteor.life -= 1 / meteor.maxLife;

      // Изменяем температуру (цвет) в зависимости от скорости
      const speed = Math.sqrt(meteor.vx * meteor.vx + meteor.vy * meteor.vy);
      meteor.temperature = Math.min(1, speed * 0.1);

      // Обновляем цвет в зависимости от температуры
      if (meteor.temperature > 0.8) {
        // Очень горячий - белый/голубой
        meteor.color.r = 255;
        meteor.color.g = 255;
        meteor.color.b = 255;
      } else if (meteor.temperature > 0.6) {
        // Горячий - желто-белый
        meteor.color.r = 255;
        meteor.color.g = 255;
        meteor.color.b = Math.floor(100 + meteor.temperature * 155);
      } else if (meteor.temperature > 0.4) {
        // Средний - оранжевый
        meteor.color.r = 255;
        meteor.color.g = Math.floor(100 + meteor.temperature * 155);
        meteor.color.b = 50;
      } else {
        // Холодный - красный
        meteor.color.r = 255;
        meteor.color.g = Math.floor(50 + meteor.temperature * 100);
        meteor.color.b = 50;
      }
    };

    // Отрисовка метеора
    const drawMeteor = (meteor: Meteor) => {
      // Рисуем след
      meteor.trail.forEach((point, index) => {
        const trailOpacity = (index / meteor.trail.length) * meteor.life * 0.6;
        const trailSize = meteor.size * (index / meteor.trail.length) * 0.5;

        if (trailOpacity > 0.01) {
          ctx.globalAlpha = trailOpacity;
          ctx.fillStyle = `rgb(${meteor.color.r}, ${meteor.color.g}, ${meteor.color.b})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Рисуем основной метеор
      ctx.globalAlpha = meteor.life;

      // Внешнее свечение
      const gradient = ctx.createRadialGradient(
        meteor.x, meteor.y, 0,
        meteor.x, meteor.y, meteor.size * 3
      );
      gradient.addColorStop(0, `rgba(${meteor.color.r}, ${meteor.color.g}, ${meteor.color.b}, ${meteor.life})`);
      gradient.addColorStop(0.4, `rgba(${meteor.color.r}, ${meteor.color.g}, ${meteor.color.b}, ${meteor.life * 0.6})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(meteor.x, meteor.y, meteor.size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Ядро метеора
      ctx.fillStyle = `rgb(${Math.min(255, meteor.color.r + 50)}, ${Math.min(255, meteor.color.g + 50)}, ${Math.min(255, meteor.color.b + 50)})`;
      ctx.beginPath();
      ctx.arc(meteor.x, meteor.y, meteor.size, 0, Math.PI * 2);
      ctx.fill();

      // Яркая точка в центре для очень горячих метеоров
      if (meteor.temperature > 0.7) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, meteor.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Основной цикл анимации
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Создаем новые метеоры
      if (Math.random() < SPAWN_RATE && meteorsRef.current.length < MAX_METEORS) {
        meteorsRef.current.push(createMeteor());
      }

      // Обновляем и рисуем метеоры
      meteorsRef.current = meteorsRef.current.filter(meteor => {
        updateMeteor(meteor);
        drawMeteor(meteor);

        // Удаляем метеоры, которые вышли за границы или закончили жизнь
        return (
          meteor.life > 0 &&
          meteor.x > -100 &&
          meteor.x < canvas.width + 100 &&
          meteor.y > -100 &&
          meteor.y < canvas.height + 100
        );
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default Meteors;