import { useState } from "react"
import { getRankIconUrl } from "./rank-icons"
import { heroPrestigeUrl } from "./image-urls"
import type { RivalsPlayer } from "./types"

/**
 * Rows now flex-fill their column's real height (see team-roster.tsx) rather than
 * using a fixed pixel height, so this is a design-target estimate — close enough
 * for the continuous-edge offset math, not necessarily the exact rendered height.
 */
export const ROW_HEIGHT_PX = 116
export const ROW_SKEW_PX = 20

function hideOnError(event: React.SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.visibility = "hidden"
}

type TeamPlayerRowProps = {
  player: RivalsPlayer
}

function TeamPlayerRow({ player }: TeamPlayerRowProps) {
  const [bannerFailed, setBannerFailed] = useState(false)
  const rankIcon = getRankIconUrl(player.peakRank.label)
  const heroColor = player.mainHero?.color

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
      ) : heroColor ? (
        // No (working) Discord banner — fall back to a tint pulled from the hero's own art.
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(130% 130% at 100% 0%, ${heroColor}, transparent 70%), linear-gradient(135deg, ${heroColor}CC, transparent 85%)`,
            // The stored color is an average over a whole icon, which trends muddy/gray — punch it back up for display.
            filter: "saturate(3) brightness(1.15) contrast(1.1)",
          }}
        />
      ) : null}

      {/* Legibility scrim: strong behind the name/avatar, fading out toward the hero art. */}
      <div className="absolute inset-0 bg-linear-to-r from-ctp-crust/90 via-ctp-crust/45 to-ctp-crust/5" />

      {player.mainHero ? (
        <img
          src={heroPrestigeUrl(player.mainHero.id)}
          alt=""
          className="absolute inset-y-0 right-0 -top-14 w-[50%]"
          style={{
            objectFit: "cover",
            objectPosition: "50% 0%",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 60%)",
            maskImage: "linear-gradient(to right, transparent, black 60%)",
          }}
          draggable={false}
          onError={hideOnError}
        />
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
