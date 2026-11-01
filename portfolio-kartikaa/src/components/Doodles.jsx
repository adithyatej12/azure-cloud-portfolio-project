// Hand-drawn SVG doodles. Each path is deliberately slightly irregular
// (uneven curvature, small overshoots) so the marks read as pencil/ink
// rather than perfect vector shapes. Every path can animate a "drawn in"
// effect via the shared .sketch-path class (see styles/global.css),
// controlled with --len (an overestimate of the path length) and --delay.

export function CloudDoodle({ className, delay = 0, animate = true }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className={animate ? 'sketch-path' : undefined}
        style={{ '--len': 620, '--delay': `${delay}s` }}
        d="M46 96c-19 1-34-12-34-28 0-15 12-26 27-27 2-16 17-29 35-29 15 0 28 9 33 22 3-1 6-2 10-2 17 0 31 13 31 30 0 15-12 28-28 29-1 0-63 5-74 5z"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ServerDoodle({ className, delay = 0, animate = true }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className={animate ? 'sketch-path' : undefined}
        style={{ '--len': 160, '--delay': `${delay}s` }}
        d="M14 16 h132 c4 0 6 3 6 6 v40 c0 4-3 6-6 6 H14 c-4 0-6-3-6-6 V22 c0-4 3-6 6-6 z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        className={animate ? 'sketch-path' : undefined}
        style={{ '--len': 160, '--delay': `${delay + 0.15}s` }}
        d="M15 70 h130 c4 0 7 3 7 6 v40 c0 4-3 7-7 7 H15 c-4 0-7-3-7-7 V76 c0-3 3-6 7-6 z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        className={animate ? 'sketch-path' : undefined}
        style={{ '--len': 160, '--delay': `${delay + 0.3}s` }}
        d="M13 125 h134 c4 0 6 3 6 6 v33 c0 4-2 7-6 7 H13 c-4 0-6-3-6-7 v-33 c0-3 2-6 6-6 z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="30" cy="41" r="3.4" fill="currentColor" />
      <circle cx="30" cy="95" r="3.4" fill="currentColor" />
      <circle cx="30" cy="151" r="3.4" fill="currentColor" />
      <path d="M55 41 h60" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.6" />
      <path d="M55 95 h60" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.6" />
      <path d="M55 151 h60" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

export function ArrowDoodle({ className, direction = 'right', delay = 0, animate = true }) {
  const rotation = { right: 0, down: 90, left: 180, up: 270 }[direction] ?? 0
  return (
    <svg
      className={className}
      viewBox="0 0 90 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path
        className={animate ? 'sketch-path' : undefined}
        style={{ '--len': 130, '--delay': `${delay}s` }}
        d="M2 17c18-3 41-5 62-4"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        className={animate ? 'sketch-path' : undefined}
        style={{ '--len': 60, '--delay': `${delay + 0.25}s` }}
        d="M53 4c5 4 10 7 15 9-6 2-11 6-14 11"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function UnderlineDoodle({ className, delay = 0, animate = true }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className={animate ? 'sketch-path' : undefined}
        style={{ '--len': 260, '--delay': `${delay}s` }}
        d="M3 11c34-6 96-9 132-6 20 1 40 2 62 6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CircleDoodle({ className, delay = 0, animate = true }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className={animate ? 'sketch-path' : undefined}
        style={{ '--len': 420, '--delay': `${delay}s` }}
        d="M110 6C55 4 12 20 10 45c-2 24 45 40 100 39 56-1 101-17 100-41C209 21 165 7 110 6z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function StarDoodle({ className, delay = 0, animate = true }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className={animate ? 'sketch-path' : undefined}
        style={{ '--len': 110, '--delay': `${delay}s` }}
        d="M20 3 L23.5 16 L37 20 L23.5 24 L20 37 L16.5 24 L3 20 L16.5 16 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LightningDoodle({ className, delay = 0, animate = true }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className={animate ? 'sketch-path' : undefined}
        style={{ '--len': 130, '--delay': `${delay}s` }}
        d="M24 3 6 33h13l-4 24 21-32H23z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CursorDoodle({ className, delay = 0, animate = true }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className={animate ? 'sketch-path' : undefined}
        style={{ '--len': 90, '--delay': `${delay}s` }}
        d="M8 4 30 22l-9 1 6 11-5 2-6-11-6 7z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** A short dashed connector used between architecture nodes. */
export function ConnectorDoodle({ className, delay = 0, animate = true }) {
  return (
    <svg
      className={className}
      viewBox="0 0 70 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className={animate ? 'sketch-path' : undefined}
        style={{ '--len': 100, '--delay': `${delay}s` }}
        d="M2 12c14-5 30-8 44-6 6 1 13 3 22 5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M58 5c3 2 6 5 8 8-4 0-8 1-11 3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
