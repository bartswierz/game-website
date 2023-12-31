import React from "react";
import { getStores } from "@/utils";
import { GameStores } from "@/types";
import Link from "next/link";
import { FaSteam, FaXbox, FaPlaystation, FaGooglePlay, FaApple } from "react-icons/fa";
import { SiNintendo, SiEpicgames, SiItchdotio, SiGogdotcom } from "react-icons/si";
import { PageHeader } from "@/components/ui";

const Stores = async () => {
  const storesList: GameStores = await getStores();

  // Company Icon List for Stores
  const iconList = [
    <FaSteam size={50} key={1} />,
    <FaXbox size={50} key={2} />,
    <FaPlaystation size={50} key={3} />,
    <FaApple size={50} key={4} />,
    <SiGogdotcom size={50} key={5} />,
    <SiNintendo size={50} key={6} />,
    <FaXbox size={50} key={7} />,
    <FaGooglePlay size={50} key={8} />,
    <SiItchdotio size={50} key={9} />,
    <SiEpicgames size={50} key={10} />,
  ];

  return (
    <>
      <PageHeader title="Stores" count={10} countType={"Stores"} hidePlus />
      <div className="flex justify-center flex-wrap gap-4">
        {storesList.results.map((store, idx) => (
          <Link
            href={`https://${store.domain}`}
            className="flex flex-col sm:flex-row justify-center sm:justify-start gap-2 text-white items-center rounded-lg w-80 max-w-[86vw] p-2 bg-slate-700 hover:bg-gray-500 text-center sm:text-start sm:gap-4"
            target="_blank"
            key={idx}
          >
            {/* COMPANY ICON */}
            <p>{iconList[idx]}</p>

            {/* TEXT CONTAINER */}
            <div className="text-center sm:text-start">
              <p className="text-xl font-semibold">{store.name}</p>

              <p>
                <span className="font-semibold">{store.games_count}+</span> games available!
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Stores;
