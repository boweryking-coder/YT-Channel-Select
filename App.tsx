import React, { useState, useMemo, useEffect } from 'react';
import { allChannels } from './data/channelData';
import type { Channel, SortOption, Prediction, ViewMode } from './types';
import Header from './components/Header';
import FilterControls from './components/FilterControls';
import ChannelGrid from './components/ChannelGrid';
import PredictionModal from './components/PredictionModal';
import { CategorySummaryIcon, GridViewIcon, ListViewIcon } from './components/icons';
import { GoogleGenAI, Type } from "@google/genai";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>('title-asc');
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>([]);
  const [showCategorySummary, setShowCategorySummary] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [removedChannelIds, setRemovedChannelIds] = useState<Set<string>>(new Set());


  // State for Gemini prediction modal
  const [predictionChannel, setPredictionChannel] = useState<Channel | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionError, setPredictionError] = useState<string | null>(null);
  
  const activeChannels = useMemo(() => {
    return allChannels.filter(channel => !removedChannelIds.has(channel.id));
  }, [removedChannelIds]);


  const { uniqueCategories, categoryCounts } = useMemo(() => {
    const counts: { [key: string]: number } = {};
    activeChannels.forEach(channel => {
      counts[channel.category] = (counts[channel.category] || 0) + 1;
    });
    const categories = ['All', ...Object.keys(counts).sort()];
    return { uniqueCategories: categories, categoryCounts: counts };
  }, [activeChannels]);

  useEffect(() => {
    let channels = [...activeChannels];

    // Filter by category
    if (selectedCategory !== 'All') {
      channels = channels.filter(channel => channel.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      channels = channels.filter(channel =>
        channel.title.toLowerCase().includes(lowercasedTerm) ||
        (channel.description && channel.description.toLowerCase().includes(lowercasedTerm))
      );
    }

    // Sort
    switch (sortOption) {
      case 'title-asc':
        channels.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        channels.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'random':
        channels.sort(() => Math.random() - 0.5);
        break;
    }
    
    setFilteredChannels(channels);
  }, [searchTerm, selectedCategory, sortOption, activeChannels]);

  const handleRandomize = () => {
    setSortOption('random');
    setSelectedCategory('All');
    setSearchTerm('');
    setRemovedChannelIds(new Set());
  };

  const handleSetCategory = (category: string) => {
    setSelectedCategory(category);
    if (sortOption === 'random') {
        setSortOption('title-asc');
    }
  };

  const handleRemoveChannel = (id: string) => {
    setRemovedChannelIds(prev => new Set(prev).add(id));
  };


  const handlePredict = async (channel: Channel) => {
    setPredictionChannel(channel);
    setIsPredicting(true);
    setPrediction(null);
    setPredictionError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a YouTube expert. Based on the following channel information, generate a plausible and engaging title and a short, one-paragraph description for their next video upload. The channel is: Title: '${channel.title}', Category: '${channel.category}', Description: '${channel.description}'.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "The predicted video title." },
              description: { type: Type.STRING, description: "The predicted video description." },
            },
            required: ['title', 'description']
          }
        }
      });
      
      const text = response.text.trim();
      const result: Prediction = JSON.parse(text);
      setPrediction(result);

    } catch (e) {
      console.error(e);
      setPredictionError("Sorry, Gemini couldn't generate a prediction. Please try again.");
    } finally {
      setIsPredicting(false);
    }
  };

  const closePredictionModal = () => {
    setPredictionChannel(null);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-slate-800 text-gray-200">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:space-x-8">
          <aside className="lg:w-1/4 xl:w-1/5 mb-8 lg:mb-0">
             <FilterControls
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortOption={sortOption}
              setSortOption={setSortOption}
              selectedCategory={selectedCategory}
              setSelectedCategory={handleSetCategory}
              categories={uniqueCategories}
              onRandomize={handleRandomize}
            />
             <div className="mt-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-lg">
                <h3 
                  className="text-xl font-bold text-slate-200 mb-4 flex items-center justify-between cursor-pointer"
                  onClick={() => setShowCategorySummary(!showCategorySummary)}
                >
                  Category Summary
                  <CategorySummaryIcon />
                </h3>
                {showCategorySummary && (
                  <ul className="space-y-2 text-slate-300">
                    {Object.entries(categoryCounts).sort((a,b) => Number(b[1]) - Number(a[1])).map(([category, count]) => (
                      <li key={category} className="flex justify-between items-center text-sm">
                        <span>{category}</span>
                        <span className="font-semibold bg-slate-700 text-slate-200 px-2 py-0.5 rounded-full">{count}</span>
                      </li>
                    ))}
                  </ul>
                )}
             </div>
          </aside>
          
          <main className="lg:w-3/4 xl:w-4/5">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                    {selectedCategory === 'All' ? 'All Channels' : selectedCategory}
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 rounded-lg bg-slate-700/50 p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid View"
                      title="Grid View"
                      className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:bg-slate-600/50 hover:text-white'}`}
                    >
                      <GridViewIcon />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      aria-label="List View"
                      title="List View"
                      className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:bg-slate-600/50 hover:text-white'}`}
                    >
                      <ListViewIcon />
                    </button>
                  </div>
                  <p className="text-slate-400">{filteredChannels.length} results</p>
                </div>
            </div>
            <ChannelGrid 
              channels={filteredChannels} 
              onPredict={handlePredict} 
              onRemove={handleRemoveChannel}
              viewMode={viewMode}
            />
          </main>
        </div>
      </div>
      {predictionChannel && (
        <PredictionModal
          channel={predictionChannel}
          prediction={prediction}
          isLoading={isPredicting}
          error={predictionError}
          onClose={closePredictionModal}
        />
      )}
    </div>
  );
};

export default App;
