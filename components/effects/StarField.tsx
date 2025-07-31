'use client';

import React, { useEffect, useRef } from 'react';

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Создаем звезды
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      twinkleSpeed: number;
      color: string;
    }> = [];

    const colors = ['#ffffff', '#b3d9ff', '#ffffcc', '#ffcccc', '#ccffcc'];

    // Генерируем звезды
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      stars.forEach((star, index) => {
        // Мерцание звезд
        const twinkle = Math.sin(time * star.twinkleSpeed * 100 + index) * 0.3 + 0.7;
        
        // Медленное движение звезд
        star.x += star.speed * 0.1;
        star.y += Math.sin(time + index) * 0.1;

        // Перемещение звезды обратно, если она вышла за границы
        if (star.x > canvas.width) star.x = -5;
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;

        // Рисуем звезду
        ctx.save();
        ctx.globalAlpha = star.opacity * twinkle;
        ctx.fillStyle = star.color;
        
        // Основная звезда
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Крестообразные лучи для ярких звезд
        if (star.size > 1.5) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = star.opacity * twinkle * 0.6;
          
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2, star.y);
          ctx.lineTo(star.x + star.size * 2, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2);
          ctx.lineTo(star.x, star.y + star.size * 2);
          ctx.stroke();
        }

        // Дополнительное свечение для больших звезд
        if (star.size > 1.8) {
          ctx.globalAlpha = star.opacity * twinkle * 0.3;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'radial-gradient(ellipse at center, rgba(0,0,50,0.8) 0%, rgba(0,0,0,0.9) 100%)',
      }}
    />
  );
};

export default StarField;