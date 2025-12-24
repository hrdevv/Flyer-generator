
import React from 'react';
import { FlyerData, ThemeColors } from '../types';

interface FlyerPreviewProps {
  data: FlyerData;
  logo?: string | null;
  bgImage?: string | null;
  theme: ThemeColors;
}

const FlyerPreview: React.FC<FlyerPreviewProps> = ({ data, logo, bgImage, theme }) => {
  return (
    <div 
      id="flyer-content" 
      className="max-w-[800px] mx-auto shadow-2xl overflow-hidden font-serif border-t-8 transition-colors duration-500"
      style={{ 
        backgroundColor: theme.bg, 
        borderColor: theme.heading,
        color: theme.text,
        position: 'relative'
      }}
    >
      {/* Background Image Layer */}
      {bgImage && (
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none z-0" 
          style={{ 
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}

      {/* 1. WHITE SPACE TOP (Enough for Logo) */}
      <div className="h-56 flex items-center justify-center relative z-10">
        {logo ? (
          <img 
            src={logo} 
            alt="Logo" 
            className="max-h-40 object-contain drop-shadow-md" 
          />
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-300 text-sm uppercase tracking-widest font-sans">
            Logo Space
          </div>
        )}
      </div>

      <div className="px-12 py-8 space-y-10 text-center relative z-10">
        {/* 2. Heading Section */}
        <div className="space-y-3">
          <h1 
            className="text-7xl font-black tracking-tighter uppercase drop-shadow-sm leading-none"
            style={{ color: theme.heading }}
          >
            {data.heading}
          </h1>
          <p className="text-xl italic font-medium opacity-90" style={{ color: theme.accent }}>
            {data.tagline}
          </p>
        </div>

        {/* 4. $43.7bn Hero Section */}
        <div 
          className="py-10 rounded-3xl border-2 relative overflow-hidden transition-all"
          style={{ backgroundColor: `${theme.accent}10`, borderColor: `${theme.accent}30` }}
        >
            <div className="absolute top-0 right-0 p-6 opacity-10">
                <i className="fa-solid fa-landmark text-9xl"></i>
            </div>
            <div className="relative z-10">
                <span className="text-8xl font-bold block mb-2 leading-none" style={{ color: theme.heading }}>
                  {data.amount}
                </span>
                <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: theme.accent }}>
                  {data.subHeading}
                </h2>
            </div>
        </div>

        {/* 5. Paragraphs - Improved Legibility */}
        <div className="space-y-8 max-w-2xl mx-auto">
          <p 
            className="text-2xl font-bold border-b-2 pb-6 leading-snug"
            style={{ color: theme.heading, borderColor: `${theme.accent}20` }}
          >
            {data.description}
          </p>
          <p className="text-lg text-justify leading-relaxed font-medium">
            {data.terms}
          </p>
        </div>

        {/* 6. Grant Funding Tiers */}
        <div className="space-y-8">
          <div className="flex items-center justify-center gap-6">
            <div className="h-0.5 flex-grow" style={{ backgroundColor: `${theme.accent}20` }}></div>
            <h3 className="text-3xl font-black uppercase tracking-tight" style={{ color: theme.heading }}>
              Grant Funding Tiers
            </h3>
            <div className="h-0.5 flex-grow" style={{ backgroundColor: `${theme.accent}20` }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            {data.tiers.map((tier, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-5 border rounded-2xl transition-all hover:scale-[1.02]"
                style={{ 
                  backgroundColor: theme.bg, 
                  borderColor: `${theme.accent}20`,
                  boxShadow: `0 4px 6px -1px ${theme.accent}10`
                }}
              >
                <div className="flex items-center gap-4">
                    <span 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white"
                      style={{ backgroundColor: theme.heading }}
                    >
                        {idx + 1}
                    </span>
                    <span className="font-mono text-xl font-bold">Pay <span className="text-red-600">{tier.pay}</span></span>
                </div>
                <i className="fa-solid fa-chevron-right opacity-30"></i>
                <span className="font-mono text-xl font-bold text-green-700">get {tier.receive}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Footer Area */}
        <div className="pt-16 space-y-8 border-t" style={{ borderColor: `${theme.accent}10` }}>
          {/* Final Disbursement (Red Area) */}
          <div className="bg-red-50 p-8 rounded-2xl border-2 border-red-100 shadow-sm">
            <p className="text-red-600 font-black text-center text-xl leading-tight">
                <i className="fa-solid fa-circle-check mr-3"></i>
                {data.disbursement.toUpperCase()}
            </p>
          </div>

          {/* Animated Icons */}
          <div className="flex justify-center gap-12 py-4">
            <i className="fa-solid fa-shield-halved text-5xl animate-pulse" style={{ color: `${theme.accent}40` }}></i>
            <i className="fa-solid fa-truck-fast text-5xl animate-bounce" style={{ color: `${theme.accent}40` }}></i>
            <i className="fa-solid fa-certificate text-5xl animate-pulse" style={{ color: `${theme.accent}40` }}></i>
          </div>

          {/* 8. Contact Info */}
          <div 
            className="text-center py-6 px-12 rounded-2xl shadow-xl transition-all"
            style={{ backgroundColor: theme.heading }}
          >
            <p className="text-xl font-black tracking-widest text-white">
               <i className="fa-solid fa-comment-sms mr-4 animate-pulse"></i>
               {data.contact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyerPreview;
