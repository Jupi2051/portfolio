import { useApplicationData } from "@/context/app-context";
import { motion } from "framer-motion";
import WavyText from "@/components/ui/wavy-text";
import OrbitLoader from "@/components/ui/orbit-loader";

const AppLoading = () => {
  const { processIcon } = useApplicationData();

  return (
    <motion.div
      className="w-full h-full bg-black flex flex-col items-center justify-center gap-10 z-50"
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 4 } }}
      transition={{ duration: 4 }}
      key="app-loading"
    >
      <div className="relative flex items-center justify-center">
        <OrbitLoader className="z-0" size="w-20" />
        <img
          src={processIcon}
          alt="App Loading"
          className="absolute top-1/2 left-1/2 -translate-1/2 w-12 p-1 z-10"
        />
      </div>
      <WavyText
        replay={true}
        text="Loading..."
        className="text-white text-2xl font-bold"
      />
    </motion.div>
  );
};

export default AppLoading;
