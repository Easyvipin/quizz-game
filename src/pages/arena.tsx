import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { imagesData } from "@src/utils/constants";
import { useGameContext } from "@src/contexts/GameContext";
import { swapImages } from "@src/utils";
import ClickableImage from "@components/ClickableImage";
import GameStatusDisplay from "@components/GameStatusDisplay";
import Button from "@components/Button";

interface IArenaProps {}

const Arena: React.FunctionComponent<IArenaProps> = () => {
  const { score, timeLimit, updateScore, storeResult } = useGameContext();

  const [currentPairIndex, setCurrentPairIndex] = useState(0);
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

  const shuffledImagesData = useMemo(() => swapImages(), []);

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
    <div className="flex flex-col justify-center items-center h-screen gap-4 p-2">
      <p className="text-sm md:text-lg  font-light text-violet-400 text-center ">
        Spot the fake by clicking on one of the images
      </p>
      <GameStatusDisplay
        score={score}
        timeLeft={timeLeft}
        timeLimit={timeLimit}
      />
      <div className="flex justify-around p-2 flex-wrap md:flex-nowrap gap-5 md:gap-16 md:p-0">
        <ClickableImage
          onClick={() =>
            handleImageSelect(currentPair.correctImage, currentPair.id)
          }
          src={currentPair.correctImage}
          alt="website image"
          width={492}
          height={276}
          disable={timeLeft === 0}
        />
        <ClickableImage
          onClick={() =>
            handleImageSelect(currentPair.fakeImage, currentPair.id)
          }
          src={currentPair.fakeImage}
          alt="website image"
          width={492}
          height={276}
          disable={timeLeft === 0}
        />
      </div>
      <div className="md:min-h-[2rem] lg:min-h-[10rem] mt-2">
        {currentPairIndex < totalChances && timeLeft === 0 && (
          <div className="flex flex-col gap-4">
            <Button className="shadow-neon-glow" onClick={handleNext}>
              Lets try another one.
            </Button>
          </div>
        )}
        {currentPairIndex >= totalChances && timeLeft === 0 && (
          <div className="flex flex-col gap-4 h-[10rem]">
            <h5 className="text-xl lg:text-5xl text-center font-sans font-extralight text-red-400">
              GAME OVER
            </h5>
            <div className="flex gap-4">
              <Button
                variant="primary"
                className="shadow-neon-glow "
                onClick={redirectToResults}
              >
                View result
              </Button>
              <Button
                variant="ghost"
                className="shadow-soft-elevate"
                onClick={() => {
                  router.reload();
                }}
              >
                Restart game
              </Button>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Arena;
