import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const redirectToArena = () => {
    router.push("/arena");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 md:p-0">
        <motion.h1 className="text-[3rem] md:text-[5rem]">Spot.</motion.h1>
        <h3 className="text-[3rem] md:text-[6rem] text-violet-500 -mt-6 md:-mt-7 font-thin">
          The
          <motion.span
            initial={{ opacity: 0 }} // Initial state, outside the screen to the left
            animate={{ opacity: 1 }}
            transition={{
              duration: 3,
            }}
            className="font-semibold"
          >
            fake.
          </motion.span>
        </h3>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            className="block px-4 py-2 text-violet-400 border border-gray-500 rounded-md hover:bg-violet-600 hover:text-gray-100 shadow-neon-glow"
            onClick={redirectToArena}
          >
            Lets Play
          </button>
          <div>
            <p className="text-[0.7rem] text-gray-300 font-mono">
              You have 15 seconds to pick the fake website from image pairs.
            </p>
            <p className="text-[0.7rem] text-gray-300 font-mono">
              Choose an image, get feedback, and proceed.
            </p>
            <p className="text-[0.7rem] text-gray-300 font-mono">
              After the last set, see your 0-10 score. Retry if you want to give
              another try!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
