import { useWindowSize } from "usehooks-ts";

const useMediaQuery = (
  query: "sm" | "md" | "lg" | "xl" | "2xl",
  biggerThan?: boolean
) => {
  const { width = 0 } = useWindowSize();
  switch (query) {
    case "sm":
      return biggerThan ? width > 640 : width < 640;
    case "md":
      return biggerThan ? width > 768 : width < 768;
    case "lg":
      return biggerThan ? width > 1024 : width < 1024;
    case "xl":
      return biggerThan ? width > 1280 : width < 1280;
    case "2xl":
      return biggerThan ? width > 1536 : width < 1536;
  }
};

export default useMediaQuery;
