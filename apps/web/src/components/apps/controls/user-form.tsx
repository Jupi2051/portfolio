import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import cn from "classnames"
import { useMutation } from "@tanstack/react-query"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useTRPC } from "@/lib/trpc/trpc"
import useBackground from "@/hooks/use-background"
import FocusedImage from "@/components/ui/focused-image"
import {
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  SparkleIcon,
} from "@/components/ui/icons"
import { EASE_OUT } from "@/lib/motion"

interface UserFormProps {
  type: "register" | "login"
  onSuccess: () => void
}

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const fieldShell =
  "flex flex-col gap-0.75 rounded-xl border px-3.5 pt-2.5 pb-2.75 transition-[border-color,box-shadow,background-color] duration-150 ease-out-strong"

const fieldIdle =
  "border-white/10 bg-white/4 focus-within:border-holo-soft/70 focus-within:bg-white/6 focus-within:shadow-[0_0_0_4px_rgba(140,142,255,0.12)]"

const fieldError = "border-melon/55 bg-melon/6"

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          className="px-1 text-xs text-[#ffb3c2]"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15, ease: EASE_OUT }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

function UserForm({ type, onSuccess }: UserFormProps) {
  const trpc = useTRPC()
  const reduceMotion = useReducedMotion()
  const { currentWallpaperImageUrl, currentWallpaperFocus } = useBackground()
  const loginUser = useMutation(trpc.users.login.mutationOptions())
  const registerUser = useMutation(trpc.users.register.mutationOptions())
  const [showPassword, setShowPassword] = useState(false)

  const isLogin = type === "login"
  const schema = isLogin ? loginSchema : registerSchema

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onChange: schema },
    onSubmit: async ({ value }) => {
      const mutation = isLogin ? loginUser : registerUser
      mutation.mutate(value, {
        onSuccess: () => {
          form.reset()
          onSuccess()
        },
        onError: (error) => {
          console.error("Authentication error:", error)
        },
      })
    },
  })

  const mutation = isLogin ? loginUser : registerUser
  const isLoading = form.state.isSubmitting || mutation.isPending
  const error = mutation.error?.message

  return (
    <div className="flex h-full min-h-0 w-full">
      <div className="relative hidden w-[44%] max-w-115 shrink-0 flex-col justify-end overflow-hidden border-r border-white/8 bg-ink @2xl/appwindow:flex">
        <FocusedImage
          src={currentWallpaperImageUrl}
          focus={currentWallpaperFocus}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,13,26,0.1)_0%,rgba(14,13,26,0.35)_45%,rgba(14,13,26,0.92)_100%)]" />
        <div className="relative flex flex-col gap-2.5 px-9 pb-9">
          <span className="flex items-center gap-2 text-xs leading-4 font-semibold tracking-[0.14em] text-[#e4e2ff] uppercase">
            <SparkleIcon className="size-3.5 text-spark" />
            Jupi's desk
          </span>
          <span className="font-serif text-7xl leading-17.5 tracking-[-0.02em] text-white italic [text-shadow:0_6px_30px_rgba(6,5,16,0.5)]">
            Controls
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between px-8 pt-9 pb-7 @2xl/appwindow:px-14">
        <span />
        <motion.form
          className="flex w-full max-w-90 flex-col gap-6.5"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <h1 className="font-serif text-[44px] leading-11.5 tracking-[-0.01em] text-moon-bright">
            {isLogin ? "Welcome back." : "Set up the desk."}
          </h1>

          <div className="flex flex-col gap-3">
            <form.Field
              name="email"
              children={(field) => {
                const message = field.state.meta.isTouched
                  ? field.state.meta.errors[0]?.message
                  : undefined
                return (
                  <div className="flex flex-col gap-1.5">
                    <label
                      className={cn(fieldShell, message ? fieldError : fieldIdle)}
                    >
                      <span className="text-[11px] leading-3.5 font-semibold tracking-[0.08em] text-haze-dim uppercase">
                        Email
                      </span>
                      <input
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        disabled={isLoading}
                        className="bg-transparent text-[15px] leading-5 text-moon outline-none placeholder:text-haze-dim/70"
                      />
                    </label>
                    <FieldError message={message} />
                  </div>
                )
              }}
            />

            <form.Field
              name="password"
              children={(field) => {
                const message = field.state.meta.isTouched
                  ? field.state.meta.errors[0]?.message
                  : undefined
                return (
                  <div className="flex flex-col gap-1.5">
                    <label
                      className={cn(
                        fieldShell,
                        "flex-row items-center justify-between pr-2.5",
                        message ? fieldError : fieldIdle,
                      )}
                    >
                      <span className="flex min-w-0 flex-1 flex-col gap-0.75">
                        <span className="text-[11px] leading-3.5 font-semibold tracking-[0.08em] text-haze-dim uppercase">
                          Password
                        </span>
                        <input
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          type={showPassword ? "text" : "password"}
                          autoComplete={isLogin ? "current-password" : "new-password"}
                          placeholder="••••••••"
                          disabled={isLoading}
                          className="bg-transparent text-[15px] leading-5 text-moon outline-none placeholder:text-haze-dim/70"
                        />
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-haze transition-colors duration-150 ease-out-strong hover:bg-white/8 hover:text-moon"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="size-4.5" />
                        ) : (
                          <EyeIcon className="size-4.5" />
                        )}
                      </button>
                    </label>
                    <FieldError message={message} />
                  </div>
                )
              }}
            />
          </div>

          <AnimatePresence initial={false}>
            {error && (
              <motion.p
                className="rounded-xl border border-melon/30 bg-melon/10 px-3.5 py-2.5 text-[13px] text-[#ffb3c2]"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: EASE_OUT }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isLoading}
            className="flex h-11.5 cursor-pointer items-center justify-center gap-2 rounded-xl bg-moon text-sm font-semibold text-ink shadow-[0_10px_28px_rgba(140,142,255,0.22)] transition-[background-color,scale] duration-150 ease-out-strong hover:bg-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <span className="size-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
            ) : null}
            {isLoading
              ? isLogin
                ? "Signing in…"
                : "Creating account…"
              : isLogin
                ? "Sign in"
                : "Create account"}
            {!isLoading && <ArrowRightIcon className="size-4" />}
          </button>
        </motion.form>

        <p className="text-xs leading-4 text-haze-dim">
          {isLogin
            ? "No account? Nice try — this desk only has one key."
            : "Already have an account? Someone's getting a bit eager."}
        </p>
      </div>
    </div>
  )
}

export default UserForm
