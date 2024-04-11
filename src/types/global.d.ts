interface Plan {
  id: string;
  name: string;
  catalogAccess: string;
  videoQuality: string;
  profile: string;
  devices: string;
  price: string;
}
interface Episode {
  description: string;
  id: number;
  title: string;
  poster: string;
  duration: string;
  videoUrl: string;
  season: number;
}

interface Content {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  rating: string;
  poster: string;
  description: string;
  categories: string;
  trailerUrl: string;
  videoUrl: string;
}

