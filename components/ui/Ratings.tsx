"use client";
// TODO Pass through Ratings
import { Ratings } from "@/types";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/Shadcn/progress";
// import * as Progress from "@radix-ui/react-progress";

type RatingsProps = {
  averageRating: number; //'rating' within the list -> 3.64
  ratingsList: Ratings[]; //ratings: [{ id: 1, title: "Exceptional", count: 0, percent: 0 }]
  ratingsCount: number; //2
};

const Ratings = ({ averageRating, ratingsList, ratingsCount }: RatingsProps) => {
  const [progress, setProgress] = useState(0);
  // const [exceptional, setExceptional] = useState({ id: -1, title: "", count: 0, percent: 0 });
  // const [recommended, setRecommended] = useState({ id: -1, title: "", count: 0, percent: 0 });
  // const [meh, setMeh] = useState({ id: -1, title: "", count: 0, percent: 0 });
  // const [skip, setSkip] = useState({ id: -1, title: "", count: 0, percent: 0 });
  const [exceptional, setExceptional] = useState(ratingsList[0]);
  const [recommended, setRecommended] = useState(ratingsList[1]);
  const [meh, setMeh] = useState(ratingsList[2]);
  const [skip, setSkip] = useState(ratingsList[3]);

  useEffect(() => {
    //Percentage of the bar - TODO - make this piece equal to the 'percent' in ratings.percent
    const timer = setTimeout(() => setProgress(50), 500);
    return () => clearTimeout(timer);
  }, []);

  //Setting ratings list values
  // useEffect(() => {
  //   setExceptional(ratingsList[0]);
  //   setRecommended(ratingsList[1]);
  //   setMeh(ratingsList[2]);
  //   setSkip(ratingsList[3]);
  // });

  // useEffect(() => {
  //   console.log("exceptional: ", exceptional);
  //   console.log("recommended: ", recommended);
  //   console.log("meh: ", meh);
  //   console.log("skip: ", skip);
  // });

  // return <Progress value={progress} className="w-[60%] text-yellow-700 border border-yellow-500 bg-gray-300" />;
  return (
    <>
      <div>Game Ratings({ratingsCount})</div>
      <div className="flex flex-col max-w-[500px] border gap-2 flex-grow-">
        <div className="flex">
          <span className="w-[84px]">Excellent</span>

          <Progress
            value={exceptional.percent}
            className="w-[60%] bg-gray-700 flex-grow self-center h-6 rounded-md"
            color={`#d9a411`}
          />

          <span className="w-[68px] pl-2">{exceptional.percent}%</span>
        </div>

        <div className="flex">
          <span className="w-[84px]">Good</span>
          <Progress value={recommended.percent} className="w-[60%] bg-gray-700 flex-grow self-center h-6 rounded-md" />
          <span className="w-[68px] pl-2">{recommended.percent}%</span>
        </div>

        <div className="flex">
          <span className="w-[84px]">Fair</span>
          <Progress value={meh.percent} className="w-[60%] bg-gray-700 flex-grow self-center h-6 rounded-md" />
          <span className="w-[68px] pl-2">{meh.percent}%</span>
        </div>

        <div className="flex">
          <span className="w-[84px]">Poor</span>
          <Progress value={skip.percent} className="w-[60%] bg-gray-700 flex-grow self-center h-6 rounded-md" />
          <span className="w-[68px] pl-2">{skip.percent}%</span>
        </div>
      </div>
    </>
  );
};

export default Ratings;
