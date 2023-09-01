import { ImageData } from "./constants";

export const shuffleArray = (array: ImageData[]): ImageData[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const formattedDateTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.toLocaleTimeString()}`;
};
// Shuffle the /imagesData array

export const validateWithRegex = (input: string, regex: RegExp): boolean => {
  return regex.test(input);
};
