import { useMediaQuery } from "usehooks-ts"

const useTailwindMediaQuery = () => {
  const isSm = useMediaQuery("(min-width: 40rem)")
  const isMd = useMediaQuery("(min-width: 48rem)")
  const isLg = useMediaQuery("(min-width: 64rem)")
  const isXl = useMediaQuery("(min-width: 80rem)")
  const is2xl = useMediaQuery("(min-width: 96rem)")
  const is3xl = useMediaQuery("(min-width: 2328px)")

  const isMobile = !isSm && !isMd && !isLg && !isXl && !is2xl && !is3xl

  const isPastPoint = (point: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl") => {
    switch (point) {
      case "sm":
        return isSm
      case "md":
        return isMd
      case "lg":
        return isLg
      case "xl":
        return isXl
      case "2xl":
        return is2xl
      case "3xl":
        return is3xl
      default:
        return false
    }
  }

  const currentBreakpoint = is3xl
    ? "3xl"
    : is2xl
      ? "2xl"
      : isXl
        ? "xl"
        : isLg
          ? "lg"
          : isMd
            ? "md"
            : isSm
              ? "sm"
              : isMobile
                ? "mobile"
                : "sm"

  return {
    isMobile,
    isSm: isSm && !isMd && !isLg && !isXl && !is2xl && !is3xl,
    isMd: isMd && !isLg && !isXl && !is2xl && !is3xl,
    isLg: isLg && !isXl && !is2xl && !is3xl,
    isXl: isXl && !is2xl && !is3xl,
    is2xl: is2xl && !is3xl,
    is3xl: is3xl,
    currentBreakpoint,
    isPastPoint,
  }
}

export default useTailwindMediaQuery
