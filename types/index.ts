export interface SidebarDataProps {
  title: string;
  links: string[];
}

export interface Game {
  id: number;
  background_image: string;
  rating: number;
  name: string;
  games: {}[];
  added: number;
}

export interface Store {
  id: number;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
  };
}

export interface GameDetails {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: object[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
  };
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  user_game: null;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: object[];
  parent_platforms: object[];
  genres: object[];
  stores: Store[];
  clip: null;
  tags: object[];
  esrb_rating: { id: number; name: string; slug: string };
  short_screenshots: object[];
}

export interface GameDevelopersResults {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  games: [
    {
      id: number;
      slug: string;
      name: string;
      added: number;
    }
  ];
}

export interface GameDevelopers {
  count: number;
  next: string;
  previous: null;
  results: GameDevelopersResults[];
}
