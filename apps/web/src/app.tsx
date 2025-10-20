import Surface from "@/components/surface";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/intro";
import useApplicationURLParams from "./hooks/use-application-url-params";

function app() {
  const urlParams = useApplicationURLParams();
  const [loaded, setLoaded] = useState(urlParams.length > 0);

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
