# Product Requirements - APIWIT.EXE Portfolio

## Functional Requirements

### FR-1: Loading / Boot Screen
- แสดง boot sequence เมื่อเข้าเว็บครั้งแรก (session)
- typing effect พิมพ์ข้อความ `initializing APIWIT.EXE...`
- progress bar animate จาก 0% → 100%
- transition เข้า main content หลัง boot เสร็จ (~3 วินาที)
- ใช้ sessionStorage เพื่อไม่ให้แสดงซ้ำเมื่อ navigate กลับ

### FR-1.1: Breakpoint Transition Screen
- เมื่อ resize ข้าม breakpoint 768px (desktop ↔ mobile) แสดง transition overlay ~1s
- overlay สั้น: fade in → ข้อความ `reconfiguring...` → fade out
- ซ่อน layout shift ระหว่าง responsive reflow
- debounce 150ms กัน spam จาก continuous resize
- ไม่ trigger ระหว่าง boot screen / ไม่ trigger ถ้าไม่ข้าม breakpoint
- รองรับ orientation change บน mobile

### FR-2: Navbar
- fixed top, transparent background → blur on scroll
- โลโก้ `APIWIT.EXE` ซ้าย
- เมนู desktop: `> ABOUT` `> PROJECTS` `> EXPERIENCE` `> CONTACT`
- hamburger menu mobile → full screen overlay
- smooth scroll ไป section ที่เลือก
- active state highlight section ปัจจุบัน

### FR-3: Hero Section
- ชื่อ "APIWIT" ขนาดใหญ่ พร้อม glitch/decode text effect
- subtitle: role description
- marquee ticker วิ่งด้านล่าง
- scroll indicator arrow

### FR-4: About Section
- 2-column layout (avatar + bio)
- tech stack แสดงเป็น badge/tag `[React]` `[Next.js]` ฯลฯ
- short bio 2-3 ประโยค

### FR-5: Projects Section
- grid layout 2-3 columns
- project card: thumbnail + title + short description + tech tags
- hover: glitch/distortion effect
- click: expand detail (modal หรือ inline expand)
- ลิงก์ไป live demo / GitHub

### FR-6: Experience Section
- vertical timeline
- แต่ละ entry: ปี, ตำแหน่ง, บริษัท, description สั้น
- terminal log style `[2024] > Role @ Company`
- scroll reveal animation

### FR-7: Contact Section
- terminal-style contact form (name, email, message)
- social links: GitHub, LinkedIn, Email
- "END OF FILE" footer text

### FR-8: Cyberpunk Custom Cursor
- ซ่อน native cursor แทนด้วย custom cursor แบบ HUD crosshair
- 2 layers: outer ring (lerp ตามช้า) + inner dot (ตามทันที)
- เปลี่ยน state ตาม hover context: default / link / project card / text
- hover project card → crosshair bracket `[ + ]` style
- desktop only (detect `pointer: fine`), ซ่อนบน touch devices
- glow trail optional
- `prefers-reduced-motion`: ปิด lerp + trail

## Non-Functional Requirements

### Performance
- Lighthouse Performance ≥ 90
- First Contentful Paint < 1.5s (ไม่รวม boot animation)
- ใช้ next/image สำหรับรูปทั้งหมด
- lazy load sections below the fold

### Responsive
- Mobile first: 320px → 1440px+
- breakpoints: sm(640), md(768), lg(1024), xl(1280)
- boot screen & navbar ต้องใช้ได้ดีทุก screen size

### Accessibility
- semantic HTML
- keyboard navigation สำหรับ menu
- prefers-reduced-motion: ปิด glitch/heavy animations
- color contrast ratio ≥ 4.5:1

### SEO
- proper meta tags, OG image
- structured heading hierarchy
- sitemap
