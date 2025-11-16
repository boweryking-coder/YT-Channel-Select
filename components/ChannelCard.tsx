import React, { useState, useEffect, useRef } from 'react';
import type { Channel, ViewMode } from '../types';
import { SparkleIcon, TrashIcon } from './icons';
import { GoogleGenAI } from "@google/genai";

interface ChannelCardProps {
  channel: Channel;
  onPredict: (channel: Channel) => void;
  onRemove: (id: string) => void;
  viewMode: ViewMode;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel, onPredict, onRemove, viewMode }) => {
  const channelUrl = `https://www.youtube.com/channel/${channel.id}`;
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [latestVideoTitle, setLatestVideoTitle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setIsLoading(true);
          
          const fetchChannelData = async () => {
            try {
              const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
              const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `Search Google for the official YouTube channel named "${channel.title}" with channel ID "${channel.id}". Find the title of its most recently uploaded video. Return this data as a single, compact, valid JSON object with ONLY the key "latestVideoTitle". If a value cannot be found, use a value of null for that key.`,
                config: {
                  tools: [{googleSearch: {}}],
                },
              });
              
              const text = response.text.trim();
              const jsonRegex = /```json\s*([\s\S]*?)\s*```|({[\s\S]*})/;
              const match = text.match(jsonRegex);

              if (!match) {
                throw new Error(`No valid JSON found in Gemini's response. Response text: ${text}`);
              }
              
              const jsonString = match[1] || match[2] || match[0];
              const result = JSON.parse(jsonString);

              setLatestVideoTitle(result.latestVideoTitle || null);
            } catch (e) {
              console.error(e);
              setError("Could not fetch channel data.");
            } finally {
              setIsLoading(false);
            }
          };

          fetchChannelData();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [channel.id, channel.title]);

  const latestVideoContent = (
    <div className="mt-3 pt-3 border-t border-slate-700/50 min-h-[58px]">
      {isLoading ? (
        <p className="text-xs text-slate-500 animate-pulse">Loading latest video...</p>
      ) : error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : latestVideoTitle ? (
        <>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Latest Upload</h4>
          <p className="text-sm text-slate-300 line-clamp-2" title={latestVideoTitle}>{latestVideoTitle}</p>
        </>
      ) : null}
    </div>
  );

  if (viewMode === 'list') {
    return (
      <div ref={cardRef} className="group relative">
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <div className="flex items-start sm:items-center space-x-6 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 shadow-lg hover:shadow-sky-500/10 hover:border-sky-500/50 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors truncate">
                {channel.title}
              </h3>
              <span className="text-xs font-semibold bg-slate-700 text-sky-300 px-2.5 py-1 rounded-full inline-block mt-1">
                {channel.category}
              </span>
              <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                {channel.description || 'No description available.'}
              </p>
              {latestVideoContent}
            </div>
            <button
              onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onPredict(channel);
              }}
              title="Predict Next Upload with Gemini"
              aria-label="Predict Next Upload with Gemini"
              className="z-10 p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/80 text-slate-300 hover:text-sky-300 transition-all duration-200 ml-4 flex-shrink-0"
            >
              <SparkleIcon />
            </button>
          </div>
        </a>
        <button
          onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(channel.id);
          }}
          title="Remove Channel"
          aria-label="Remove Channel"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/80 text-slate-300 hover:text-red-400 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <TrashIcon />
        </button>
      </div>
    );
  }

  // Grid View (default)
  return (
    <div ref={cardRef} className="h-full flex flex-col group relative">
        <a
        href={channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative h-full"
        >
        <div className="h-full flex flex-col bg-slate-800/60 rounded-2xl border border-slate-700/80 shadow-lg hover:shadow-sky-500/10 hover:border-sky-500/50 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden p-6">
            <div className="flex-grow flex flex-col">
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                    {channel.title}
                    </h3>
                    <span className="text-xs font-semibold bg-slate-700 text-sky-300 px-2.5 py-1 rounded-full mt-1 inline-block">
                    {channel.category}
                    </span>
                </div>
                <div className="flex-grow flex flex-col pt-3">
                  <p className="text-sm text-slate-400 flex-grow line-clamp-3">
                      {channel.description || 'No description available.'}
                  </p>
                  {latestVideoContent}
                </div>
            </div>
        </div>
        </a>
        <button
          onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(channel.id);
          }}
          title="Remove Channel"
          aria-label="Remove Channel"
          className="absolute top-3 left-3 z-10 p-2 rounded-full bg-black/40 hover:bg-red-500/80 text-white transition-all duration-200"
        >
          <TrashIcon />
        </button>
        <button
          onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onPredict(channel);
          }}
          title="Predict Next Upload with Gemini"
          aria-label="Predict Next Upload with Gemini"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 hover:bg-sky-500/80 text-white transition-all duration-200"
        >
          <SparkleIcon />
        </button>
    </div>
  );
};

export default ChannelCard;
