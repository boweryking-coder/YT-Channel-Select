export interface Channel {
  id: string;
  title: string;
  description: string;
  category: string;
}

export type SortOption = 'title-asc' | 'title-desc' | 'random';

export type ViewMode = 'grid' | 'list';

export interface Prediction {
  title: string;
  description: string;
}