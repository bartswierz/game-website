interface WordListProps {
  stringList: {
    id: number;
    name: string;
    slug: string;
    language?: string;
    games_count: number;
    image_background: string;
  }[];
}

//TODO - accepts a string list of words and displays them in a list split by a ,
const WordList = ({ stringList }: WordListProps) => {
  console.log("stringList passed: ", stringList);
  return (
    <div>
      {stringList.map(({ id, name }, idx) => {
        return (
          <span key={id}>
            {name}
            {/* IF NOT LAST WORD IN LIST(OR ONLY 1 WORD), THEN ADD COMMA */}
            {idx !== stringList.length - 1 ? ", " : ""}
          </span>
        );
      })}
    </div>
  );
};

export default WordList;
