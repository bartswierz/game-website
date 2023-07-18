import React from "react";
import { getPlatforms } from "@/utils";
import { GamePlatforms } from "@/types";
import Image from "next/image";
// type Props = {};

const Platforms = async () => {
  const platformData: GamePlatforms = await getPlatforms();

  if (!platformData) return <div className="text-white">Loading...</div>;

  return (
    <div className="text-white">
      <div>count: {platformData.count}</div>
      <div>next: {platformData.next}</div>
      <div>previous: {platformData.previous}</div>
      <div className="flex flex-wrap gap-4">
        {platformData.results.map((platform) => (
          <div key={platform.id} className="border">
            <div>id: {platform.id}</div>
            <div>name: {platform.name}</div>
            <div>slug: {platform.slug}</div>
            <div>games_count: {platform.games_count}</div>
            <Image src={platform.image_background} width={200} height={200} alt="Platform Game Display" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Platforms;
