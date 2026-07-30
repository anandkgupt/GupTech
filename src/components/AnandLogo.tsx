import React from 'react';

interface AnandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  lightText?: boolean;
}

export const AnandLogo: React.FC<AnandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  lightText = true,
}) => {
  // Dimensions based on size
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const subtextSizes = {
    sm: 'text-[8px]',
    md: 'text-[10px]',
    lg: 'text-[11px]',
    xl: 'text-[12px]',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Shield & AA Data Monogram */}
      <div className={`relative shrink-0 ${iconSizes[size]} drop-shadow-[0_4px_12px_rgba(16,185,129,0.25)]`}>
        <svg
          viewBox="0 0 200 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Gradients matching logo */}
            <linearGradient id="shieldGrad" x1="20" y1="10" x2="180" y2="210" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            <linearGradient id="shieldBorder" x1="100" y1="0" x2="100" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            <linearGradient id="leftAGrad" x1="30" y1="50" x2="100" y2="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            <linearGradient id="rightAGrad" x1="90" y1="40" x2="170" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <linearGradient id="nodeLineGrad" x1="80" y1="140" x2="180" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Shield Outline Path */}
          <path
            d="M 100 12 L 175 42 C 175 125 140 180 100 205 C 60 180 25 125 25 42 L 100 12 Z"
            fill="url(#shieldGrad)"
            stroke="url(#shieldBorder)"
            strokeWidth="7"
            strokeLinejoin="round"
          />

          {/* Left 'A' (Deep Blue Metallic) */}
          <path
            d="M 42 165 L 78 60 L 104 60 L 122 118 L 105 118 L 91 78 L 62 165 Z"
            fill="url(#leftAGrad)"
          />
          {/* Crossbar Left A */}
          <path
            d="M 58 135 L 94 135 L 89 150 L 53 150 Z"
            fill="#1d4ed8"
          />

          {/* Right 'A' (Electric Green Data Flow) */}
          <path
            d="M 85 165 L 126 50 L 152 50 L 180 165 L 158 165 L 139 82 L 104 165 Z"
            fill="url(#rightAGrad)"
            filter="url(#glow)"
          />

          {/* Interconnected Data Nodes & Analytics Trendline */}
          <path
            d="M 88 152 L 115 118 L 138 132 L 182 72"
            stroke="url(#nodeLineGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Node Circles */}
          <circle cx="88" cy="152" r="7" fill="#10b981" stroke="#065f46" strokeWidth="2.5" />
          <circle cx="115" cy="118" r="7" fill="#34d399" stroke="#065f46" strokeWidth="2.5" />
          <circle cx="138" cy="132" r="7" fill="#10b981" stroke="#065f46" strokeWidth="2.5" />
          <circle cx="182" cy="72" r="8" fill="#a7f3d0" stroke="#047857" strokeWidth="3" filter="url(#glow)" />
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className={`font-display font-black tracking-tight ${textSizes[size]}`}>
            <span className="text-sky-500">Anand</span>{' '}
            <span className="text-emerald-400">Analyst</span>
          </div>
          <span
            className={`font-mono font-bold tracking-[0.22em] uppercase mt-0.5 ${
              lightText ? 'text-slate-400' : 'text-slate-600'
            } ${subtextSizes[size]}`}
          >
            INNOVATION &amp; DATA
          </span>
        </div>
      )}
    </div>
  );
};
