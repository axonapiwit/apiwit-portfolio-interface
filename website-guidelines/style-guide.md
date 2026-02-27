# Style Guide - APIWIT.EXE Portfolio

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0a0a0a` | main background |
| `--bg-secondary` | `#111111` | card / section bg |
| `--bg-elevated` | `#1a1a1a` | hover states, overlay |
| `--accent` | `#ff2d2d` | primary accent (red) |
| `--accent-dim` | `#cc0000` | hover / pressed accent |
| `--accent-glow` | `rgba(255,45,45,0.15)` | glow / shadow |
| `--text-primary` | `#ededed` | headings, body |
| `--text-secondary` | `#888888` | muted / description |
| `--text-dim` | `#555555` | disabled / placeholder |
| `--border` | `rgba(255,255,255,0.08)` | subtle borders |
| `--border-accent` | `rgba(255,45,45,0.3)` | accent borders / HUD frame |

## Typography

| Element | Font | Weight | Size (desktop) | Size (mobile) |
|---------|------|--------|----------------|---------------|
| H1 (Hero name) | Kanit | 600 | 80-120px | 48-64px |
| H2 (Section title) | Kanit | 600 | 48px | 32px |
| H3 (Card title) | Poppins | 600 | 24px | 20px |
| Body | Poppins | 400 | 16px | 14px |
| Caption/Tag | Poppins | 500 | 12-14px | 12px |
| Terminal text | monospace (system) | 400 | 14px | 12px |
| Nav items | Poppins | 500 | 14px | 16px |

## Spacing System
ใช้ Tailwind default scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128

- Section padding: `py-24 md:py-32`
- Container max-width: `max-w-6xl mx-auto px-6`
- Card padding: `p-6`
- Gap between cards: `gap-6`
- Gap between sections: `gap-0` (full screen sections)

## Border & Frame
- Default border: `border border-white/8`
- HUD frame (project cards): `border border-red-500/30` พร้อม corner accents
- Border radius: `rounded-none` หรือ `rounded-sm` (เหลี่ยม ๆ ดิบ ๆ)
- Divider: `h-px bg-white/8`

## Effects & Animations

### Glitch Text
- ใช้ GSAP scrambleText หรือ custom decode effect
- ตัวอักษร random สลับ 0.5-1s แล้ว settle เป็นข้อความจริง
- trigger: on load (hero), on scroll enter (headings)

### Scan Lines (CSS)
```css
.scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.1) 2px,
    rgba(0,0,0,0.1) 4px
  );
  pointer-events: none;
}
```

### Noise Overlay (CSS)
- subtle noise texture overlay ทับ background
- opacity: 0.03-0.05
- ใช้ SVG filter หรือ base64 noise image

### Marquee / Ticker
- ข้อความวิ่งซ้ำ loop ไม่หยุด
- speed: ~50px/s
- content: keywords / tagline ซ้ำ เช่น `FRONTEND DEVELOPER ■ CREATIVE CODER ■ REACT ■ NEXT.JS ■`

### Scroll Reveal
- GSAP ScrollTrigger
- fade up + slight translateY(20px)
- stagger: 0.1s ระหว่าง elements
- duration: 0.6s, ease: power2.out

### Hover States
- Cards: border-accent glow + slight scale(1.02)
- Links/Buttons: color → accent red
- Project thumbnails: glitch distortion filter

### Custom Cursor
- ซ่อน native cursor ทั้งเว็บ (`cursor: none`)
- Outer ring: 36px, border accent red/50, lerp delay 0.15s
- Inner dot: 6px, bg accent red, follows instantly
- Hover link: outer scale → 48px, border solid
- Hover card: outer → crosshair bracket `[ + ]` 56px
- Glow trail: 5-8 จุด fade ตาม path (optional)
- Desktop only: `@media (hover: hover) and (pointer: fine)`

## Component Patterns

### CyberButton (`<CyberButton>`)
ปุ่มหลักทั้ง project ใช้ Cyberpunk HUD style — clip-path ตัดมุมบนขวา + ล่างซ้าย
ใช้เทคนิค outer `p-px` + inner fill เพื่อสร้าง border effect ผ่าน clip-path
มี red dot indicator หน้าข้อความ พร้อม glow on hover

#### Variants
| Variant | Border bg | Inner text | Hover |
|---------|-----------|------------|-------|
| `primary` | `accent/30` | `text-accent` | `bg-accent/50`, glow shadow |
| `ghost` | `white/8` | `text-text-primary` | `bg-white/20`, text accent |

#### Sizes
| Size | Padding | Font | Clip cut |
|------|---------|------|----------|
| `md` (default) | `px-8 py-3` | `text-sm tracking-[0.2em]` | 14px |
| `sm` | `px-4 py-1.5` | `text-xs tracking-wider` | 8px |

#### Usage
```tsx
<CyberButton variant="primary">SEND_MESSAGE</CyberButton>
<CyberButton variant="ghost" href="#projects">VIEW_PROJECTS</CyberButton>
<CyberButton variant="primary" size="sm" href={url} target="_blank">LIVE</CyberButton>
```

#### CSS Classes
- `.cyber-clip` — clip-path 14px (md buttons)
- `.cyber-clip-sm` — clip-path 8px (sm buttons)

### Tag / Badge
- bg white/5, text white/70, border white/10
- style: `bg-white/5 text-white/70 border border-white/10 px-3 py-1 text-xs`

### Card (Project)
- bg-secondary, border HUD style
- corner accent marks (pseudo elements)
- hover glow effect

## Iconography
- lucide-react icons
- size: 16-20px
- stroke-width: 1.5
- color: text-secondary, hover → accent

## Responsive Behavior
- Mobile: single column, stacked layout
- Tablet: 2 columns for projects
- Desktop: 2-3 columns, full layouts
- Navigation: top bar → hamburger overlay on mobile
