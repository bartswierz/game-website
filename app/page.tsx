"use client";
import LogIn from "@/components/ui/log-in";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";

export default async function Home() {
  // const gameData: GameDataProps = await getGames();
  // const games = await getGames();
  // console.log("games", games);

  /* state.[specify which reducer].[specify which state variable
  useAppSelector is a TYPED version of useSelector that allows us to receive autocomplete suggestions with our state variables
  useAppSelector((state) => state.authReducer.value.username); -> fetches our username value from the store
  */
  // const username = useSelector((state) => state.authReducer.value.username);
  // const username = useAppSelector((state) => {
  //   console.log("state.authReducer.value.username", state.authReducer.value.username);
  //   return state.authReducer.value.username;
  // });
  const username = useAppSelector((state) => {
    return state.authReducer.value.username;
  });

  const isModerator = useAppSelector((state) => state.authReducer.value.isModerator);

  return (
    // <main className="m-24 rounded-md grid grid-cols-4 gap-12 w-full">
    <main>
      <div className="text-white">
        <div>HOME PAGE</div>
        {/* RENDER GAMES HERE FOR HOME PAGE */}
        {/* TESTING PURPOSES */}
        <LogIn />

        <h1>Username: {username}</h1>
        {isModerator && <h1>This user is a moderator</h1>}
      </div>
    </main>
  );
}
