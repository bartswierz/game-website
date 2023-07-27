import {
  Game,
  GameDetails,
  GameDevelopers,
  DeveloperInfo,
  GameGenres,
  GenreInfo,
  GamesByGenre,
  GameStores,
  GamePlatforms,
  GamesByPlatform,
  GamesSearch,
  GameScreenshots,
  StoresWithGame,
} from "@/types";

// Creates a valid URL from a string i.e.) link: "Best of the Year" & title: Top Games" => "best-of-the-year"
export const formatLink = (title: string, link: string): string => {
  const formattedDirectory = title.replaceAll(" ", "-").toLowerCase();
  const formattedLink = link.replaceAll(" ", "-").toLowerCase();
  const formattedURL = "/" + formattedDirectory + "/" + formattedLink;
  // console.log(formattedURL);
  return formattedURL;
};

// Get the current page number from the URL by splitting the URL at the "page=". i.e.) https://api.rawg.io/api/developers?key=...&page=2 => page=2 => 2
export const getPage = (url: string): number => {
  const splitURL = url.split("page="); // ["https://api.rawg.io/api/developers?key=...", "2"]

  // Converting from string to number and subtracting 1 to get the current page number because the passed url is the NEXT URL TO FETCH
  const pageNumber = Number(splitURL[1]) - 1;
  console.log("pageNumber", pageNumber);

  return pageNumber;
};

// FETCHES 20 GAMES FROM RAWG API - USED ON HOME PAGE TO RENDER 20 GAMES
export const getGames = async (): Promise<Game[]> => {
  console.log("private key - get Games: ", process.env.RAWG_API_KEY);
  const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await res.json();

  return data.results;
};

/* FOR REFERENCE: GENRES SLUG & ID VALUES AS OF 7/15/23 
 action | 4, indie | 51, adventure | 3, rpg | 5, shooter | 2, casual | 40, simulation | 14, puzzle | 7, arcade | 11, platformer | 83, racing | 1, strategy | 10, sports | 15, fighting | 6, family | 19, board-games | 28, educational | 34, card | 17, massively-multiplayer | 59
*/
// FETCHES GAMES BASED ON THEIR GENRE TYPE - ex. passed action will search for all games with the action genre
//genreID = number | string ex.) genreID = 4 | "action"
export const getGamesByGenre = async (genre: number | string): Promise<GamesByGenre> => {
  // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
  const res = await fetch(`https://api.rawg.io/api/games?genres=${genre}&page_size=12&key=${process.env.RAWG_API_KEY}`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await res.json();

  return data;
};

// FETCH GAME DETAILS FOR A SPECIFIC GAME - ex. GTA 5 ID: 3498 -> fetch(https://api.rawg.io/api/games/3498?key=${process.env.RAWG_API_KEY})
//TODO - replace this with an individual game call instead of pulling the entire section and then filtering. We DO NOT NEED FILTERING.
export const getGameDetails = async (id: string): Promise<GameDetails> => {
  const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  //All games
  const data: GameDetails = await res.json();

  return data;
};

// FETCH GAME DEVELOPERS
// export const getGameDevelopers = async (page?: number): Promise<GameDevelopers> => {
export const getGameDevelopers = async (): Promise<GameDevelopers> => {
  // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
  console.log("private key: ", process.env.RAWG_API_KEY);

  const res = await fetch(`https://api.rawg.io/api/developers?key=${process.env.RAWG_API_KEY}`);
  // const res = await fetch(`https://api.rawg.io/api/developers?key=${key}`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  //All games
  const data: GameDevelopers = await res.json();
  // console.log("data", data);

  return data;
};

// FETCH GAME DEVELOPERS PREVIOUS OR NEXT PAGE - PAGINATION
export const getNextGameDevelopersPage = async (request: string | null): Promise<GameDevelopers> => {
  if (request !== null) {
    const res = await fetch(request);
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    //All games
    const data: GameDevelopers = await res.json();

    return data;
  }

  // If request is null return empty object
  return {} as GameDevelopers;
};

// GET DEVELOPER INFO
// FETCH GAME DETAILS FOR A SPECIFIC GAME
export const getDeveloperInfo = async (id: string): Promise<DeveloperInfo> => {
  const res = await fetch(`https://api.rawg.io/api/developers/405?key=${process.env.RAWG_API_KEY}&id=${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch developer info");
  }

  //All games
  const data = await res.json();
  //Only want the results object containing game info
  // let developerData: DeveloperInfo = data.results;

  return data;
};

// GET ALL GAME GENRES
export const getGamesGenres = async (): Promise<GameGenres> => {
  const res = await fetch(`https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`);

  if (!res.ok) {
    throw new Error("Failed to fetch All Game Genres");
  }

  const data = await res.json();
  // console.log("GENRES: ", data);

  return data;
};

// TODO - PASS IN GENRE ID TO GET INFORMATION FOR A SPECIFIC GENRE
export const getGenreInfo = async (genreId: string | null): Promise<GenreInfo> => {
  // https://api.rawg.io/api/genres/{id}?key={key}
  const res = await fetch(`https://api.rawg.io/api/genres/${genreId}?key=${process.env.RAWG_API_KEY}`);

  if (!res.ok) {
    throw new Error("Failed to fetch Genre Info");
  }

  const data: GenreInfo = await res.json();
  // console.log("GENRE INFO: ", data);

  return data;
};

// FETCH GAME DEVELOPERS PREVIOUS OR NEXT PAGE - PAGINATION
export const getNextGameGenrePage = async (request: string | null): Promise<GamesByGenre> => {
  if (request !== null) {
    const res = await fetch(request);
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    //All games
    const data: GamesByGenre = await res.json();
    console.log("data", data);

    return data;
  }

  // If request is null return empty object
  return {} as GamesByGenre;
};

// FETCHES GAME STORES
export const getStores = async (): Promise<GameStores> => {
  const res = await fetch(`https://api.rawg.io/api/stores?key=${process.env.RAWG_API_KEY}`);

  if (!res.ok) throw new Error("Failed to fetch Game Stores");

  const data: GameStores = await res.json();

  return data;
};

//FETCH ALL GAME PLATFORMS AVAILABLE - TODO add page_size
export const getPlatforms = async (): Promise<GamePlatforms> => {
  const res = await fetch(`https://api.rawg.io/api/platforms?key=${process.env.RAWG_API_KEY}&page_size=6`);

  if (!res.ok) throw new Error("Failed to fetch Game Platforms");

  const data: GamePlatforms = await res.json();

  return data;
};

// FETCH GAME DEVELOPERS PREVIOUS OR NEXT PAGE - PAGINATION
export const getNextPlatformPage = async (request: string | null): Promise<GamePlatforms> => {
  if (request !== null) {
    const res = await fetch(request);
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    //All games
    const data: GamePlatforms = await res.json();
    console.log("data", data);

    return data;
  }

  // If request is null return empty object
  return {} as GamePlatforms;
};

export const getGamesByPlatform = async (platformID: string | null): Promise<GamesByPlatform> => {
  const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&platforms=${platformID}&page_size=12`);

  if (!res.ok) throw new Error("Failed to fetch Games by Platform");

  const data: GamesByPlatform = await res.json();

  return data;
};

// https://api.rawg.io/api/games?key=19bf6456aed44d52b0a064df2f54ef4a&search=diablo
export const getGamesSearch = async (searchTerm: string): Promise<GamesSearch> => {
  const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${searchTerm}`);

  if (!res.ok) throw new Error("Failed to fetch Games by Search Term");

  const data: GamesSearch = await res.json();
  // console.log("data - getGamesSearch: ", data);

  return data;
};

// Fetch Game Screenshots by passing in game slug i.e. 'rocket-league'
export const getGameScreenshots = async (game_slug: string): Promise<GameScreenshots> => {
  // console.log("inside getGamesScreenshots");
  const res = await fetch(`https://api.rawg.io/api/games/${game_slug}/screenshots?key=${process.env.RAWG_API_KEY}`);

  if (!res.ok) throw new Error("Failed to fetch Game Screenshots");

  const data: GameScreenshots = await res.json();
  // console.log("data - getGameScreenshots: ", data);
  return data;
};

//Passing in slug i.e. 'rocket-league' to find store link for the game
export const findStoresForGame = async (game_slug: string): Promise<StoresWithGame> => {
  const res = await fetch(`https://api.rawg.io/api/games/${game_slug}/stores?key=${process.env.RAWG_API_KEY}`);

  if (!res.ok) throw new Error("Failed to fetch store link(s) for game");

  const data: StoresWithGame = await res.json();

  return data;
};
