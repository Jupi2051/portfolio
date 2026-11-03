import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

const strokeDefaults = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

export const MinimizeIcon = (props: IconProps) => (
  <svg viewBox="0 0 12 12" strokeWidth={1.4} {...strokeDefaults} {...props}>
    <path d="M2.5 6h7" />
  </svg>
)

export const MaximizeIcon = (props: IconProps) => (
  <svg viewBox="0 0 12 12" strokeWidth={1.4} {...strokeDefaults} {...props}>
    <rect x="2.2" y="2.2" width="7.6" height="7.6" rx="2" />
  </svg>
)

export const RestoreIcon = (props: IconProps) => (
  <svg viewBox="0 0 12 12" strokeWidth={1.3} {...strokeDefaults} {...props}>
    <rect x="1.8" y="3.6" width="6.6" height="6.6" rx="1.6" />
    <path d="M4 3.4V3a1.4 1.4 0 0 1 1.4-1.4h3.6A1.4 1.4 0 0 1 10.4 3v3.6A1.4 1.4 0 0 1 9 8h-.4" />
  </svg>
)

export const CloseIcon = (props: IconProps) => (
  <svg viewBox="0 0 12 12" strokeWidth={1.4} {...strokeDefaults} {...props}>
    <path d="M3 3l6 6M9 3l-6 6" />
  </svg>
)

export const SearchIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...strokeDefaults} {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </svg>
)

export const LauncherIcon = (props: IconProps) => (
  <svg viewBox="0 0 22 22" fill="currentColor" {...props}>
    <rect x="1" y="1" width="8.5" height="8.5" rx="2.6" />
    <rect x="12.5" y="1" width="8.5" height="8.5" rx="2.6" fillOpacity="0.55" />
    <rect x="1" y="12.5" width="8.5" height="8.5" rx="2.6" fillOpacity="0.55" />
    <rect x="12.5" y="12.5" width="8.5" height="8.5" rx="4.25" />
  </svg>
)

export const WifiIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.9} {...strokeDefaults} {...props}>
    <path d="M2.5 9a14 14 0 0 1 19 0" />
    <path d="M5.5 12.5a9.5 9.5 0 0 1 13 0" />
    <path d="M8.7 16a5 5 0 0 1 6.6 0" />
    <circle cx="12" cy="19.3" r="0.9" fill="currentColor" />
  </svg>
)

export const VolumeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.9} {...strokeDefaults} {...props}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    <path d="M15.5 9a4.2 4.2 0 0 1 0 6" />
    <path d="M18.3 6.5a8 8 0 0 1 0 11" />
  </svg>
)

export const PowerIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...strokeDefaults} {...props}>
    <path d="M12 3v8" />
    <path d="M6.3 6.8a8 8 0 1 0 11.4 0" />
  </svg>
)

export const LockIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={2.2} {...strokeDefaults} {...props}>
    <rect x="5" y="11" width="14" height="9" rx="2.5" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)

export const CheckIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={3} {...strokeDefaults} {...props}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

export const SignOutIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.9} {...strokeDefaults} {...props}>
    <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
    <path d="M10 16l-4-4 4-4M6 12h10" />
  </svg>
)

export const ArrowRightIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={2.2} {...strokeDefaults} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const RefreshIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...strokeDefaults} {...props}>
    <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4" />
  </svg>
)

export const StarIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...strokeDefaults} {...props}>
    <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" />
  </svg>
)

export const PlusIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...strokeDefaults} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const CropIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.9} {...strokeDefaults} {...props}>
    <path d="M6 2v14a2 2 0 0 0 2 2h14" />
    <path d="M18 22V8a2 2 0 0 0-2-2H2" />
  </svg>
)

export const TrashIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.9} {...strokeDefaults} {...props}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
  </svg>
)

export const EyeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...strokeDefaults} {...props}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

export const EyeOffIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...strokeDefaults} {...props}>
    <path d="M3 3l18 18M10.6 5.1A10.6 10.6 0 0 1 12 5c6.4 0 10 7 10 7a17.5 17.5 0 0 1-3.2 4M6.6 6.6C3.9 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </svg>
)

export const PinIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={2.2} {...strokeDefaults} {...props}>
    <path d="M12 17v5M9 3h6l-1 6 3 3v2H7v-2l3-3z" />
  </svg>
)

export const MoveIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.9} {...strokeDefaults} {...props}>
    <path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3" />
  </svg>
)

export const GripIcon = (props: IconProps) => (
  <svg viewBox="0 0 12 16" fill="currentColor" {...props}>
    <circle cx="3.5" cy="3" r="1.4" />
    <circle cx="8.5" cy="3" r="1.4" />
    <circle cx="3.5" cy="8" r="1.4" />
    <circle cx="8.5" cy="8" r="1.4" />
    <circle cx="3.5" cy="13" r="1.4" />
    <circle cx="8.5" cy="13" r="1.4" />
  </svg>
)

export const MenuIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...strokeDefaults} {...props}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
)

export const ExternalArrowIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...strokeDefaults} {...props}>
    <path d="M8 16L16 8M9 8h7v7" />
  </svg>
)

/** Four-point sparkle from the Wallpapers Rocket icon. */
export const SparkleIcon = (props: IconProps) => (
  <svg viewBox="-24 -24 48 48" fill="currentColor" {...props}>
    <path d="M0 -24 C 3 -6 6 -3 24 0 C 6 3 3 6 0 24 C -3 6 -6 3 -24 0 C -6 -3 -3 -6 0 -24 Z" />
  </svg>
)

export const XBrandIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z" />
  </svg>
)

export const YouTubeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" />
  </svg>
)

export const GitHubIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
  </svg>
)
