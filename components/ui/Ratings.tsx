import { Ratings } from "@/types";
import { Progress } from "@/components/ui/Shadcn/progress";

type RatingsProps = {
  averageRating: number; //'rating' within the list -> 3.64
  ratingsList: Ratings[]; //ratings: [{ id: 1, title: "Exceptional", count: 0, percent: 0 }]
  ratingsCount: number; //2
};

const Ratings = ({ averageRating, ratingsList, ratingsCount }: RatingsProps) => {
  // Find the rating object that matches the id - { averageRating, ratingsList, ratingsCount }
  const fiveStar = ratingsList.find((rating) => rating.id === 5);
  const fourStar = ratingsList.find((rating) => rating.id === 4);
  const threeStar = ratingsList.find((rating) => rating.id === 3);
  const oneStar = ratingsList.find((rating) => rating.id === 1);

  // const averageRatingPercent = ((averageRating / 5) * 100).toFixed(2) + "%"; //78.75%

  // Each individual rating component
  const RatingComponent__ = ({ ratingObject }: { ratingObject: Ratings }) => {
    if (!ratingObject) return;
    const { id, percent, count } = ratingObject;

    return (
      // flex flex-col xsm:flex-row
      <div className="flex flex-col xxsm:flex-row w-full items-center gap-2" key={id}>
        {/* AT 400px we want to make the same sized width */}
        <p className="flex flex-col- 3xsm:flex-row w-max xxsm:w-[84px] xsm:min-w-[108px] flex-wrap gap-x-[3px] mr-1 ">
          {/* {name} */}
          <span className="block-">{id}-Star</span>
          {/* DISPLAY ABOVE 480px */}
          <span className="hidden xsm:block w-[50px]-">({count})</span>
          {/* DISPLAY BELOW 480px */}
          <span className="block xsm:hidden">{percent}%</span>
        </p>
        <Progress value={percent} className="w-full xsm:w-[60%] bg-gray-700 flex-grow h-[26px] rounded-md max-w-[90vw]-" />

        {/* Display ABOVE 480px */}
        <span className="hidden xsm:block w-[68px] pl-2">{percent}%</span>
      </div>
    );
  };

  // Data doesn't exist or not loaded yet
  if (!ratingsList) return;

  return (
    <div className="my-6">
      <h2 className="flex flex-wrap mb-2 gap-x-1">
        <span className="text-2xl font-semibold">Game Rating</span>
        <span className="text-gray-500 font-bold text-base self-end"> {ratingsCount} Ratings</span>
      </h2>
      <p className="mb-1">
        <span className="font-semibold">Overall Rating</span>: <span className="text-primary font-bold">{averageRating}</span> out of 5
        Stars
      </p>
      <div className="flex flex-col max-w-[700px] gap-2 flex-grow- items-center justify-center">
        {/* Since the find function can return 'undefined' we need to check if we have a returned value */}
        {fiveStar && <RatingComponent__ ratingObject={fiveStar} />}
        {fourStar && <RatingComponent__ ratingObject={fourStar} />}
        {threeStar && <RatingComponent__ ratingObject={threeStar} />}
        {oneStar && <RatingComponent__ ratingObject={oneStar} />}
      </div>
    </div>
  );
};

export default Ratings;
