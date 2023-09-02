import React from "react";
import Progressbar from "./Progressbar";

interface GameStatusDisplayProps {
  score: number;
  timeLeft: number;
  timeLimit: number;
}

const GameStatusDisplay: React.FC<GameStatusDisplayProps> = ({
  score,
  timeLeft,
  timeLimit,
}) => {
  return (
    <div className="flex justify-between w-[75%] md:w-1/2 items-center">
      <div className="text-xl md:text-3xl lg:text-5xl font-semibold transition-opacity mr-8 w-28">
        <span className="text-yellow-500">&#x265C;</span> {score}
      </div>
      <Progressbar currentSize={timeLeft} totalSize={timeLimit} />
      <div className="text-xl md:text-3xl lg:text-5xl font-semibold transition-opacity ml-8 w-28 text-right">
        <span className="text-yellow-500 ">&#128337;</span> {timeLeft}
      </div>
    </div>
  );
};

export default GameStatusDisplay;
