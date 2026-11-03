import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import cn from "classnames"
import { ArrowRightIcon, PinIcon } from "@/components/ui/icons"
import { enterTransition, exitTransition } from "@/lib/motion"
import BoardMessage from "./board-message"
import {
  NOTE_COLORS,
  NOTE_MESSAGE_MAX,
  NOTE_MESSAGE_MIN,
  NOTE_NAME_MAX,
  NOTE_THEMES,
  type NoteColor,
} from "./note-colors"

interface PinFormProps {
  onSubmit?: (data: { name: string; message: string; color: string }) => void
  onCancel?: () => void
  /** "edit" while the note is following the cursor waiting to be placed. */
  type: "create" | "edit"
}

const EMPTY_FORM = { name: "", message: "", color: "pink" as NoteColor }

const floatingButton =
  "flex h-11.5 cursor-pointer items-center gap-2 rounded-[14px] px-4.5 text-sm font-semibold transition-[background-color,scale] duration-150 ease-out-strong active:scale-[0.97]"

const PinForm = ({ onSubmit, onCancel, type = "create" }: PinFormProps) => {
  const reduceMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const previousType = useRef(type)

  // Once a placed note lands (edit → create) start the next one fresh.
  useEffect(() => {
    if (previousType.current === "edit" && type === "create") setFormData(EMPTY_FORM)
    previousType.current = type
  }, [type])

  const name = formData.name.trim()
  const message = formData.message.trim()
  const isValid =
    name.length > 0 &&
    message.length >= NOTE_MESSAGE_MIN &&
    message.length <= NOTE_MESSAGE_MAX

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    onSubmit?.({ ...formData, name, message })
    setIsOpen(false)
  }

  const handleCancel = () => {
    onCancel?.()
    setFormData(EMPTY_FORM)
    setIsOpen(false)
  }

  const hidden = { opacity: 0, y: reduceMotion ? 0 : 8, scale: 0.97 }

  return (
    <>
      <div
        className="absolute right-4 bottom-4 z-40 flex gap-2 @xl/appwindow:right-5 @xl/appwindow:bottom-5"
        data-prevent-drag-scroll
      >
        {type === "edit" ? (
          <>
            <button
              type="button"
              onClick={handleCancel}
              className={cn(
                floatingButton,
                "border border-white/12 bg-ink/70 font-medium text-lilac backdrop-blur-xl hover:bg-ink/85",
              )}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className={cn(
                floatingButton,
                "border border-white/12 bg-ink/70 font-medium text-lilac backdrop-blur-xl hover:bg-ink/85",
              )}
            >
              Edit note
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={cn(
              floatingButton,
              "bg-holo text-ink-deep shadow-[0_14px_30px_rgba(6,5,16,0.5),0_0_0_4px_rgba(140,142,255,0.18)] hover:bg-holo-soft",
            )}
          >
            <PinIcon className="size-4" />
            Pin a note
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="compose"
            className="absolute inset-0 z-50 flex items-center justify-center p-4"
            data-prevent-drag-scroll
            exit={{ opacity: 1, transition: exitTransition }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setIsOpen(false)
            }}
          >
            <motion.div
              className="absolute inset-0 bg-[rgba(10,9,22,0.55)] backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: enterTransition }}
              exit={{ opacity: 0, transition: exitTransition }}
              onClick={() => setIsOpen(false)}
            />
            <motion.form
              onSubmit={handleSubmit}
              role="dialog"
              aria-label="Leave a note"
              className="relative flex max-h-full w-full max-w-170 overflow-hidden rounded-3xl border border-white/12 bg-[rgba(20,19,36,0.9)] shadow-[0_30px_80px_rgba(6,5,16,0.6)] backdrop-blur-2xl"
              initial={hidden}
              animate={{ opacity: 1, y: 0, scale: 1, transition: enterTransition }}
              exit={{ ...hidden, transition: exitTransition }}
            >
              <div className="flex w-full flex-col gap-4.5 overflow-y-auto px-7 pt-6.5 pb-6 @2xl/appwindow:w-90 @2xl/appwindow:shrink-0">
                <h2 className="font-serif text-[32px] leading-9 text-moon-bright italic">
                  Leave a note
                </h2>

                <label className="flex flex-col gap-1.75">
                  <span className="text-[13px] leading-4 font-medium text-lilac">
                    Your name
                  </span>
                  <input
                    autoFocus
                    value={formData.name}
                    maxLength={NOTE_NAME_MAX}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="What should we call you?"
                    className="h-10 rounded-[11px] border border-white/12 bg-white/5 px-3 text-sm text-moon outline-none placeholder:text-haze-dim focus:border-holo-soft/70 focus:shadow-[0_0_0_4px_rgba(140,142,255,0.12)]"
                  />
                </label>

                <label className="flex flex-col gap-1.75">
                  <span className="flex items-baseline justify-between">
                    <span className="text-[13px] leading-4 font-medium text-lilac">
                      Message
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[11px] leading-3.5 tabular-nums",
                        message.length > 0 && message.length < NOTE_MESSAGE_MIN
                          ? "text-[#ff8fa6]"
                          : "text-haze-dim",
                      )}
                    >
                      {formData.message.length} / {NOTE_MESSAGE_MAX}
                    </span>
                  </span>
                  <textarea
                    value={formData.message}
                    maxLength={NOTE_MESSAGE_MAX}
                    rows={3}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Say hi, leave a doodle in words…"
                    className="resize-none rounded-[11px] border border-white/12 bg-white/5 px-3 py-2.5 text-sm leading-5 text-moon outline-none placeholder:text-haze-dim focus:border-holo-soft/70 focus:shadow-[0_0_0_4px_rgba(140,142,255,0.12)]"
                  />
                </label>

                <div className="flex flex-col gap-2.25">
                  <span className="text-[13px] leading-4 font-medium text-lilac">
                    Paper
                  </span>
                  <div className="flex flex-wrap gap-2" role="radiogroup">
                    {NOTE_COLORS.map((color) => {
                      const selected = formData.color === color
                      return (
                        <button
                          key={color}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          aria-label={NOTE_THEMES[color].label}
                          title={NOTE_THEMES[color].label}
                          onClick={() => setFormData((prev) => ({ ...prev, color }))}
                          className={cn(
                            "size-6.5 cursor-pointer rounded-full transition-[scale,box-shadow] duration-150 ease-out-strong hover:scale-110",
                            selected
                              ? "border-2 border-panel shadow-[0_0_0_2px_#a9aaff]"
                              : "border border-white/20",
                          )}
                          style={{ backgroundColor: NOTE_THEMES[color].paper }}
                        />
                      )
                    })}
                  </div>
                </div>

                <div className="mt-auto flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="h-10.5 cursor-pointer rounded-xl border border-white/12 px-4 text-sm font-medium text-lilac transition-colors duration-150 ease-out-strong hover:bg-white/6"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="flex h-10.5 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-holo text-sm font-semibold text-ink-deep transition-[background-color,scale,opacity] duration-150 ease-out-strong hover:bg-holo-soft active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Pick a spot
                    <ArrowRightIcon className="size-3.75" />
                  </button>
                </div>
              </div>

              <div className="relative hidden flex-1 items-center justify-center border-l border-white/8 bg-[url(/Imgs/Apps/Backgrounds/pinboard-texture.jpg)] bg-cover bg-center p-6 @2xl/appwindow:flex">
                <span className="absolute top-4.5 left-4.5 text-[11px] leading-3.5 font-semibold tracking-[0.14em] text-haze uppercase">
                  Preview
                </span>
                <BoardMessage
                  preview
                  seed="preview"
                  name={name || "You"}
                  content={message || "Your note will look like this."}
                  color={formData.color}
                />
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PinForm
