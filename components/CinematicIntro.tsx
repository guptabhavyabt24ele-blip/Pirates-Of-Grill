'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('Igniting Charcoal Pits across the Seven Seas...');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 600);
          return 100;
        }
        const next = prev + 2;
        if (next > 25 && next < 55) setStepText('Rendering 3D Blender Barbecue Mesh & Sizzling Skewers...');
        if (next >= 55 && next < 85) setStepText('Unearthing Pirate Gold, Rum Barrels & Spiced Marinades...');
        if (next >= 85) setStepText('Welcome aboard, Captain. Setting sail...');
        return next;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Canvas 3D rotating Blender-style animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Glowing ember particles
    const embers = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 200,
      radius: Math.random() * 3.5 + 1,
      speedY: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.9 + 0.1,
      color: Math.random() > 0.3 ? '#ea580c' : '#f59e0b'
    }));

    let rotationAngle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Atmospheric radial gradient
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, width / 1.1);
      bgGrad.addColorStop(0, 'rgba(234, 88, 12, 0.22)');
      bgGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.85)');
      bgGrad.addColorStop(1, '#090a0f');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render Embers
      embers.forEach(e => {
        e.y -= e.speedY;
        e.x += e.speedX + Math.sin(e.y * 0.015) * 0.6;
        if (e.y < -20) {
          e.y = height + 20;
          e.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fillStyle = e.color;
        ctx.globalAlpha = e.opacity;
        ctx.shadowBlur = 15;
        ctx.shadowColor = e.color;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      });

      // Render 3D Blender-style Rotating Pirate Grill Wheel
      ctx.save();
      ctx.translate(width / 2, height / 2 - 50);
      rotationAngle += 0.012;
      ctx.rotate(rotationAngle);

      // Outer rim
      ctx.beginPath();
      ctx.arc(0, 0, 130, 0, Math.PI * 2);
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 8;
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#ea580c';
      ctx.stroke();

      // Inner glowing grill grate
      ctx.beginPath();
      ctx.arc(0, 0, 95, 0, Math.PI * 2);
      ctx.fillStyle = '#12141c';
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Spokes
      for (let i = 0; i < 8; i++) {
        const rad = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(rad) * 130, Math.sin(rad) * 130);
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 5;
        ctx.stroke();
      }

      // Center core flame
      ctx.beginPath();
      ctx.arc(0, 0, 28, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.shadowBlur = 40;
      ctx.shadowColor = '#f97316';
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#090a0f] flex flex-col items-center justify-center p-6">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-8 relative z-10 bg-zinc-950/80 p-8 sm:p-12 rounded-3xl border border-orange-500/30 backdrop-blur-2xl shadow-2xl shadow-orange-950/60">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-600/20 border border-orange-500/40 text-orange-400 font-mono text-xs uppercase tracking-widest animate-pulse">
          <span>🏴‍☠️ Blender 3D Barbecue Engine</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase drop-shadow-[0_15px_30px_rgba(234,88,12,0.6)]">
            Pirates <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 bg-clip-text text-transparent">of Grill</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 tracking-wider">
            {stepText}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-900 rounded-full h-3 overflow-hidden border border-zinc-800">
          <div
            className="bg-gradient-to-r from-orange-600 to-amber-500 h-3 rounded-full transition-all duration-150 shadow-[0_0_15px_rgba(234,88,12,0.9)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-500">{progress}% Initialized</span>
          <button
            onClick={onComplete}
            className="px-6 py-2.5 rounded-xl bg-orange-600/20 hover:bg-orange-600 text-orange-300 hover:text-white text-xs font-bold uppercase tracking-wider border border-orange-500/40 transition-all duration-300 cursor-pointer shadow-lg"
          >
            Skip Intro ⚡
          </button>
        </div>
      </div>
    </div>
  );
}
