import { motion } from "framer-motion";
import Julogo from "@/components/apps/about-me/jupi-logo";
import OrbitLoader from "@/components/ui/orbit-loader";
import WavyText from "@/components/ui/wavy-text";

const Intro = ({ setLoaded }: { setLoaded: (loaded: boolean) => void }) => {
  return (
    <motion.div
      className="absolute inset-0 w-screen h-dvh text-white overflow-hidden select-none z-50 bg-black cursor-pointer"
      onClick={() => setLoaded(true)}
      exit={{
        opacity: 0,
        transition: { delay: 0.3, ease: "easeOut" },
      }}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center bg-gradient-to-br bg-black"
        transition={{ delay: 0.5, ease: "easeInOut" }}
        initial={{ scale: 1.2, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        exit={{
          scale: 2,
          filter: "blur(10px)",
          transition: { delay: 0, ease: "easeOut" },
        }}
      >
        <div className="flex items-center justify-center flex-col gap-20 relative">
          <div className="relative">
            <Julogo
              className="w-18 absolute top-1/2 left-1/2 -translate-1/2"
              Size={210}
              skipEnterAnimation={true}
            />
            <OrbitLoader className="absolute top-1/2" moonClassName="!w-4" />
          </div>
          <WavyText
            text="Welcome"
            replay={true}
            className="text-4xl px-2 font-caveat absolute top-full translate-y-full pt-2"
            delay={0.8}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Intro;
