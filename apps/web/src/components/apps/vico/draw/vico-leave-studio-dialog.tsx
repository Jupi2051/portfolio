import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { enterTransition, exitTransition } from "@/lib/motion";
import { useEscapeKey } from "../shared/use-escape-key";

type Props = {
  open: boolean;
  onStay: () => void;
  onLeave: () => void;
};

export default function VicoLeaveStudioDialog({ open, onStay, onLeave }: Props) {
  const reduceMotion = useReducedMotion();
  useEscapeKey(open, onStay);

  const hidden = { opacity: 0, y: reduceMotion ? 0 : 8, scale: 0.97 };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="vico-leave"
          className="absolute inset-0 z-45 flex items-center justify-center p-4"
          exit={{ opacity: 1, transition: exitTransition }}
        >
          <motion.div
            className="absolute inset-0 bg-[rgba(10,9,22,0.6)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: enterTransition }}
            exit={{ opacity: 0, transition: exitTransition }}
            onClick={onStay}
          />
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="vico-leave-studio-title"
            aria-describedby="vico-leave-studio-desc"
            className="relative w-full max-w-sm rounded-3xl border border-white/12 bg-[rgba(20,19,36,0.96)] px-6.5 pt-6 pb-5.5 shadow-[0_30px_80px_rgba(6,5,16,0.6)]"
            initial={hidden}
            animate={{ opacity: 1, y: 0, scale: 1, transition: enterTransition }}
            exit={{ ...hidden, transition: exitTransition }}
          >
            <h2
              id="vico-leave-studio-title"
              className="font-serif text-[28px] leading-8 text-moon-bright italic"
            >
              Leave the studio?
            </h2>
            <p
              id="vico-leave-studio-desc"
              className="mt-2 text-sm leading-5 text-haze"
            >
              Your sketch isn't saved anywhere — heading back to the gallery
              clears the canvas.
            </p>
            <div className="mt-5.5 flex gap-2">
              <button
                type="button"
                autoFocus
                onClick={onStay}
                className="h-10.5 flex-1 cursor-pointer rounded-xl bg-holo text-sm leading-4.5 font-semibold text-ink-deep transition-[background-color,scale] duration-150 ease-out-strong hover:bg-holo-soft active:scale-[0.97]"
              >
                Keep drawing
              </button>
              <button
                type="button"
                onClick={onLeave}
                className="h-10.5 shrink-0 cursor-pointer rounded-xl border border-white/12 px-4 text-sm leading-4.5 font-medium text-[#ff8fa6] transition-[background-color] duration-150 ease-out-strong hover:bg-melon/10"
              >
                Discard &amp; leave
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
