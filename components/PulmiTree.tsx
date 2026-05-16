'use client'
import React from 'react'
import styles from './PulmiTree.module.css'

interface PulmiTreeProps { size?: number }

// [cx, cy, radius, animDuration, animDelay]
const nodes: [number, number, number, number, number][] = [
  [50, 86, 1.4, 1.8, 0.00], [50, 72, 1.1, 2.2, 0.18], [34, 57, 1.0, 2.6, 0.36],
  [20, 44, 0.85, 3.0, 0.54], [26, 32, 0.75, 1.8, 0.72], [13, 26, 0.65, 2.2, 0.90],
  [30, 20, 0.60, 2.6, 1.08], [17, 40, 0.65, 3.0, 1.26], [66, 57, 1.0, 1.8, 0.04],
  [80, 44, 0.85, 2.2, 0.22], [74, 32, 0.75, 2.6, 0.40], [87, 26, 0.65, 3.0, 0.58],
  [70, 20, 0.60, 1.8, 0.76], [83, 40, 0.65, 2.2, 0.94], [38, 63, 0.60, 2.6, 1.12],
  [62, 63, 0.60, 3.0, 1.30], [42, 48, 0.55, 1.8, 1.48], [58, 48, 0.55, 2.2, 1.44],
]

export default function PulmiTree({ size = 180 }: PulmiTreeProps) {
  return (
    <div
      className={styles.pulmi}
      style={{ '--size': `${size}px` } as React.CSSProperties}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="pl-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.9" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        {/* Edges */}
        <g stroke="var(--pulmi-edge)" strokeWidth="0.5" strokeOpacity="0.4" fill="none">
          <line x1="50" y1="86" x2="50" y2="72"/>
          <line x1="50" y1="72" x2="34" y2="57"/>
          <line x1="50" y1="72" x2="66" y2="57"/>
          <line x1="50" y1="72" x2="42" y2="48"/>
          <line x1="50" y1="72" x2="58" y2="48"/>
          <line x1="34" y1="57" x2="20" y2="44"/>
          <line x1="34" y1="57" x2="38" y2="63"/>
          <line x1="34" y1="57" x2="42" y2="48"/>
          <line x1="20" y1="44" x2="26" y2="32"/>
          <line x1="20" y1="44" x2="17" y2="40"/>
          <line x1="26" y1="32" x2="13" y2="26"/>
          <line x1="26" y1="32" x2="30" y2="20"/>
          <line x1="66" y1="57" x2="80" y2="44"/>
          <line x1="66" y1="57" x2="62" y2="63"/>
          <line x1="66" y1="57" x2="58" y2="48"/>
          <line x1="80" y1="44" x2="74" y2="32"/>
          <line x1="80" y1="44" x2="83" y2="40"/>
          <line x1="74" y1="32" x2="87" y2="26"/>
          <line x1="74" y1="32" x2="70" y2="20"/>
        </g>

        {/* Nodes */}
        {nodes.map(([cx, cy, r, dur, delay], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="var(--pulmi-node)"
            filter="url(#pl-glow)"
            className={styles.node}
            style={{
              animationDuration: `${dur}s`,
              animationDelay:    `-${delay}s`,
              transformOrigin:   `${cx}px ${cy}px`,
            }}
          />
        ))}

        {/* Central breathing ring */}
        <circle
          cx="50"
          cy="72"
          r="4"
          fill="none"
          stroke="var(--pulmi-ring)"
          strokeWidth="0.6"
          strokeOpacity="0.35"
          className={styles.ring}
        />
      </svg>
    </div>
  )
}
