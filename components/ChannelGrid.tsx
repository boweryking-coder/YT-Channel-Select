import React from 'react';
import type { Channel, ViewMode } from '../types';
import ChannelCard from './ChannelCard';
import { SadFaceIcon } from './icons';

interface ChannelGridProps {
  channels: Channel[];
  onPredict: (channel: Channel) => void;
  onRemove: (id: string) => void;
  viewMode: ViewMode;
}

const ChannelGrid: React.FC<ChannelGridProps> = ({ channels, onPredict, onRemove, viewMode }) => {
  if (channels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 rounded-2xl bg-slate-800/50 border border-dashed border-slate-700">
        <SadFaceIcon />
        <h3 className="mt-4 text-xl font-semibold text-white">No Channels Found</h3>
        <p className="mt-1 text-slate-400">Try adjusting your search or filters.</p>
      </div>
    );
  }

  const gridClasses = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6";
  const listClasses = "flex flex-col space-y-4";

  return (
    <div className={viewMode === 'grid' ? gridClasses : listClasses}>
      {channels.map((channel) => (
        <ChannelCard 
          key={channel.id} 
          channel={channel} 
          onPredict={onPredict}
          onRemove={onRemove}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default ChannelGrid;
