"use client";
import { addGameToFavorites } from "@/lib/actions";

const AddGameToFavoritesBtn = () => {
  return (
    <button className="bg-blue-500 text-white px-4 py-2" onClick={() => addGameToFavorites()}>
      Add Game To Favorites
    </button>
  );
};

export default AddGameToFavoritesBtn;
