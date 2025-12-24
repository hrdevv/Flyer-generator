
import React, { useState, useCallback, useRef } from 'react';
import FlyerPreview from './components/FlyerPreview';
import ImageEditor from './components/ImageEditor';
import { DEFAULT_FLYER_DATA, DEFAULT_THEME } from './constants';
import { ThemeColors } from './types';
import * as htmlToImage from 'html-to-image';

const App: React.FC = () => {
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeColors>(DEFAULT_THEME);
  const [isExporting, setIsExporting] = useState(false);
  
  const flyerRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPng = useCallback(async () => {
    const node = document.getElementById('flyer-content');
    if (!node) return;

    setIsExporting(true);
    try {
      // Generate a high-resolution PNG (3x scale for print quality)
      const dataUrl = await htmlToImage.toPng(node, {
        pixelRatio: 3,
        skipFonts: false,
        backgroundColor: theme.bg,
      });

      const link = document.createElement('a');
      link.download = `grant-scheme-flyer-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('oops, something went wrong!', error);
      alert('Failed to export image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }, [theme.bg]);

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBgImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const updateTheme = (key: keyof ThemeColors, value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar Controls */}
      <div className="lg:w-[400px] bg-white border-r border-gray-200 p-8 space-y-8 flex-shrink-0 lg:fixed lg:h-screen overflow-y-auto z-10 print:hidden">
        <header className="space-y-2">
            <div className="flex items-center gap-3">
                <div className="bg-blue-900 text-white p-3 rounded-lg shadow-lg">
                    <i className="fa-solid fa-palette text-2xl"></i>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-blue-950 leading-tight">DESIGN STUDIO</h1>
                  <p className="text-gray-500 text-xs italic font-medium">Professional Flyer Customizer</p>
                </div>
            </div>
        </header>

        <section className="space-y-8">
          {/* Color Customizer */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
              <i className="fa-solid fa-fill-drip text-blue-600"></i>
              Theme Palette
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500">Heading Color</label>
                <div className="flex items-center gap-2 p-2 border rounded-lg">
                  <input 
                    type="color" 
                    value={theme.heading} 
                    onChange={(e) => updateTheme('heading', e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                  <span className="text-xs font-mono">{theme.heading}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500">Accent Color</label>
                <div className="flex items-center gap-2 p-2 border rounded-lg">
                  <input 
                    type="color" 
                    value={theme.accent} 
                    onChange={(e) => updateTheme('accent', e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                  <span className="text-xs font-mono">{theme.accent}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500">Background</label>
                <div className="flex items-center gap-2 p-2 border rounded-lg">
                  <input 
                    type="color" 
                    value={theme.bg} 
                    onChange={(e) => updateTheme('bg', e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                  <span className="text-xs font-mono">{theme.bg}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500">Text Color</label>
                <div className="flex items-center gap-2 p-2 border rounded-lg">
                  <input 
                    type="color" 
                    value={theme.text} 
                    onChange={(e) => updateTheme('text', e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                  <span className="text-xs font-mono">{theme.text}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Background Image Uploader */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest flex items-center gap-2">
              <i className="fa-solid fa-image text-blue-600"></i>
              Flyer Background
            </h3>
            <div className="space-y-3">
              <input 
                type="file" 
                onChange={handleBgUpload} 
                accept="image/*"
                className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
              />
              {bgImage && (
                <button 
                  onClick={() => setBgImage(null)}
                  className="text-red-500 text-[10px] font-bold uppercase tracking-tighter hover:underline"
                >
                  Remove Background Image
                </button>
              )}
            </div>
          </div>

          {/* Logo/AI Decoration Uploader */}
          <ImageEditor onImageChange={setLogoImage} />

          <div className="space-y-4 pt-6 border-t border-gray-100">
             <div className="grid grid-cols-1 gap-3">
               <button 
                  onClick={handleExportPng}
                  disabled={isExporting}
                  className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
               >
                  {isExporting ? (
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  ) : (
                    <i className="fa-solid fa-file-image"></i>
                  )}
                  {isExporting ? 'GENERATING PNG...' : 'DOWNLOAD PNG (HD)'}
               </button>
               
               <button 
                  onClick={handlePrint}
                  className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-all shadow-lg flex items-center justify-center gap-3"
               >
                  <i className="fa-solid fa-print"></i>
                  PRINT / SAVE PDF
               </button>
             </div>
             
             <div className="flex items-center justify-center gap-4 opacity-30">
                <div className="h-px w-8 bg-gray-400"></div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">High Res Output</p>
                <div className="h-px w-8 bg-gray-400"></div>
             </div>
          </div>
        </section>

        <footer className="pt-8 text-gray-300 text-[10px] uppercase font-bold tracking-widest text-center">
            Professional Studio Tool v2.1
        </footer>
      </div>

      {/* Main Content (Flyer Display) */}
      <div className="flex-grow flex justify-center p-4 md:p-12 lg:ml-[400px] overflow-x-hidden min-h-screen bg-gray-200">
        <div className="print:m-0 print:p-0 w-full max-w-[800px]" ref={flyerRef}>
          <FlyerPreview 
            data={DEFAULT_FLYER_DATA} 
            logo={logoImage} 
            bgImage={bgImage}
            theme={theme}
          />
        </div>
      </div>

      {/* Loading Overlay */}
      {isExporting && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-xl font-black text-gray-800">Processing HD Render</h2>
            <p className="text-gray-500 text-sm">Optimizing flyer elements for print quality...</p>
          </div>
        </div>
      )}

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body { background: white !important; margin: 0; padding: 0; }
          .lg\\:ml-\\[400px\\] { margin-left: 0 !important; }
          .print\\:hidden { display: none !important; }
          #root { background: white !important; }
          .min-h-screen { min-height: auto !important; }
          #flyer-content { 
            box-shadow: none !important; 
            margin: 0 !important; 
            width: 100% !important; 
            max-width: none !important; 
            border-radius: 0 !important;
            border-top-width: 15px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
