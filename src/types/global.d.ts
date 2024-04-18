

//MoviesTable.tsx
interface Movie {
  id: string;
  title?: string;
  subtitle?: string;
  year?: number;
  rating?: number;
  posterUrl?: string;
  description?: string;
  category?: string[]; // Altere o tipo de category para string[]
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
  category?: string[]; // Altere o tipo de category para string[]
  trailerUrl?: string;
  videoUrl?: string;
}

interface SeriesTableProps {
  series: Series[];
  onDelete: (id: string) => void;
}