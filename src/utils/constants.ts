export const imagesData = [
  {
    id: 1,
    correctImage: "/game-images/1-correct.png",
    fakeImage: "/game-images/1-fake.png",
    isCorrect: null,
  },
  {
    id: 2,
    correctImage: "/game-images/2-correct.png",
    fakeImage: "/game-images/2-fake.png",
    isCorrect: null,
  },
  {
    id: 3,
    correctImage: "/game-images/3-correct.png",
    fakeImage: "/game-images/3-fake.png",
    isCorrect: null,
  },
  {
    id: 4,
    correctImage: "/game-images/4-correct.png",
    fakeImage: "/game-images/4-fake.png",
    isCorrect: null,
  },
  {
    id: 5,
    correctImage: "/game-images/5-correct.png",
    fakeImage: "/game-images/5-fake.png",
    isCorrect: null,
  },
  {
    id: 6,
    correctImage: "/game-images/6-correct.png",
    fakeImage: "/game-images/6-fake.png",
    isCorrect: null,
  },
  {
    id: 7,
    correctImage: "/game-images/7-correct.png",
    fakeImage: "/game-images/7-fake.png",
    isCorrect: null,
  },
  {
    id: 8,
    correctImage: "/game-images/8-correct.png",
    fakeImage: "/game-images/8-fake.png",
    isCorrect: null,
  },
  {
    id: 9,
    correctImage: "/game-images/9-correct.png",
    fakeImage: "/game-images/9-fake.png",
    isCorrect: null,
  },
  {
    id: 10,
    correctImage: "/game-images/10-correct.png",
    fakeImage: "/game-images/10-fake.png",
    isCorrect: null,
  },
];

export interface ImageData {
  id: number;
  correctImage: string;
  fakeImage: string;
  isCorrect: boolean | null;
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const nameRegex = /^[a-zA-Z]+$/;
