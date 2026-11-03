import type { WallpaperArtist } from "@/hooks/use-background"
import { ExternalArrowIcon } from "@/components/ui/icons"

const artistHandle = (artist: WallpaperArtist) =>
  artist.handle ?? artist.name.replace(/\s+/g, "").toLowerCase()

type WallpaperArtistCreditProps = {
  artist: WallpaperArtist
  className?: string
}

function WallpaperArtistCredit({
  artist,
  className = "text-[13px] leading-4.5 text-haze",
}: WallpaperArtistCreditProps) {
  return (
    <p className={className}>
      by{" "}
      {artist.url ? (
        <a
          href={artist.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 font-medium text-holo-soft underline-offset-2 transition-colors duration-150 ease-out-strong hover:text-moon hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          @{artistHandle(artist)}
          <ExternalArrowIcon className="size-3" />
        </a>
      ) : (
        <span className="font-medium text-lilac">{artist.name}</span>
      )}
    </p>
  )
}

export default WallpaperArtistCredit
