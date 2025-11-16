
import React from 'react';
import type { SortOption } from '../types';
import { SearchIcon, SortIcon, RandomIcon } from './icons';

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  onRandomize: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  selectedCategory,
  setSelectedCategory,
  categories,
  onRandomize
}) => {
  return (
    <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-lg space-y-6 sticky top-24">
      
      {/* Search Bar */}
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-slate-300 mb-2">
          Search Channels
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
             <SearchIcon />
          </div>
          <input
            type="text"
            id="search"
            className="block w-full rounded-md border-0 bg-slate-700 py-2.5 pl-10 pr-3 text-white ring-1 ring-inset ring-slate-600 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm"
            placeholder="Find a channel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <label htmlFor="sort" className="block text-sm font-medium text-slate-300 mb-2">
          Sort by
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SortIcon />
          </div>
          <select
            id="sort"
            className="block w-full appearance-none rounded-md border-0 bg-slate-700 py-2.5 pl-10 pr-3 text-white ring-1 ring-inset ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
          >
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="random">Random</option>
          </select>
        </div>
      </div>

      {/* Randomize Button */}
      <button
        onClick={onRandomize}
        className="w-full flex items-center justify-center space-x-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition-colors"
      >
        <RandomIcon />
        <span>Surprise Me!</span>
      </button>

      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-medium text-slate-300 mb-3">Categories</h3>
        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-sky-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
