import type { WallpaperArtist } from "@/hooks/use-background"

const artistHandle = (artist: WallpaperArtist) =>
  artist.handle ?? artist.name.replace(/\s+/g, "").toLowerCase()

type WallpaperArtistCreditProps = {
  artist: WallpaperArtist
  className?: string
}

function WallpaperArtistCredit({
  artist,
  className = "text-sm text-ctp-subtext1",
}: WallpaperArtistCreditProps) {
  return (
    <p className={className}>
      {artist.url ? (
        <>
          {" "}
          <a
            href={artist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-ctp-blue underline-offset-2 hover:text-ctp-sky hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            @{artistHandle(artist)}
          </a>
        </>
      ) : (
        <span>{artist.name}</span>
      )}
    </p>
  )
}

export default WallpaperArtistCredit
