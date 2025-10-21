import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

interface PinFormProps {
  onSubmit?: (data: { name: string; message: string; color: string }) => void;
  onCancel?: () => void;
  type: "create" | "edit";
}

type ColorOption =
  | "white"
  | "black"
  | "blue"
  | "green"
  | "red"
  | "pink"
  | "yellow"
  | "gray"
  | "purple";

const PinForm = ({ onSubmit, onCancel, type = "create" }: PinFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    color: "blue" as ColorOption,
  });

  const colorOptions: ColorOption[] = [
    "white",
    "black",
    "blue",
    "green",
    "red",
    "pink",
    "yellow",
    "gray",
    "purple",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.message.trim()) {
      onSubmit?.(formData);
      setFormData({ name: "", message: "", color: "blue" });
      setIsOpen(false);
    }
  };

  const handleColorSelect = (color: ColorOption) => {
    setFormData((prev) => ({ ...prev, color }));
  };

  const handleCancel = () => {
    onCancel?.();
    setFormData({ name: "", message: "", color: "blue" });
    setIsOpen(false);
  };

  const getColorClasses = (color: ColorOption) => {
    switch (color) {
      case "blue":
        return "bg-blue-100/80";
      case "white":
        return "bg-white/80";
      case "black":
        return "bg-black/95 border-gray-700";
      case "green":
        return "bg-green-100/80";
      case "red":
        return "bg-red-100/80";
      case "pink":
        return "bg-pink-100/80";
      case "yellow":
        return "bg-yellow-100/80";
      case "gray":
        return "bg-gray-100/80";
      case "purple":
        return "bg-gradient-to-br from-ctp-mauve/20 to-ctp-mauve/30 border-ctp-mauve/40";
      default:
        return "bg-blue-100/80";
    }
  };

  const getColorButtonClasses = (color: ColorOption) => {
    switch (color) {
      case "blue":
        return "bg-blue-500 hover:bg-blue-600";
      case "white":
        return "bg-white border-2 border-gray-300 hover:bg-gray-100";
      case "black":
        return "bg-black hover:bg-gray-800";
      case "green":
        return "bg-green-500 hover:bg-green-600";
      case "red":
        return "bg-red-500 hover:bg-red-600";
      case "pink":
        return "bg-pink-500 hover:bg-pink-600";
      case "yellow":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "gray":
        return "bg-gray-500 hover:bg-gray-600";
      case "purple":
        return "bg-ctp-mauve hover:bg-ctp-mauve/80";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  const getSubmitButtonClasses = (color: ColorOption) => {
    switch (color) {
      case "blue":
        return "bg-blue-500 hover:bg-blue-600 text-white";
      case "white":
        return "bg-white hover:bg-gray-100 text-gray-800";
      case "black":
        return "bg-gray-600 hover:bg-gray-500 text-white";
      case "green":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "red":
        return "bg-red-500 hover:bg-red-600 text-white";
      case "pink":
        return "bg-pink-500 hover:bg-pink-600 text-white";
      case "yellow":
        return "bg-yellow-500 hover:bg-yellow-600 text-gray-800";
      case "gray":
        return "bg-gray-500 hover:bg-gray-600 text-white";
      case "purple":
        return "bg-ctp-mauve hover:bg-ctp-mauve/80 text-ctp-base";
      default:
        return "bg-blue-500 hover:bg-blue-600 text-white";
    }
  };

  return (
    <>
      {/* Button Container */}
      <div className="absolute bottom-4 right-4 @xl/appwindow:bottom-9 @xl/appwindow:right-9 flex gap-2 @xl/appwindow:gap-3">
        {/* Cancel Button - only show in edit mode */}
        {type === "edit" && (
          <button
            onClick={handleCancel}
            className="bg-gray-600 backdrop-blur-sm px-4 py-2 @xl/appwindow:px-8 @xl/appwindow:py-4 rounded-xl @xl/appwindow:rounded-2xl shadow-xl hover:shadow-2xl group border-2 @xl/appwindow:border-4 border-white/90 hover:border-white cursor-pointer active:bg-gray-500 active:shadow-md transition-all duration-300 hover:cursor-pointer hover:bg-gray-500"
          >
            <span className="text-white text-lg @xl/appwindow:text-2xl font-caveat font-bold group-hover:text-gray-100 transition-colors duration-300">
              Cancel
            </span>
          </button>
        )}
        {/* Open Form Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-ctp-mauve backdrop-blur-sm px-4 py-2 @xl/appwindow:px-8 @xl/appwindow:py-4 rounded-xl @xl/appwindow:rounded-2xl shadow-xl hover:shadow-2xl group border-2 @xl/appwindow:border-4 border-white/90 hover:border-white cursor-pointer active:bg-ctp-mauve/80 active:shadow-md transition-all duration-300 hover:cursor-pointer"
        >
          <span className="text-white text-lg @xl/appwindow:text-2xl font-caveat font-bold group-hover:text-gray-100 transition-colors duration-300">
            {type === "create" ? "Pin your own!" : "Edit!"}
          </span>
        </button>
      </div>

      {/* Overlay and Form */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className={cn(
                "absolute inset-0 bg-black/50 backdrop-blur-sm z-50 pointer-events-auto",
                {
                  "pointer-events-none": !isOpen,
                }
              )}
              onClick={() => setIsOpen(false)}
            />

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 25,
                duration: 0.1,
              }}
              className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div
                className={cn(
                  "relative w-full max-w-sm @xl/appwindow:max-w-md mx-3 @xl/appwindow:mx-4 p-4 @xl/appwindow:p-6 rounded-xl @xl/appwindow:rounded-2xl shadow-2xl backdrop-blur-sm border-2 border-white/20 pointer-events-auto",
                  getColorClasses(formData.color)
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer hover:cursor-pointer",
                    formData.color === "black" || formData.color === "purple"
                      ? "bg-gray-700/50 hover:bg-gray-600/50"
                      : "bg-white/20 hover:bg-white/30"
                  )}
                >
                  <svg
                    className={cn(
                      "w-5 h-5",
                      formData.color === "black" || formData.color === "purple"
                        ? "text-gray-300"
                        : "text-gray-700"
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Form Header */}
                <h2
                  className={cn(
                    "text-xl @xl/appwindow:text-2xl font-bold mb-4 @xl/appwindow:mb-6 font-caveat",
                    formData.color === "black" || formData.color === "purple"
                      ? "text-white"
                      : "text-gray-800"
                  )}
                >
                  Create a Pin
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 @xl/appwindow:space-y-6"
                >
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="name"
                      className={cn(
                        "block text-sm font-medium mb-2",
                        formData.color === "black" ||
                          formData.color === "purple"
                          ? "text-gray-300"
                          : "text-gray-700"
                      )}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className={cn(
                        "w-full px-3 py-2 @xl/appwindow:px-4 @xl/appwindow:py-3 rounded-lg @xl/appwindow:rounded-xl border-2 backdrop-blur-sm transition-all duration-200 focus:outline-none text-sm @xl/appwindow:text-base",
                        formData.color === "black" ||
                          formData.color === "purple"
                          ? "border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:border-gray-500 focus:bg-gray-800/70"
                          : "border-white/30 bg-white/50 text-gray-800 placeholder-gray-500 focus:border-white/50 focus:bg-white/70"
                      )}
                      placeholder="Enter your name..."
                      required
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label
                      htmlFor="message"
                      className={cn(
                        "block text-sm font-medium mb-2",
                        formData.color === "black" ||
                          formData.color === "purple"
                          ? "text-gray-300"
                          : "text-gray-700"
                      )}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      rows={3}
                      className={cn(
                        "w-full px-3 py-2 @xl/appwindow:px-4 @xl/appwindow:py-3 rounded-lg @xl/appwindow:rounded-xl border-2 backdrop-blur-sm transition-all duration-200 resize-none focus:outline-none text-sm @xl/appwindow:text-base",
                        formData.color === "black" ||
                          formData.color === "purple"
                          ? "border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:border-gray-500 focus:bg-gray-800/70"
                          : "border-white/30 bg-white/50 text-gray-800 placeholder-gray-500 focus:border-white/50 focus:bg-white/70"
                      )}
                      placeholder="Write your message..."
                      required
                    />
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label
                      className={cn(
                        "block text-sm font-medium mb-2 @xl/appwindow:mb-3 text-ctp-text",
                        {
                          "text-white":
                            formData.color === "black" ||
                            formData.color === "purple",
                          "text-gray-700":
                            formData.color !== "black" &&
                            formData.color !== "purple",
                        }
                      )}
                    >
                      Choose Color
                    </label>
                    <div className="flex flex-wrap gap-2 @xl/appwindow:gap-3">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => handleColorSelect(color)}
                          className={cn(
                            "w-8 h-8 @xl/appwindow:w-10 @xl/appwindow:h-10 rounded-full transition-all duration-200 border-2 cursor-pointer hover:cursor-pointer",
                            getColorButtonClasses(color),
                            formData.color === color
                              ? "ring-2 @xl/appwindow:ring-4 ring-white/50 ring-offset-1 @xl/appwindow:ring-offset-2 ring-offset-transparent scale-110"
                              : "hover:scale-105"
                          )}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={cn(
                      "w-full font-bold py-2 px-4 @xl/appwindow:py-3 @xl/appwindow:px-6 rounded-lg @xl/appwindow:rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer hover:cursor-pointer text-sm @xl/appwindow:text-base",
                      getSubmitButtonClasses(formData.color)
                    )}
                  >
                    Pin It!
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PinForm;
