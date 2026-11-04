import cn from "classnames"

type Props = {
  title: string
  author: string
  onTitleChange: (value: string) => void
  onAuthorChange: (value: string) => void
  disabled: boolean
  errorMessage: string | null
}

const inputClass = cn(
  "h-10 rounded-[11px] border border-white/12 bg-white/5 px-3 text-sm text-moon outline-none placeholder:text-haze-dim",
  "transition-[border-color,box-shadow] duration-150 ease-out-strong",
  "focus:border-holo-soft/70 focus:bg-white/6 focus:shadow-[0_0_0_4px_rgba(140,142,255,0.12)] disabled:opacity-50",
)

export default function VicoPublishFormFields({
  title,
  author,
  onTitleChange,
  onAuthorChange,
  disabled,
  errorMessage,
}: Props) {
  return (
    <>
      <label className="flex flex-col gap-1.75">
        <span className="text-[13px] leading-4 font-medium text-lilac">Title</span>
        <input
          autoFocus
          type="text"
          value={title}
          maxLength={80}
          onChange={(e) => onTitleChange(e.target.value)}
          disabled={disabled}
          placeholder="Moon cat"
          className={inputClass}
        />
      </label>
      <label className="flex flex-col gap-1.75">
        <span className="text-[13px] leading-4 font-medium text-lilac">Your name</span>
        <input
          type="text"
          value={author}
          maxLength={40}
          onChange={(e) => onAuthorChange(e.target.value)}
          disabled={disabled}
          placeholder="What should we call you?"
          className={inputClass}
        />
      </label>

      {errorMessage ? (
        <p
          role="alert"
          className="rounded-xl border border-melon/35 bg-melon/10 px-3 py-2.5 text-[13px] leading-4.5 text-[#ff8fa6]"
        >
          {errorMessage}
        </p>
      ) : null}
    </>
  )
}
