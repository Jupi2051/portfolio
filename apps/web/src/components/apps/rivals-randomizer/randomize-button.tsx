import { useState } from "react"

type RandomizeButtonProps = {
  onClick: () => void
  disabled: boolean
  label: string
}

/** The "Randomize Teams" button: slanted panel with a glitch flicker on click. */
export default function RandomizeButton({ onClick, disabled, label }: RandomizeButtonProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  function handleClick() {
    setIsGlitching(true)
    onClick()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onAnimationEnd={() => setIsGlitching(false)}
      disabled={disabled}
      className={`[clip-path:polygon(16px_0,100%_0,calc(100%-16px)_100%,0_100%)] cursor-pointer border border-ctp-lavender/50 bg-black/75 px-11 py-3 font-jockey-one text-lg tracking-widest text-ctp-lavender uppercase shadow-lg shadow-ctp-lavender/40 backdrop-blur-sm transition-all duration-150 hover:scale-105 hover:bg-black/60 hover:shadow-ctp-lavender/70 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 ${
        isGlitching ? "animate-[rivals-glitch_500ms_steps(2,end)]" : ""
      }`}
    >
      {label}
    </button>
  )
}
