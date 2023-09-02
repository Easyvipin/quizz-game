import React from "react";
import { formattedTimeString } from "@src/utils";

interface ScoreType {
  score: number;
  timestamp: number;
}
interface IScoreListProps {
  topScores: ScoreType[];
  resetGame: () => void;
}

const ScoreList: React.FunctionComponent<IScoreListProps> = ({
  topScores,
  resetGame,
}) => {
  return (
    <ul className="block border rounded border-violet-400  bg-gray-900 mt-4 md:mt-4  md:h-[80vh] overflow-y-auto  shadow-neon-glow">
      <li className="flex" key="head">
        <div className="text-center text-lg py-2 border border-dashed border-violet-400 flex-1  ">
          Timestamp
        </div>
        <div className="text-center text-lg py-2 border border-dashed border-violet-400 flex-1 ">
          Score
        </div>
      </li>
      {topScores.length === 0 && (
        <li className=" flex flex-col justify-center gap-4 items-center p-2 h-[80%]">
          <h2 className="text-yellow-300 p-2 text-xl md:text-3xl">
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
      {topScores?.map((eachScore) => (
        <li
          className="flex border p-3 md:p-2 border-violet-400"
          key={eachScore.timestamp}
        >
          <div className="text-center flex-1 font-thin text-orange-200 ">
            {formattedTimeString(eachScore.timestamp)}
          </div>
          <div className="text-center flex-1 font-mono text-lg font-semibold">
            {eachScore.score}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ScoreList;
