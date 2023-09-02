import React from "react";
import Image from "next/image";

interface IClickableImageProps {
  onClick: () => void;
  width: number;
  height: number;
  src: string;
  alt: string;
  disable: boolean;
}

const ClickableImage: React.FunctionComponent<IClickableImageProps> = ({
  onClick,
  width,
  height,
  src,
  alt,
  disable,
}) => {
  return (
    <button
      onClick={onClick}
      className="disabled:cursor-not-allowed"
      disabled={disable}
    >
      <Image
        className="border-4 rounded-md border-violet-300 hover:shadow-neon-glow"
        alt={alt}
        src={src}
        width={width}
        height={height}
        fetchPriority="high"
      />
    </button>
  );
};

export default ClickableImage;
