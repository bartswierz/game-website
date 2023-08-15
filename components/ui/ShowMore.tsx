"use client";
import { Key, useState } from "react";
import { formatDescription } from "@/utils";

interface ShowMoreProps {
  text: string;
}

const ShowMore = ({ text }: ShowMoreProps) => {
  const [showText, setShowText] = useState(false);

  //REMOVES TAGS AND OTHER UNWANTED TEXT FROM DESCRIPTION
  const formattedParagraphList: string[] = formatDescription(text);
  formattedParagraphList;

  interface ConcatenateStringsProps {
    paragraphList: string[];
    limit: number;
  }

  const ShowAll = ({ paragraphList }: { paragraphList: string[] }) => {
    return (
      <div className="flex flex-col gap-y-2">
        {paragraphList.map((paragraph, idx: Key) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    );
  };

  const ShowLess = ({ paragraphList, limit }: ConcatenateStringsProps) => {
    let currCount = 0;
    let result: string[] = [];

    for (const paragraph of paragraphList) {
      // IF THE STRING IS LESS THAN LIMIT OF CHARACTERS, INCREMENT count and push paragraph to result
      if (result.length + paragraph.length <= limit) {
        // ADD EACH STRING ARRAY TO RESULT
        currCount += paragraph.length;
        result.push(paragraph);
      } else {
        //IF THE STRING IS GREATER THAN 350, SLICE IT AT THE REMAINING CHARACTERS LEFT AND PUSH IT TO THE ARRAY LIST
        const remainingChars = limit - currCount;
        const slicedParagraph = `${paragraph.slice(0, remainingChars) + "..."}`; //uses up remaining character count to collect last bit of text to
        result.push(slicedParagraph);
        break;
      }
    }

    return (
      <div className="flex flex-col gap-y-2">
        {result.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    );
  };

  return (
    <div>
      {showText ? (
        //DISPLAYS ALL PARAGRAPHS
        <ShowAll paragraphList={formattedParagraphList} />
      ) : (
        //DISPLAYS LIMITED CHARACTERS
        <ShowLess paragraphList={formattedParagraphList} limit={350} />
      )}
      <button className="bg-gray-200 text-gray-700 text-xxs rounded p-1 hover:bg-gray-300" onClick={() => setShowText(!showText)}>
        {showText ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

export default ShowMore;
