
import React, { useState, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { ImageEditState } from '../types';

interface ImageEditorProps {
  onImageChange: (newImage: string | null) => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ onImageChange }) => {
  const [state, setState] = useState<ImageEditState>({
    originalImage: null,
    editedImage: null,
    isProcessing: false,
    error: null
  });
  const [prompt, setPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setState(prev => ({ ...prev, originalImage: base64, editedImage: null, error: null }));
        onImageChange(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!state.originalImage || !prompt) return;

    setState(prev => ({ ...prev, isProcessing: true, error: null }));
    try {
      const result = await geminiService.editImage(state.originalImage, prompt);
      setState(prev => ({ ...prev, editedImage: result, isProcessing: false }));
      onImageChange(result);
    } catch (err) {
      setState(prev => ({ ...prev, error: "Failed to edit image. Check your API Key.", isProcessing: false }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <i className="fa-solid fa-wand-magic-sparkles text-blue-600"></i>
        AI Flyer Decoration
      </h3>
      
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-600">1. Upload Base Image/Logo</label>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        {state.originalImage && (
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">2. Describe AI Edits (e.g. "Add a retro filter", "Add a golden frame")</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter edit prompt..."
                  className="flex-grow p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button 
                  onClick={handleEdit}
                  disabled={state.isProcessing || !prompt}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition-all"
                >
                  {state.isProcessing ? (
                    <i className="fa-solid fa-spinner animate-spin"></i>
                  ) : (
                    <i className="fa-solid fa-bolt"></i>
                  )}
                  {state.isProcessing ? 'Editing...' : 'Apply AI'}
                </button>
              </div>
            </div>
            
            {state.error && (
              <p className="text-red-500 text-sm italic">{state.error}</p>
            )}
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <p className="text-xs uppercase font-bold text-gray-400">Current</p>
                    <img src={state.editedImage || state.originalImage} className="w-full h-32 object-contain bg-gray-50 rounded border border-gray-100" />
                </div>
                <div className="flex flex-col justify-center">
                    <button 
                      onClick={() => {
                        setState(prev => ({ ...prev, originalImage: null, editedImage: null }));
                        onImageChange(null);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm font-bold flex items-center gap-2"
                    >
                        <i className="fa-solid fa-trash"></i>
                        Clear Image
                    </button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageEditor;
