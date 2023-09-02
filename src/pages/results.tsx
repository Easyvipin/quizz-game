import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGameContext } from "@src/contexts/GameContext";
import AnimatedScore from "@components/AnimatedScore";
import ScoreList from "@components/ScoreList";

interface IresultsProps {}

interface YourEntryType {
  score: number;
  timestamp: number;
}

const Results: React.FunctionComponent<IresultsProps> = () => {
  const { score, scoresInSession, resetGame } = useGameContext();
  const [topScores, setTopScores] = useState<YourEntryType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const allScores: YourEntryType[] = scoresInSession();
    const sortedScores = allScores.sort((a, b) => b.score - a.score);
    const topTenScores = sortedScores.slice(0, 10);

    setTopScores(topTenScores);
  }, []);

  const redirectToSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="flex flex-wrap-reverse md:flex-row-reverse md:flex-wrap md:h-screen ">
      <div className="flex flex-col justify-center items-center flex-1 w-full md:w-2/5 ">
        <AnimatedScore
          score={score}
          resetGame={resetGame}
          redirectToSignup={redirectToSignup}
        />
      </div>
      <div className="ml-auto mr-auto m-auto md:mt-4 w-full md:w-3/5 p-3  ">
        <div>
          <h2 className="text-xl text-center ">Top 10 scores !</h2>
        </div>
        <ScoreList topScores={topScores} resetGame={resetGame} />
      </div>
    </div>
  );
};

export default Results;
