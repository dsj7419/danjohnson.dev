import { ImageResponse } from 'next/og'

export const alt = 'Dan Johnson — Product Engineer & Systems Architect'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#1a1a2e',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <div
          style={{
            fontSize: '16px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#7c7cdb',
            fontWeight: 500,
          }}
        >
          Product Engineer &amp; Systems Architect
        </div>
        <div
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: '#f0f0f5',
            lineHeight: 1.1,
            letterSpacing: '-2px',
          }}
        >
          Dan Johnson
        </div>
        <div
          style={{
            fontSize: '22px',
            color: '#8888a0',
            maxWidth: '700px',
            lineHeight: 1.5,
          }}
        >
          I design and build complex, high-reliability software systems, AI-enabled products, and
          performance-critical applications.
        </div>
        <div
          style={{
            fontSize: '16px',
            color: '#5555a0',
            marginTop: '16px',
          }}
        >
          danjohnson.dev
        </div>
      </div>
    </div>,
    { ...size },
  )
}
