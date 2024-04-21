

//MoviesTable.tsx
interface Movie {
  id: string;
  title?: string;
  subtitle?: string;
  year?: number;
  rating?: number;
  posterUrl?: string;
  description?: string;
  category?: string[];
  trailerUrl?: string;
  videoUrl?: string;
}

interface MoviesTableProps {
  movies: Movie[];
  onDelete: (id: string) => void;
}


//SeriesTable.tsx
interface Series {
  id: string;
  title?: string;
  subtitle?: string;
  year?: number;
  rating?: number;
  posterUrl?: string;
  description?: string;
  category?: string[];
  trailerUrl?: string;
  videoUrl?: string;
  episodes: Episode[];
}

interface SeriesTableProps {
  series: Series[];
  onDelete: (id: string) => void;
}


interface Episode {
  id: number;
  season: number;
  title: string;
  duration: string;
  poster: string;
  description: string;
  videoUrl: string;
}

interface EpisodesModalProps {
  episodes: Episode[];
  setEpisodes: React.Dispatch<React.SetStateAction<Episode[]>>;
  selectedSeries: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
