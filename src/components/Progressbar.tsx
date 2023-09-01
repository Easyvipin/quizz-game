import React from "react";

interface IProgressbarProps {
  totalSize: number;
  currentSize: number;
}

const Progressbar: React.FunctionComponent<IProgressbarProps> = ({
  totalSize,
  currentSize,
}) => {
  const proportion = currentSize / totalSize;
  const percentage = Math.min(100, proportion * 100);

  return (
    <div
      className={` bg-violet-100 h-6 w-[15rem] rounded-full border-2 shadow-neon-glow border-violet-300 ${
        percentage > 0 ? "animate-bounce" : ""
      }`}
    >
      <div
        className={`bg-violet-500 h-[100%] text-end ${
          percentage > 0 ? "px-2" : ""
        }  rounded-full transition-all`}
        style={{
          width: `${percentage}%`,
        }}
      ></div>
    </div>
  );
};

export default Progressbar;
