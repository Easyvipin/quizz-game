import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/router";

interface GameContextProps {
  score: number;
  timeLimit: number;
  updateScore: (newScore: number) => void;
  storeResult: (totalScore: number, timestamp: number) => void;
  scoresInSession: () => [];
  resetGame: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [score, setScore] = useState(0);
  const router = useRouter();
  const timeLimit = 15;

  useEffect(() => {
    // Set the score to 0 whenever we hop into arena
    if (router.asPath == "/arena") {
      setScore(0);
    }
  }, [router.asPath]);

  const updateScore = (increment: number) => {
    setScore((prevScore) => prevScore + increment);
  };

  const resetGame = () => {
    setScore(0);
    router.push("/");
  };

  const storeResult = (totalScore: number, timestamp: number) => {
    const results = JSON.parse(sessionStorage.getItem("gameResults") || "[]");
    results.push({ score: totalScore, timestamp });
    sessionStorage.setItem("gameResults", JSON.stringify(results));
  };

  const scoresInSession = () => {
    const allScores = JSON.parse(sessionStorage.getItem("gameResults") || "[]");
    return allScores;
  };

  const contextValue: GameContextProps = {
    score,
    timeLimit,
    updateScore,
    storeResult,
    resetGame,
    scoresInSession,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
