# 오늘의 점심 — Design System

> Extracted from source: `src/index.css` | Updated: 2026-04-06

---

## 1. App Overview

| | |
|---|---|
| App name | 오늘의 점심 |
| Concept | Toss mini-app for daily lunch recommendations |
| Target | Toss users who want help deciding what to eat |
| Tone | Warm, casual, friendly — Toss-native |
| Layout | Mobile-first, max-width 430px, bottom nav |

---

## 2. Color System

All colors are defined as CSS variables on `:root`.

| Token | Value | Usage |
|-------|-------|-------|
| `--coral` | `#FF6B35` | Primary accent, active states, CTA icon |
| `--coral-light` | `#FFF0EA` | Active button backgrounds, tag backgrounds |
| `--gold` | `#FFB800` | Budget amounts, prices, progress fills |
| `--blue` | `#0064FF` | Primary CTA button, links, focus rings |
| `--bg` | `#FFFBF5` | Page background (warm cream) |
| `--card` | `#FFFFFF` | Card surfaces |
| `--text` | `#191F28` | Primary text |
| `--sub` | `#8B95A1` | Secondary/label text, inactive icons |
| `--border` | `#E8EBF0` | Dividers, unselected button borders |
| `--green` | `#00C853` | Success state (save-done) |
| `--red` | `#FF3B30` | Over-budget warning |

### Semantic meanings
- **Coral** = interaction, selection, food warmth
- **Gold** = money, budget, prices
- **Blue** = primary action (the one thing to do next)
- **Green/Red** = budget status (on-track / over)

---

## 3. Typography

**Font stack:**
```css
font-family: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
```

| Class | Size | Weight | Usage |
|-------|------|--------|-------|
| `.home-title` | 22px | 700 | Page headline |
| `.menu-name` | 22px | 700 | Result card menu name |
| `.page-title` | 20px | 700 | Sub-page headers |
| `.section-label` | 15px | 600 | Card section titles |
| `.btn-cta` | 16px | 600 | CTA button |
| `.menu-price` | 16px | 600 | Price display |
| body | 16px | 400 | Base body text |
| `.menu-reason` | 14px | 400 | Quote text (line-height 1.6) |
| `.date-label` | 13px | 400 | Date / subtle labels |
| `.section-sub` | 12px | 400 | Hint text |
| `.bottom-nav-label` | 10px | 500 | Nav labels |

---

## 4. Spacing (4px base scale)

| Token | Value | Usage |
|-------|-------|-------|
| `--page-px` | 20px | Horizontal page padding |
| `--radius-lg` | 20px | Section cards |
| `--radius-md` | 12px | Buttons, input fields, smaller cards |
| `--radius-sm` | 8px | Tags, small UI chips |
| `--shadow` | `0 2px 12px rgba(0,0,0,0.08)` | Card resting shadow |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.12)` | Main recommendation card |

---

## 5. Components

### Mood / Category Buttons (toggle)
- Unselected: `--bg` background, `--border` border, `--sub` text
- Selected (active): `--coral-light` background, `--coral` border and text
- Transition: `background-color 0.15s, border-color 0.15s, color 0.15s`

### CTA Button
- Active: `--blue` background, white text, `border-radius: --radius-md`, 16px 16px padding
- Disabled: `--border` background, `--sub` text, `cursor: not-allowed`

### Cards
- Background: `--card` (white)
- Border-radius: `--radius-lg` (20px)
- Shadow: `--shadow`
- Horizontal margin: `--page-px` (20px)

### Bottom Nav
- Fixed, 56px height + safe-area-inset-bottom
- max-width: 430px, centered
- Active item: `--coral` color
- Inactive: `--sub` color

### Tags
- Pill shape: `border-radius: 20px`
- Colors: coral background + coral text

---

## 6. Layout

- **Max width:** 430px (centered on wider viewports)
- **Safe area:** `env(safe-area-inset-top/bottom)` applied to header and page padding
- **Page padding:** `min-height: 100svh`, bottom padding accounts for fixed nav (56px)

---

## 7. Accessibility

- Focus ring: `outline: 2px solid var(--blue); outline-offset: 2px` on `:focus-visible`
- Touch targets: minimum 44×44px on all interactive elements
- Reduced motion: `@media (prefers-reduced-motion: reduce)` collapses all transitions/animations
- Icons: SVG only, no emoji (Toss review requirement)

---

## 8. Toss Review Checklist

| Item | Spec | Status |
|------|------|--------|
| Mobile viewport | `width=device-width, initial-scale=1` | ✓ |
| Safe area | `env(safe-area-inset-*)` | ✓ |
| SVG icons only | No emoji | ✓ |
| `/privacy` page | 개인정보처리방침 | ✓ |
| `/support` page | 고객센터 | ✓ |
| WCAG AA contrast | 4.5:1 body text | ✓ |
| Touch targets 44px | All buttons/taps | ✓ |
| prefers-reduced-motion | Animations disabled | ✓ |

---

*Design system extracted from live source — 2026-04-06*
