import { motion } from "framer-motion"

function WallpapersRocketHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-1 text-left"
    >
      <h1 className="bg-linear-to-r from-ctp-pink via-ctp-mauve to-ctp-blue bg-clip-text text-2xl font-bold text-transparent">
        Wallpapers Rocket
      </h1>
      <p className="text-sm text-ctp-subtext1">
        Pick a backdrop for your desktop. Changes apply instantly.
      </p>
    </motion.header>
  )
}

export default WallpapersRocketHeader
