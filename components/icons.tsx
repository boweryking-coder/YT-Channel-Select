import React from 'react';

export const YouTubeIcon: React.FC = () => (
  <svg className="w-10 h-10 text-red-500" viewBox="0 0 28 20" fill="currentColor">
    <path d="M27.353 3.063s-.27-1.92-1.11-2.763c-.99-.99-2.103-.99-2.613-.99C19.22 0 14 0 14 0s-5.22 0-9.63.307c-.51 0-1.623.09-2.613.99-.84.843-1.11 2.763-1.11 2.763S.363 5.283.363 7.5v5c0 2.217.27 4.437.27 4.437s.27 1.92 1.11 2.763c.99.99 2.103.99 2.613.99C8.78 20 14 20 14 20s5.22 0 9.63-.307c.51 0 1.623-.09 2.613-.99.84-.843 1.11-2.763 1.11-2.763s.27-2.22.27-4.437v-5c0-2.217-.27-4.437-.27-4.437zM11.16 13.5V6.5l6.09 3.5-6.09 3.5z" />
  </svg>
);

export const SearchIcon: React.FC = () => (
    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
    </svg>
);

export const SortIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3z" />
    </svg>
);

export const RandomIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201-4.456 5.5 5.5 0 011.054-2.003l.97-1.108a.75.75 0 011.23.822l-.414.47a4 4 0 00-.23 1.353 4 4 0 005.83 2.91.75.75 0 01.956.445l.23.69a.75.75 0 01-.806.96l-.52-.173A4.001 4.001 0 0012 10a4 4 0 00-3.312-3.924.75.75 0 01-.638-1.018l.383-.663A5.5 5.5 0 0115.312 11.424zM4.688 8.576a5.5 5.5 0 019.201 4.456 5.5 5.5 0 01-1.054 2.003l-.97 1.108a.75.75 0 01-1.23-.822l.414-.47a4 4 0 00.23-1.353 4 4 0 00-5.83-2.91.75.75 0 01-.956-.445l-.23-.69a.75.75 0 01.806-.96l.52.173A4.001 4.001 0 008 10a4 4 0 003.312 3.924.75.75 0 01.638 1.018l-.383.663A5.5 5.5 0 014.688 8.576z" clipRule="evenodd" />
    </svg>
);

export const SadFaceIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const CategorySummaryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
    </svg>
);

export const SparkleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3Z"/>
        <path d="M5 21L6 17"/>
        <path d="M19 21L18 17"/>
        <path d="M22 8L18 7"/>
        <path d="M2 8L6 7"/>
    </svg>
);

export const SpinnerIcon: React.FC<{ className?: string }> = ({ className = "h-8 w-8 text-sky-400" }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

export const GridViewIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
);

export const ListViewIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
);
