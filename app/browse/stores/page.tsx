import React from "react";
import { getStores } from "@/utils";
import { GameStores } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaSteam, FaXbox, FaPlaystation, FaGooglePlay, FaApple } from "react-icons/fa";
import { SiNintendo, SiEpicgames, SiItchdotio, SiGogdotcom } from "react-icons/si";
// type Props = {};

const Stores = async () => {
  const storesList: GameStores = await getStores();
  // console.log("storesList: ", storesList);

  if (!storesList) return <div className="text-white">Loading...</div>;

  return (
    <div className="text-white">
      <p>Stores TEST</p>
      <div className="flex flex-wrap gap-4">
        {storesList.results.map((store) => (
          <div className="border w-80">
            <p>ID: {store.id}</p>
            <p>{store.name}</p>
            <Link href={`https://${store.domain}`} className="underline" target="_blank">
              {store.domain}
            </Link>
            {/* <p>{store.slug}</p> */}
            <Image src={store.image_background} alt="Game Company Logo" width={200} height={200} />
            <p>Over {store.games_count} games available!</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <p>STORE ICONS</p>
        <p>
          Xbox <FaXbox size={50} />
        </p>
        <p>
          Playstation <FaPlaystation size={50} />
        </p>
        <p>
          Steam <FaSteam size={50} />
        </p>
        <p>
          Nintendo <SiNintendo size={50} />
        </p>
        <p>
          Google Play <FaGooglePlay size={50} />
        </p>
        <p>
          Apple <FaApple size={50} />
        </p>
        <p>
          Epic Games <SiEpicgames size={50} />
        </p>
        <p>
          Itch.io <SiItchdotio size={50} />
        </p>
        <p>
          Gog.com <SiGogdotcom size={50} />
        </p>
      </div>
    </div>
  );
};

export default Stores;
