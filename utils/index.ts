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
//TODO - genreID = number | string ex.) genreID = 4 | "action"
export const getGamesByGenre = async (genre: number | string, page_size: string | null): Promise<GamesByGenre> => {
  console.log("Inside getGamesByGenre: ");
  // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
  const res = await fetch(`https://api.rawg.io/api/games?genres=${genre}&page_size=${page_size}&key=${process.env.RAWG_API_KEY}`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await res.json();

  return data;
};
// getGamesByGenre(4);

// FETCH GAME DETAILS FOR A SPECIFIC GAME - ex. GTA 5 ID: 3498 -> fetch(https://api.rawg.io/api/games/3498?key=${process.env.RAWG_API_KEY})
//TODO - replace this with an individual game call instead of pulling the entire section and then filtering. We DO NOT NEED FILTERING.
export const getGameDetails = async (id: string): Promise<GameDetails> => {
  // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
  console.log("private key - getGameDetails: ", process.env.RAWG_API_KEY);
  // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&id=${id}`);
  //https://api.rawg.io/api/games/3498?key=19bf6456aed44d52b0a064df2f54ef4a
  const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  //All games
  const data: GameDetails = await res.json();
  // console.log("GAME DETAILS: ", data);

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
    console.log("data", data);

    return data;
  }

  // If request is null return empty object
  return {} as GameDevelopers;
};

// GET DEVELOPER INFO
// FETCH GAME DETAILS FOR A SPECIFIC GAME
export const getDeveloperInfo = async (id: string): Promise<DeveloperInfo> => {
  // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
  console.log("private key - getDeveloperInfo: ", process.env.RAWG_API_KEY);
  // const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&id=${id}`);
  const res = await fetch(`https://api.rawg.io/api/developers/405?key=${process.env.RAWG_API_KEY}&id=${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch developer info");
  }

  //All games
  const data = await res.json();
  console.log("developer data from getDeveloperInfo: ", data);
  //Only want the results object containing game info
  let developerData: DeveloperInfo = data.results;

  // Grab only 1 developer that matches our id
  // const developerInfo: DeveloperInfo = developerData.filter((dev: DeveloperInfo) => {
  //   //Params is always a string so we need to convert our game.id from number to string
  //   console.log("dev: ", dev);
  //   let devID = dev.id.toString();
  //   return devID === id;
  // });

  // return developerInfo;
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
// getGamesGenres();

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
// getGenreInfo("4");

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
  // console.log("data from getStores: ", data);
  // If null return empty object
  return data;
};
// getStores();

//FETCH ALL GAME PLATFORMS AVAILABLE - TODO add page_size
export const getPlatforms = async (page_size: number): Promise<GamePlatforms> => {
  // console.log("inside getPlatforms");
  // const res = await fetch(`https://api.rawg.io/api/platforms?key=${process.env.RAWG_API_KEY}`);
  const res = await fetch(`https://api.rawg.io/api/platforms?key=${process.env.RAWG_API_KEY}&page_size=${page_size}`);

  if (!res.ok) throw new Error("Failed to fetch Game Platforms");

  const data: GamePlatforms = await res.json();
  // console.log("data from getPlatforms: ", data);

  // If null return empty object
  return data;
};
// getPlatforms();

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

export const getGamesByPlatform = async (platformID: string | null, page_size: number): Promise<GamesByPlatform> => {
  console.log("inside getGamesByPlatform");
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&platforms=${platformID}&page_size=${page_size}`
  );

  if (!res.ok) throw new Error("Failed to fetch Games by Platform");

  const data: GamesByPlatform = await res.json();
  console.log("data - GamesByPlatform: ", data);
  return data;
};
// getGamesByPlatform(187, 6);
//TODO - stopped at connecting the getGamesByPlatform to work with the platform links on the sidebar, we will need to pass the id of the platform to the getGamesByPlatform function as a search param
