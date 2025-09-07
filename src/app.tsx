import Surface from "@/components/surface";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/intro";

function app() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  return (
    <AnimatePresence>
      {loaded ? (
        <div className={"App"}>
          <Surface key={"surface"} />
        </div>
      ) : (
        <LoadingScreen key={"loading-screen"} setLoaded={setLoaded} />
      )}
    </AnimatePresence>
  );
}

export default app;
