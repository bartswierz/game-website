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

// export interface Store {
//   id: number;
//   store: {
//     id: number;
//     name: string;
//     slug: string;
//     domain: string;
//     games_count: number;
//     image_background: string;
//   };
// }

// export interface GameDetails {
//   id: number;
//   slug: string;
//   name: string;
//   released: string;
//   tba: boolean;
//   background_image: string;
//   rating: number;
//   rating_top: number;
//   ratings: object[];
//   ratings_count: number;
//   reviews_text_count: number;
//   added: number;
//   added_by_status: {
//     yet: number;
//     owned: number;
//     beaten: number;
//     toplay: number;
//     dropped: number;
//     playing: number;
//   };
//   metacritic: number;
//   playtime: number;
//   suggestions_count: number;
//   updated: string;
//   user_game: null;
//   reviews_count: number;
//   saturated_color: string;
//   dominant_color: string;
//   platforms: object[];
//   parent_platforms: object[];
//   genres: object[];
//   stores: Store[];
//   clip: null;
//   tags: object[];
//   esrb_rating: { id: number; name: string; slug: string };
//   short_screenshots: object[];
// }

export interface MetacriticPlatforms {
  metascore: number;
  url: string;
  platform: {
    platform: number;
    name: string;
    slug: string;
  };
}

export interface Ratings {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface Reactions {
  [key: string]: number;
}

export interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface ParentPlatforms {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Platforms {
  platform: {
    id: number;
    name: string;
    slug: string;
    image: null;
    year_end: null;
    year_start: number;
    games_count: number;
    image_background: string;
  };
  released_at: string;
  requirements: {} | { minimum: string; recommended: string };
}

export interface Stores {
  id: number;
  url: "";
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
  };
}

export interface Developers {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Genres {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Tags {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export interface Publishers {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface GameDetails {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: MetacriticPlatforms[];
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: Ratings[];
  reactions: Reactions;
  added: number;
  added_by_status: AddedByStatus;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: "";
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  reviews_text_count: number;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  user_game: null;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  parent_platforms: ParentPlatforms[];
  platforms: Platforms[];
  stores: Stores[];
  developers: Developers[];
  genres: Genres[];
  tags: Tags[];
  publishers: Publishers[];
  esrb_rating: EsrbRating;
  clip: null;
  description_raw: string;
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

export interface DeveloperInfo {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  description: string;
}
