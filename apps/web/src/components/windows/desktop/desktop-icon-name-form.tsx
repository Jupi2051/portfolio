import { useEffect, useRef } from "react"
import { useForm } from "@tanstack/react-form"

type PropTypes = {
  value: string
  onSubmit: (value: string) => void
  onCancel: () => void
}

function DesktopIconNameForm({ value, onSubmit, onCancel }: PropTypes) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const syncTextareaHeight = () => {
    if (!textareaRef.current) return
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
    requestAnimationFrame(syncTextareaHeight)
  }, [form, value])

  return (
    <form
      className="flex w-full justify-center"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
    >
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
              syncTextareaHeight()
            }}
            autoFocus
            rows={1}
            className="w-fit max-w-full resize-none overflow-hidden rounded-md border border-holo-soft/60 bg-ink-deep px-1.5 py-0.5 text-center font-sans text-[13px] leading-4 font-medium whitespace-pre-wrap wrap-break-word text-moon outline-none field-sizing-content selection:bg-holo/40 focus:border-holo-soft"
          />
        )}
      />
    </form>
  )
}

export default DesktopIconNameForm
