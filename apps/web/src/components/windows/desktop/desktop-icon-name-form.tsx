import { useEffect, useRef } from "react"
import { useForm } from "@tanstack/react-form"

type PropTypes = {
  value: string
  onSubmit: (value: string) => void
  onCancel: () => void
}

function DesktopIconNameForm({ value, onSubmit, onCancel }: PropTypes) {
  const formRef = useRef<HTMLFormElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const textareaSizerRef = useRef<HTMLSpanElement>(null)
  const MIN_TEXTAREA_WIDTH_PX = 28

  const syncTextareaSize = () => {
    if (!formRef.current || !textareaRef.current || !textareaSizerRef.current)
      return

    const maxTextareaWidthPx = formRef.current.clientWidth

    textareaSizerRef.current.textContent = textareaRef.current.value || " "
    const nextWidth = Math.min(
      maxTextareaWidthPx,
      Math.max(
        MIN_TEXTAREA_WIDTH_PX,
        Math.ceil(textareaSizerRef.current.scrollWidth) + 2,
      ),
    )

    textareaRef.current.style.width = `${nextWidth}px`
    textareaRef.current.style.height = "0px"
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }

  const form = useForm({
    defaultValues: {
      name: value,
    },
    onSubmit: ({ value: formValues }) => {
      onSubmit(formValues.name)
    },
  })

  useEffect(() => {
    form.setFieldValue("name", value)
    requestAnimationFrame(syncTextareaSize)
  }, [form, value])

  return (
    <form
      ref={formRef}
      className="absolute top-[calc(75%+0.1rem)] w-full"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
    >
      <span
        ref={textareaSizerRef}
        className="absolute -z-10 invisible font-normal text-xs uppercase font-roboto-condensed px-1 py-0.5 whitespace-pre"
      >
        {value || " "}
      </span>
      <form.Field
        name="name"
        children={(field) => (
          <textarea
            ref={textareaRef}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault()
                event.stopPropagation()
                field.handleChange(value)
                onCancel()
                return
              }

              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault()
                event.stopPropagation()
                form.handleSubmit()
              }
            }}
            onChange={(event) => {
              field.handleChange(event.target.value)
              syncTextareaSize()
            }}
            autoFocus
            rows={1}
            className="max-w-full border bg-white border-white/50 rounded-sm font-normal text-xs select-none uppercase text-center font-roboto-condensed text-black outline-none focus:border-white px-1 py-0.5 leading-4 resize-none overflow-hidden whitespace-pre-wrap break-all"
          />
        )}
      />
    </form>
  )
}

export default DesktopIconNameForm
