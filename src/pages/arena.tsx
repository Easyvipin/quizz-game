import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import "react-medium-image-zoom/dist/styles.css";
import { imagesData } from "@src/utils/constants";
import Progressbar from "@src/components/Progressbar";
import { useGameContext } from "@src/contexts/GameContext";

interface IArenaProps {}

const Arena: React.FunctionComponent<IArenaProps> = () => {
  const { score, timeLimit, updateScore, storeResult } = useGameContext();

  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [timeLeft, setTimeLeft] = useState(timeLimit);

  const router = useRouter();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  /* shuffling the image pairs to right and left side randomly */
  const shuffledImagesData = useMemo(
    () =>
      imagesData.map((pair) => {
        const randomOrder = Math.random() < 0.5;
        return {
          ...pair,
          correctImage: randomOrder ? pair.correctImage : pair.fakeImage,
          fakeImage: randomOrder ? pair.fakeImage : pair.correctImage,
        };
      }),
    []
  );

  const imagePairs = imagesData;
  const currentPair = shuffledImagesData[currentPairIndex];
  const totalChances = shuffledImagesData.length - 1;

  const handleImageSelect = (selectedImage: string, pairId: Number) => {
    setTimeLeft(0);
    const findPairWithId = imagePairs.find(
      (eachPair) => eachPair.id === pairId
    );
    const isCounterfeit = selectedImage === findPairWithId?.fakeImage;

    // notifying about the user selection and updating the score accordingly
    if (isCounterfeit) {
      toast.success("Bulls eye! fake detected :)", {
        duration: 1000,
      });
      updateScore(1);
    } else {
      toast.error("Sorry! wrong selection ;)", {
        duration: 1000,
      });
    }

    if (currentPairIndex > totalChances) {
      // reset the timer to 0 cause game is over
      setGameOver(true);
    }
  };

  const handleNext = () => {
    setCurrentPairIndex(currentPairIndex + 1);
    setTimeLeft(timeLimit);
  };

  const redirectToResults = () => {
    storeResult(score, new Date().getTime());
    router.push("/results");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="flex justify-between w-[75%] md:w-1/2 items-center">
        <div className="text-xl  md:text-3xl lg:text-5xl font-semibold transition-opacity mr-8 w-28">
          <span className="text-yellow-500">&#x265C;</span> {score}
        </div>
        <Progressbar currentSize={timeLeft} totalSize={timeLimit} />
        <div className="text-xl md:text-3xl lg:text-5xl font-semibold transition-opacity ml-8 w-28 text-right">
          0:{timeLeft}
        </div>
      </div>
      <div className="flex justify-around p-2 flex-wrap gap-5 md:gap-16 md:p-0">
        {gameOver ? (
          "Game over"
        ) : (
          <>
            <button
              onClick={() =>
                handleImageSelect(currentPair.correctImage, currentPair.id)
              }
              className="disabled:cursor-not-allowed"
              disabled={timeLeft === 0}
            >
              <Image
                className="border-4 rounded-md border-violet-300"
                alt={currentPair.correctImage}
                src={currentPair.correctImage}
                width={500}
                height={500}
              />
            </button>
            <button
              onClick={() =>
                handleImageSelect(currentPair.fakeImage, currentPair.id)
              }
              className="disabled:cursor-not-allowed"
              disabled={timeLeft === 0}
            >
              <Image
                className="border-4 rounded-md border-violet-300"
                alt={currentPair.fakeImage}
                src={currentPair.fakeImage}
                width={500}
                height={500}
              />
            </button>
          </>
        )}
      </div>
      <div className="min-h-[2rem] mt-2">
        {currentPairIndex < totalChances && timeLeft === 0 && (
          <button
            className=" border-violet-500 border-2 px-4 py-1 rounded-lg hover:bg-violet-700 shadow-neon-glow"
            onClick={handleNext}
          >
            Lets try another one.
          </button>
        )}
        {currentPairIndex >= totalChances && timeLeft === 0 && (
          <button
            className=" border-violet-500 border-2 px-4 py-1 rounded-lg shadow-neon-glow"
            onClick={redirectToResults}
          >
            View result
          </button>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Arena;
