import { useState } from "react"
import { motion } from "framer-motion"
import { getRankIconUrl } from "./rank-icons"
import { agentFullArtUrl } from "./image-urls"
import type { ValorantPlayer } from "./types"

/**
 * Rows now flex-fill their column's real height (see team-roster.tsx) rather than
 * using a fixed pixel height, so this is a design-target estimate — close enough
 * for the continuous-edge offset math, not necessarily the exact rendered height.
 */
export const ROW_HEIGHT_PX = 116
export const ROW_SKEW_PX = 20

const FALLBACK_OUTLINE_COLOR = "#ff4655"

/**
 * The row crops each agent's full-body art down to a headshot by shifting the
 * whole image up (via a negative `top`) so the tall row-clip window lands on
 * the face instead of empty headroom above it. -160px works for most agents'
 * art, but how much headroom an agent's source art has above their head isn't
 * consistent — Gekko's head sits almost at the very top of his canvas, so the
 * same shift dives straight past his face into his shoulder. Per-agent
 * overrides go here as they're spotted; unlisted agents use the default.
 */
const DEFAULT_ART_TOP_PX = -160
const AGENT_ART_TOP_OVERRIDE_PX: Record<string, number> = {
  gekko: -30,
}

function getArtTopPx(slug: string): number {
  return AGENT_ART_TOP_OVERRIDE_PX[slug] ?? DEFAULT_ART_TOP_PX
}

function hideOnError(event: React.SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.visibility = "hidden"
}

type TeamPlayerRowProps = {
  player: ValorantPlayer
  /** Seconds to wait before the agent art punches in — should land after the row itself has slid into view. */
  revealDelaySeconds?: number
}

function TeamPlayerRow({ player, revealDelaySeconds = 0 }: TeamPlayerRowProps) {
  const [bannerFailed, setBannerFailed] = useState(false)
  const rankIcon = getRankIconUrl(player.peakRank.label)
  const mainAgent = player.mainAgent ?? null
  const mainColor = mainAgent?.color
  const outlineFilterId = `valorant-agent-outline-${player.id}`

  return (
    <div
      className="relative flex h-full items-center gap-4 overflow-hidden bg-ctp-surface0 pr-6"
      style={{
        paddingLeft: ROW_SKEW_PX + 20,
        clipPath: `polygon(${ROW_SKEW_PX}px 0, 100% 0, calc(100% - ${ROW_SKEW_PX}px) 100%, 0 100%)`,
      }}
    >
      {player.banner && !bannerFailed ? (
        <img
          src={player.banner}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          onError={() => setBannerFailed(true)}
        />
      ) : mainColor ? (
        // No (working) Discord banner — fall back to a tint pulled from the main agent's own art.
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(130% 130% at 100% 0%, ${mainColor}, transparent 70%), linear-gradient(135deg, ${mainColor}CC, transparent 85%)`,
            // The stored color is an average over a whole image, which trends muddy/gray — punch it back up for display.
            filter: "saturate(3) brightness(1.15) contrast(1.1)",
          }}
        />
      ) : null}

      {/* Legibility scrim: strong behind the name/avatar, fading out toward the agent art. */}
      <div className="absolute inset-0 bg-linear-to-r from-ctp-crust/90 via-ctp-crust/45 to-ctp-crust/5" />

      {mainAgent ? (
        <>
          {/* Sharp solid-color outline around the agent silhouette: duplicate the alpha shape,
              dilate it a few px, flood it fully opaque (no blur — crisp edge), merge behind the art. */}
          <svg width="0" height="0" className="absolute" aria-hidden>
            <filter
              id={outlineFilterId}
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              colorInterpolationFilters="sRGB"
            >
              <feMorphology
                in="SourceAlpha"
                operator="dilate"
                radius="3"
                result="dilated"
              />
              <feFlood
                floodColor={mainColor ?? FALLBACK_OUTLINE_COLOR}
                floodOpacity="1"
                result="outlineColor"
              />
              <feComposite
                in="outlineColor"
                in2="dilated"
                operator="in"
                result="outline"
              />
              <feMerge>
                <feMergeNode in="outline" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </svg>

          <motion.img
            src={agentFullArtUrl(mainAgent.id)}
            alt=""
            className="absolute right-[-40%] translate-y-13 min-w-[130%]"
            style={{
              top: getArtTopPx(mainAgent.slug),
              objectFit: "cover",
              objectPosition: "50% 0%",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 60%)",
              maskImage: "linear-gradient(to right, transparent, black 60%)",
              filter: `url(#${outlineFilterId})`,
            }}
            draggable={false}
            onError={hideOnError}
            initial={{ opacity: 0, scale: 1.6, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              delay: revealDelaySeconds,
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          />
        </>
      ) : null}

      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-ctp-surface1 ring-2 ring-ctp-crust/70">
        <img
          src={player.image}
          alt={player.name}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div className="relative min-w-0 flex-1">
        <p className="truncate font-jockey-one text-xl tracking-wide text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {player.name}
        </p>
      </div>
      <div className="relative h-11 w-11 shrink-0 overflow-hidden drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
        <img
          src={rankIcon}
          alt=""
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  )
}

export default TeamPlayerRow
