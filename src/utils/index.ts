import { ImageData, imagesData } from "./constants";

export const shuffleArray = (array: ImageData[]): ImageData[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // shuffle the pairs randomly
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const swapImages = () =>
  shuffleArray(imagesData).map((pair) => {
    const randomOrder = Math.random() < 0.5;
    return {
      ...pair,
      correctImage: randomOrder ? pair.correctImage : pair.fakeImage,
      fakeImage: randomOrder ? pair.fakeImage : pair.correctImage,
    };
  });

export const formattedTimeString = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.toLocaleTimeString()}`;
};

export const validateWithRegex = (input: string, regex: RegExp): boolean => {
  return regex.test(input);
};

export const messageBasedOnScore = (score: number) => {
  if (score === 10) {
    return "You spotted like a pro";
  } else if (score > 0) {
    return `${score} fake ones were spotted`;
  } else if (score === 0) {
    return "Not able to spot any fake ones";
  }
};
