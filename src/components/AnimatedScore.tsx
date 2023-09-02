import React from "react";
import { motion } from "framer-motion";
import { messageBasedOnScore } from "@src/utils";
import Button from "./Button";

interface IAnimatedScoreProps {
  score: number;
  resetGame: () => void;
  redirectToSignup: () => void;
}

const AnimatedScore: React.FunctionComponent<IAnimatedScoreProps> = ({
  score,
  resetGame,
  redirectToSignup,
}) => {
  return (
    <div className="w-1/2">
      <h3 className="text-2xl text-center">Your score!</h3>
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
      <p className="text-center mt-1">{messageBasedOnScore(score)}</p>
      <div className="flex flex-col gap-5 mt-2 md:mt-2">
        <Button
          className="shadow-neon-glow"
          variant="primary"
          onClick={resetGame}
        >
          Retry
        </Button>
        <Button
          variant="success"
          className="block w-full rounded-md mt-2"
          onClick={redirectToSignup}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default AnimatedScore;
