import React, { useEffect } from 'react';
import type { Channel, Prediction } from '../types';
import { SpinnerIcon, CloseIcon, SparkleIcon } from './icons';

interface PredictionModalProps {
  channel: Channel;
  prediction: Prediction | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
}

const PredictionModal: React.FC<PredictionModalProps> = ({
  channel,
  prediction,
  isLoading,
  error,
  onClose
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="prediction-modal-title"
    >
      <div
        className="bg-slate-800/80 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close prediction modal"
        >
          <CloseIcon />
        </button>

        <div className="text-center mb-6">
            <p className="text-sm text-sky-400 font-semibold">Prediction for:</p>
            <h2 id="prediction-modal-title" className="text-3xl font-bold text-white">
              {channel.title}
            </h2>
        </div>
        
        <div className="min-h-[150px] flex flex-col items-center justify-center">
            {isLoading && (
                <div className="text-center">
                    <SpinnerIcon className="h-10 w-10 text-sky-400 mx-auto" />
                    <p className="mt-4 text-slate-300">Gemini is predicting the next upload...</p>
                </div>
            )}
            {error && (
                <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-lg">
                    <p className="font-semibold">Prediction Failed</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}
            {prediction && (
                <div className="w-full text-left animate-fade-in">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-sky-400 mb-2 flex items-center gap-2">
                            <SparkleIcon />
                            Predicted Next Upload
                        </h3>
                        <h4 className="text-lg font-bold text-white mb-1">{prediction.title}</h4>
                        <p className="text-slate-300">{prediction.description}</p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PredictionModal;
