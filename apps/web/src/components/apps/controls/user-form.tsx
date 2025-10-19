import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useTRPC } from "@/lib/trpc/trpc";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";

interface UserFormProps {
  type: "register" | "login";
  onSuccess: () => void;
}

// Define validation schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

function UserForm({ type, onSuccess }: UserFormProps) {
  const trpc = useTRPC();
  const loginUser = useMutation(trpc.users.login.mutationOptions());
  const registerUser = useMutation(trpc.users.register.mutationOptions());
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = type === "login";
  const schema = isLogin ? loginSchema : registerSchema;

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      const mutation = isLogin ? loginUser : registerUser;

      mutation.mutate(value, {
        onSuccess: () => {
          form.reset();
          onSuccess();
        },
        onError: (error) => {
          console.error("Authentication error:", error);
        },
      });
    },
  });

  const mutation = isLogin ? loginUser : registerUser;
  const isLoading = form.state.isSubmitting || mutation.isPending;
  const error = mutation.error?.message;

  const title = isLogin ? "Welcome Back!" : "Join Us Today!";
  const subtitle = isLogin
    ? "Sign in to continue your journey"
    : "Create your account to get started";
  const buttonText = isLoading
    ? isLogin
      ? "Signing In..."
      : "Creating Account..."
    : isLogin
    ? "Sign In"
    : "Create Account";

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants: Variants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ctp-base to-ctp-mantle p-4">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-ctp-pink to-ctp-mauve rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl">{isLogin ? "🔑" : "✨"}</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold text-ctp-text mb-2"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-ctp-subtext1 text-lg"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="bg-ctp-surface0/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-ctp-surface1/20"
          variants={itemVariants}
          whileHover={{
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            transition: { duration: 0.3 },
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <form.Field
                name="email"
                children={(field) => (
                  <div className="space-y-2">
                    <label className="text-ctp-text font-medium text-sm">
                      Email Address
                    </label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full h-12 px-4 bg-ctp-surface1 border-2 border-ctp-surface2 rounded-xl text-ctp-text placeholder-ctp-subtext0 focus:border-ctp-blue focus:outline-none transition-all duration-300"
                        type="email"
                        placeholder="Enter your email..."
                        disabled={isLoading}
                      />
                    </motion.div>
                    <AnimatePresence>
                      {field.state.meta.errors.length > 0 && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-ctp-red text-sm"
                        >
                          {field.state.meta.errors[0]?.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              />
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <form.Field
                name="password"
                children={(field) => (
                  <div className="space-y-2">
                    <label className="text-ctp-text font-medium text-sm">
                      Password
                    </label>
                    <motion.div
                      className="relative"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full h-12 px-4 pr-12 bg-ctp-surface1 border-2 border-ctp-surface2 rounded-xl text-ctp-text placeholder-ctp-subtext0 focus:border-ctp-blue focus:outline-none transition-all duration-300"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password..."
                        disabled={isLoading}
                      />
                      <motion.button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-ctp-subtext0 hover:text-ctp-text transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </motion.button>
                    </motion.div>
                    <AnimatePresence>
                      {field.state.meta.errors.length > 0 && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-ctp-red text-sm"
                        >
                          {field?.state.meta.errors[0]?.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              />
            </motion.div>

            {/* Global Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-ctp-red/10 border border-ctp-red/20 rounded-xl p-4"
                >
                  <p className="text-ctp-red text-sm text-center font-medium">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                className="w-full cursor-pointer h-14 bg-gradient-to-r from-ctp-pink to-ctp-mauve text-ctp-base font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                type="submit"
                disabled={isLoading}
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-ctp-mauve to-ctp-pink opacity-0"
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-ctp-base border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ) : (
                    <span>{isLogin ? "🔓" : "🚀"}</span>
                  )}
                  {buttonText}
                </span>
              </motion.button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div className="text-center mt-6" variants={itemVariants}>
            <p className="text-ctp-subtext1 text-sm">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <span className="text-ctp-yellow">
                    Well, well, well... looks like someone's trying to sneak in!
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span className="text-ctp-yellow">
                    Oops! Someone's getting a bit too eager!
                  </span>
                </>
              )}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default UserForm;
