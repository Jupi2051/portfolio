type Props = {
  title: string;
  author: string;
  onTitleChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  disabled: boolean;
  errorMessage: string | null;
};

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
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-ctp-subtext0">
            Title
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            disabled={disabled}
            placeholder="My drawing"
            className="rounded-lg border border-ctp-surface1 bg-ctp-base px-3 py-2 text-sm text-ctp-text outline-none transition placeholder:text-ctp-overlay0 focus:border-ctp-lavender focus:ring-2 focus:ring-ctp-lavender/30 disabled:opacity-50"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-ctp-subtext0">
            Author
          </span>
          <input
            type="text"
            value={author}
            onChange={(e) => onAuthorChange(e.target.value)}
            disabled={disabled}
            placeholder="Your name"
            className="rounded-lg border border-ctp-surface1 bg-ctp-base px-3 py-2 text-sm text-ctp-text outline-none transition placeholder:text-ctp-overlay0 focus:border-ctp-lavender focus:ring-2 focus:ring-ctp-lavender/30 disabled:opacity-50"
          />
        </label>
      </div>

      {errorMessage ? (
        <p
          className="mt-3 rounded-lg border border-ctp-red/40 bg-ctp-red/10 px-3 py-2 text-sm text-ctp-red"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}
    </>
  );
}
