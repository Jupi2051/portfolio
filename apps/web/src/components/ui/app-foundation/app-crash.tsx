import { useApplicationData } from "@/context/app-context";
import { motion } from "framer-motion";
import WavyText from "@/components/ui/wavy-text";
import OrbitLoader from "@/components/ui/orbit-loader";

const AppCrash = () => {
  const { processIcon } = useApplicationData();

  return (
    <motion.div className="w-full h-full bg-black flex flex-col items-center justify-center gap-10 z-50">
      <div className="relative flex items-center justify-center">
        <OrbitLoader className="z-0" size="w-20" failed={true} />
        <img
          src={processIcon}
          alt="App Loading"
          className="absolute top-1/2 left-1/2 -translate-1/2 w-12 p-1 z-10"
        />
      </div>
      <WavyText
        replay={true}
        text="App Crashed"
        className="text-ctp-red-600 text-2xl font-bold select-none uppercase"
      />
    </motion.div>
  );
};

export default AppCrash;
