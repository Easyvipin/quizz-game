import { useGameContext } from "@src/contexts/GameContext";
import { formattedDateTime } from "@src/utils";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

interface IresultsProps {}

interface YourEntryType {
  score: number;
  timestamp: number;
}

const Results: React.FunctionComponent<IresultsProps> = (props) => {
  const { score, scoresInSession, resetGame } = useGameContext();
  const [sortedScores, setSortedScores] = useState<YourEntryType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const allScores = scoresInSession();

    const scoreToEntriesMap: { [score: string]: YourEntryType } =
      allScores.reduce((map, entry) => {
        if (!map[entry.score] || entry.timestamp > map[entry.score].timestamp) {
          map[entry.score] = entry;
        }
        return map;
      }, {});

    const uniqueScoresWithTimestamp = Object.values(scoreToEntriesMap);

    // sort according to high scores
    const getSortedScores = uniqueScoresWithTimestamp.sort(
      (a, b) => b.score - a.score
    );
    setSortedScores(getSortedScores);
  }, []);

  const redirectToSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="flex flex-wrap-reverse md:flex-row-reverse md:flex-wrap md:h-screen ">
      <div className="flex flex-col justify-center items-center flex-1 w-full md:w-2/5 ">
        <div className="w-1/2">
          <h3 className="text-2xl text-center">Your Last score!</h3>
          <motion.h1
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              rotateY: {
                repeat: Infinity,
                duration: 3,
              },
            }}
            className="text-6xl md:text-[8rem]  text-center text-yellow-500"
          >
            {score}
          </motion.h1>
          <div className="flex flex-col gap-5 mt-1 md:mt-2">
            <button
              className="px-4 py-2 text-violet-400 border border-gray-500 rounded-md hover:bg-violet-600 hover:text-gray-100 shadow-neon-glow"
              onClick={resetGame}
            >
              Retry
            </button>
            <button
              className="text-gray-100 border block w-full border-green-500 rounded-md px-3 py-2 mt-2 hover:cursor-pointer bg-green-600 hover:bg-green-700"
              onClick={redirectToSignup}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      <div className="ml-auto mr-auto m-auto  md:mt-4 w-full md:w-3/5 p-3  ">
        <div>
          <h2 className="text-xl text-center ">All of your scores!</h2>
        </div>
        <ul className="block border rounded border-violet-400   mt-4 md:mt-4  md:h-[80vh] overflow-y-auto  shadow-neon-glow">
          <li className="flex " key="head">
            <div className="text-center text-lg py-2 border border-dashed border-violet-400 flex-1  ">
              Timestamp
            </div>
            <div className="text-center text-lg py-2 border border-dashed border-violet-400 flex-1 ">
              Score
            </div>
          </li>
          {sortedScores.length === 0 && (
            <li className=" flex flex-col justify-center gap-4 items-center  h-[80%]">
              <h2 className="text-yellow-300 text-3xl">
                You have not played a single game!
              </h2>
              <button
                className="block px-4 py-2 text-violet-400 border border-gray-500 rounded-md hover:bg-violet-600 hover:text-gray-100 shadow-soft-elevated"
                onClick={resetGame}
              >
                Play the Game!
              </button>
            </li>
          )}
          {sortedScores?.map((eachScore) => (
            <li
              className="flex border py-1 border-violet-400 "
              key={eachScore.timestamp}
            >
              <div className="text-center flex-1 font-thin text-orange-200 ">
                {formattedDateTime(eachScore.timestamp)}
              </div>
              <div className="text-center flex-1 font-mono text-lg font-semibold">
                {eachScore.score}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Results;
