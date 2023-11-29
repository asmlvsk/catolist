export interface JikanPagination {
  last_visible_page: number;
  has_next_page: boolean;
  items?: JikanPaginationItems;
}

export interface JikanPaginationItems {
  count: number;
  total: number;
  per_page: number;
}

export interface JikanAnime {
  data: JikanAnimeData;
  pagination: JikanPagination;
}

export interface JikanAnimeData {
  mal_id: number;
  url: string;
  images: JikanImages;
  approved: boolean;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: AnimeType;
  source: string;
  episodes: number;
  status: AnimeStatus;
  airing: boolean;
  duration: string;
  rating: AnimeRating;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  year: number;
}

interface JikanImages {
  jpg: {
    large_image_url: string;
  };
}

enum AnimeType {
  tv = "TV",
  movie = "Movie",
  ova = "Ova",
  special = "Special",
  ona = "Ona",
  music = "Music",
}

enum AnimeStatus {
  finished = "Finished Airing",
  airing = "Currently Airing",
  complete = "Complete",
}

enum AnimeRating {
  g = "g",
  pg = "pg",
  pg13 = "pg13",
  r17 = "r17",
  r = "r",
  rx = "rx",
}
