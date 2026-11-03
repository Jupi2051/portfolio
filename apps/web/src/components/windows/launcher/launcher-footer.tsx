import type { ComponentType, SVGProps } from "react"
import {
  GitHubIcon,
  PowerIcon,
  XBrandIcon,
  YouTubeIcon,
} from "@/components/ui/icons"

type Social = {
  label: string
  href: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  iconClassName: string
}

const SOCIALS: Social[] = [
  {
    label: "X / Twitter",
    href: "https://twitter.com/Jupi205",
    Icon: XBrandIcon,
    iconClassName: "size-4",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Jupi205",
    Icon: YouTubeIcon,
    iconClassName: "size-4.75",
  },
  {
    label: "GitHub",
    href: "https://github.com/Jupi2051",
    Icon: GitHubIcon,
    iconClassName: "size-4.5",
  },
]

const actionClassName =
  "flex size-9.5 items-center justify-center rounded-xl outline-none transition-colors duration-150 ease-out-strong hover:bg-white/8 focus-visible:bg-white/10"

function LauncherFooter() {
  return (
    <div className="flex items-center justify-between border-t border-white/8 bg-[rgba(8,7,20,0.35)] py-3.5 pr-6 pl-8">
      <div className="flex items-center gap-3">
        <img
          src="https://i.postimg.cc/kX5cqZgP/Birthday-Festival-BD-artwork-2.png"
          alt=""
          className="size-8.5 rounded-full border border-white/20 object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm leading-4.5 font-semibold text-moon">
            Jupi
          </span>
          <span className="text-xs leading-4 text-haze">
            Developer &amp; tinkerer
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {SOCIALS.map(({ label, href, Icon, iconClassName }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={`${actionClassName} text-lilac`}
          >
            <Icon className={iconClassName} />
          </a>
        ))}
        <div className="mx-1 h-5 w-px bg-white/14" />
        <button
          type="button"
          aria-label="Restart"
          title="Restart"
          onClick={() => window.location.reload()}
          className={`${actionClassName} text-melon`}
        >
          <PowerIcon className="size-4.25" />
        </button>
      </div>
    </div>
  )
}

export default LauncherFooter
