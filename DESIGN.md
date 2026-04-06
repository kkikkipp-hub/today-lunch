# 오늘의 금전운 — UI/UX 디자인 가이드

> 작성: Isaac_D (@isaacd_bot) | 2026-04-06

---

## 1. 앱 개요

| 항목 | 내용 |
|------|------|
| 앱 이름 | 오늘의 금전운 |
| 영문명 | Daily Gold |
| 컨셉 | 매일 나만의 재물운/금전 운세를 확인하는 토스 미니앱 |
| 타겟 | 2030 MZ세대, 재테크에 관심 있는 토스 사용자 |
| 톤앤매너 | 신비롭지만 깔끔한, 토스다운 운세 앱 |

---

## 2. 디자인 시스템

### 2.1 컬러 팔레트

#### Primary Colors
- **토스 블루** `#0064FF` — CTA 버튼, 핵심 강조
- **골드** `#FFB800` — 금전운 테마 포인트, 코인/별 아이콘
- **딥 네이비** `#191F28` — 텍스트, 배경 그라데이션

#### Secondary Colors
- **라이트 골드** `#FFF3D6` — 카드 배경, 하이라이트
- **소프트 퍼플** `#7B61FF` — 별자리/운세 포인트
- **토스 그레이 100** `#F4F4F4` — 페이지 배경
- **토스 그레이 200** `#E5E8EB` — 디바이더, 보더
- **토스 그레이 500** `#8B95A1` — 서브텍스트
- **토스 그레이 900** `#191F28` — 본문 텍스트

#### Semantic Colors
- **대길** `#FF6B35` — 최고 운세
- **길** `#0064FF` — 좋은 운세
- **보통** `#8B95A1` — 평범한 운세
- **소흉** `#FF4646` — 주의 운세

#### 그라데이션
- **운세 카드 배경**: `linear-gradient(135deg, #191F28 0%, #2D1B69 50%, #0064FF 100%)`
- **골드 글로우**: `radial-gradient(circle, #FFB800 0%, rgba(255,184,0,0) 70%)`

### 2.2 타이포그래피

**폰트**: Pretendard Variable (1순위) / Inter (fallback)

```css
font-family: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
```

| 용도 | 크기 | 굵기 | 행간 | 사용처 |
|------|------|------|------|--------|
| Display | 32px | Bold (700) | 40px | 메인 운세 점수 |
| Heading 1 | 24px | Bold (700) | 32px | 페이지 타이틀 |
| Heading 2 | 20px | SemiBold (600) | 28px | 섹션 타이틀 |
| Heading 3 | 17px | SemiBold (600) | 24px | 카드 타이틀 |
| Body 1 | 16px | Regular (400) | 24px | 본문 텍스트 |
| Body 2 | 14px | Regular (400) | 20px | 보조 텍스트 |
| Caption | 12px | Regular (400) | 16px | 레이블, 날짜 |

### 2.3 간격 시스템 (4px 기반)

| 토큰 | 값 | 사용처 |
|------|-----|--------|
| spacing-xs | 4px | 아이콘-텍스트 간격 |
| spacing-sm | 8px | 인라인 요소 간격 |
| spacing-md | 12px | 리스트 아이템 간격 |
| spacing-lg | 16px | 카드 내부 패딩 |
| spacing-xl | 20px | 섹션 간격 |
| spacing-2xl | 24px | 카드 외부 마진 |
| spacing-3xl | 32px | 큰 섹션 간격 |
| spacing-4xl | 40px | 페이지 상단 여백 |

### 2.4 컴포넌트 스펙

#### 카드 (Card)
```css
.card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 16px;
}
```

#### 운세 카드 (Fortune Card) — 메인 히어로
```css
.fortune-card {
  background: linear-gradient(135deg, #191F28 0%, #2D1B69 50%, #0064FF 100%);
  border-radius: 20px;
  padding: 32px 24px;
  color: #FFFFFF;
  position: relative;
  overflow: hidden;
  min-height: 300px;
}
```

#### 버튼 (Primary)
```css
.btn-primary {
  background: #0064FF;
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 600;
  height: 52px;
  cursor: pointer;
}
/* full-width 필요시 .btn-full 추가 클래스 */
.btn-full { width: 100%; }
```

#### 버튼 (Secondary)
```css
.btn-secondary {
  background: #F4F4F4;
  color: #191F28;
  border: none;
  border-radius: 12px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 600;
  height: 52px;
}
```

#### 운세 등급 뱃지
```css
.fortune-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}
.badge-great  { background: rgba(255,107,53,0.12); color: #FF6B35; } /* 대길 */
.badge-good   { background: rgba(0,100,255,0.08);  color: #0064FF; } /* 길  */
.badge-normal { background: #F4F4F4; color: #8B95A1; }              /* 보통 */
.badge-caution{ background: rgba(255,70,70,0.08);  color: #FF4646; } /* 소흉 */
```

---

## 3. 아이콘 가이드 (토스 심사 필수)

> **중요**: 토스 심사 기준상 이모지 사용 금지. 모든 아이콘은 SVG로 제작.

### 3.1 아이콘 스펙
- **스타일**: 선형(outline) SVG, 2px stroke
- **크기**: 20×20px (기본), 24×24px (강조), 16×16px (캡션)
- **색상**: `currentColor` 사용 → 디자인 시스템 변수에 자동 연동
- **strokeLinecap**: round, **strokeLinejoin**: round

### 3.2 필요 아이콘 목록

| 아이콘 | 용도 | 파일명 |
|--------|------|--------|
| 동전(coin) | 메인 히어로, 로고 | icon-coin.svg |
| 별(star) | 파티클, 대길 강조 | icon-star.svg |
| 차트(chart-bar) | 주간 금전운 | icon-chart.svg |
| 시계(clock) | 황금 시간대 | icon-clock.svg |
| 신호등(traffic) | 소비/투자/저축 | icon-signal-go/wait/stop.svg |
| 공유(share) | 공유 버튼 | icon-share.svg |
| 뒤로(arrow-left) | 네비게이션 | icon-arrow-left.svg |
| 설정(settings) | 헤더 우측 | icon-settings.svg |
| 불꽃(flame) | 스트릭 | icon-flame.svg |
| 트로피(trophy) | 마일스톤 뱃지 | icon-trophy.svg |
| 다이아몬드(diamond) | 100일 뱃지 | icon-diamond.svg |
| 지갑(wallet) | 소비 신호등 | icon-wallet.svg |
| 주식(trending-up) | 투자 신호등 | icon-trending-up.svg |
| 저금통(piggy) | 저축 신호등 | icon-piggy.svg |

### 3.3 아이콘 컴포넌트 패턴
```tsx
// src/components/icons/IconCoin.tsx
export function IconCoin({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v1m0 8v1M9.5 9.5C9.5 8.67 10.67 8 12 8s2.5.67 2.5 1.5S13.33 11 12 11s-2.5.67-2.5 1.5S10.67 14 12 14s2.5-.67 2.5-1.5" />
    </svg>
  );
}
```

---

## 4. 화면 설계

### 4.1 메인 화면 — 띠 선택

**Viewport**: 375 × 812px

```
┌─────────────────────────────┐
│  safe-area-top              │
├─────────────────────────────┤
│  오늘의 금전운        [설정] │  ← 헤더 (56px)
│                             │
│  4월 6일 일요일              │  ← 날짜 (caption, gray-500)
│                             │
│  태어난 해를 입력하세요      │
│  ┌──────────────┐ [확인]    │  ← 연도 입력 + 버튼 (버튼 고정폭 80px)
│  │  예: 1995    │           │
│  └──────────────┘           │
│                             │
│  ──── 또는 띠를 선택 ────   │
│                             │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐       │
│  │🐀│ │🐂│ │🐅│ │🐇│       │  ← 12지 그리드 (4열)
│  │쥐│ │소│ │범│ │토│       │     카드: 16px radius
│  └──┘ └──┘ └──┘ └──┘       │     선택 시 골드 보더
│  ...                        │
│  safe-area-bottom           │
└─────────────────────────────┘
```

### 4.2 메인 화면 — 카드 (뒤집기 전)

```
┌─────────────────────────────┐
│  오늘의 금전운      [변경]   │
│  4월 6일 일요일              │
│                             │
│  🔥 3일 연속 접속  7일까지 4일│  ← 스트릭 배지 (라이트 골드 배경)
│                             │
│  ┌───────────────────────┐  │
│  │                  ✦ ✦  │  │
│  │   [동전 SVG 아이콘]    │  │  ← 운세 카드 히어로
│  │                       │  │     (gradient, 300px)
│  │   돼지띠의 금전운      │  │     별빛 SVG 파티클
│  │                       │  │     탭하면 뒤집기
│  │  탭하여 오늘의 운세    │  │
│  │  확인하기              │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### 4.3 메인 화면 — 결과 (카드 뒤집기 후)

```
┌─────────────────────────────┐
│  오늘의 금전운      [변경]   │
│  4월 6일 일요일              │
│                             │
│  ┌───────────────────────┐  │
│  │  돼지띠               │  │
│  │                       │  │
│  │    [대길 뱃지]         │  │  ← 운세 결과 카드
│  │                       │  │     골드 글로우 (대길 시)
│  │  금전운 점수           │  │
│  │  ████████░░  85점     │  │  ← 프로그레스 바 (애니메이션)
│  │                       │  │
│  │  "뜻밖의 수입이 들어올  │  │
│  │   수 있는 좋은 날입니다"│  │
│  │                       │  │
│  │  [자세히 보기 →]       │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │  [숫자볼] 17  30  36  │  │  ← 행운의 숫자 카드
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ [시계SVG] 오후 3시~5시 │  │  ← 황금 시간대 카드
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ [신호등SVG] 소비/투자/저│  │  ← 신호등 카드
│  │ STOP   GO   WAIT      │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ [차트SVG] 지난 7일 추이│  │  ← 주간 차트 카드
│  │ ▁▃▅█▄▂▆              │  │
│  └───────────────────────┘  │
│                             │
│  [공유 SVG 아이콘] 친구에게 공유  │  ← CTA 버튼 (full-width)
└─────────────────────────────┘
```

### 4.4 상세 운세 페이지

```
┌─────────────────────────────┐
│  [← SVG] 뒤로   상세운세    │
├─────────────────────────────┤
│  4월 6일의 금전운  [대길 뱃지]│
│                             │
│  ┌───────────────────────┐  │
│  │ [지갑SVG] 재물운 ████  85│  │
│  │ [차트SVG] 사업운 ████  72│  │  ← 4대 카테고리
│  │ [주식SVG] 투자운 ████  78│  │     프로그레스 바
│  │ [별SVG]   횡재운 ███   45│  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ 오늘의 금전 조언       │  │
│  │ "오늘은 큰 지출보다는..." │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ [별SVG] 행운의 숫자    │  │
│  │  ③  ⑦  ⑫            │  │  ← 숫자 볼 (bounceIn)
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ 행운의 컬러            │  │
│  │ [골드칩] [블루칩]      │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │ 금전 궁합 - 나와 맞는 띠│  │
│  │ [말 SVG] 말띠          │  │
│  └───────────────────────┘  │
│                             │
│  [공유SVG] 결과 공유하기     │
└─────────────────────────────┘
```

### 4.5 공유 카드 (340×480px)

```
┌─────────────────────────────┐
│  ✦ 오늘의 금전운 ✦           │  ← 로고 (SVG)
│                             │
│  ┌───────────────────────┐  │
│  │   2026. 4. 6 (일)     │  │
│  │                       │  │
│  │   [동전 SVG]  대길     │  │
│  │                       │  │
│  │   금전운 85점          │  │
│  │   ████████░░          │  │
│  │                       │  │
│  │ "뜻밖의 수입이 들어올   │  │
│  │  수 있는 좋은 날입니다" │  │
│  │                       │  │
│  │  행운의 숫자           │  │
│  │  17  30  36           │  │
│  └───────────────────────┘  │
│                             │
│  토스에서 나도 확인하기 →    │
│  Daily Gold 로고 마크       │
└─────────────────────────────┘
```
배경: 딥 네이비 → 퍼플 그라데이션

---

## 5. 애니메이션 & 모션 스펙

### 5.1 카드 뒤집기 (Y축 3D flip)
```css
.fortune-card-perspective { perspective: 1000px; }
.fortune-card-inner {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}
.fortune-card-inner.flipped { transform: rotateY(180deg); }
.fortune-card-front,
.fortune-card-back  { backface-visibility: hidden; position: absolute; inset: 0; }
.fortune-card-back  { transform: rotateY(180deg); }
```

### 5.2 별빛 SVG 파티클 (카드 배경)
- 파티클 수: 15~20개
- 크기: 2~6px 원형 SVG
- 색상: `#FFB800` / `#FFFFFF` / `#7B61FF` 랜덤
- 애니메이션:
```css
@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50%       { opacity: 1;   transform: scale(1.2); }
}
@keyframes float {
  0%, 100% { transform: translateY(0);    }
  50%       { transform: translateY(-10px); }
}
```

### 5.3 점수 프로그레스 바
```css
@keyframes fillProgress {
  from { width: 0%; }
  to   { width: var(--score); }
}
.progress-fill {
  animation: fillProgress 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 0.3s;
  background: linear-gradient(90deg, #0064FF, #FFB800);
  height: 8px;
  border-radius: 4px;
}
```

### 5.4 행운 숫자 볼 bounceIn
```css
@keyframes bounceIn {
  0%   { transform: scale(0);    opacity: 0; }
  60%  { transform: scale(1.15);             }
  100% { transform: scale(1);    opacity: 1; }
}
.lucky-number { animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; }
.lucky-number:nth-child(1) { animation-delay: 0.1s; }
.lucky-number:nth-child(2) { animation-delay: 0.2s; }
.lucky-number:nth-child(3) { animation-delay: 0.3s; }
```

### 5.5 대길 골드 글로우
```css
@keyframes goldGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(255,184,0,0.3); }
  50%       { box-shadow: 0 0 40px rgba(255,184,0,0.6); }
}
.grade-great { animation: goldGlow 2s ease-in-out infinite; }
```

### 5.6 주간 차트 바 성장
```css
@keyframes growBar { from { height: 0; } }
.chart-bar-fill { animation: growBar 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
```

### 5.7 페이지 전환
- 화면 간: `slide-left` 0.3s ease
- 모달/바텀시트: `slide-up` 0.3s cubic-bezier(0.4, 0, 0.2, 1)

---

## 6. Safe Area & 반응형

```css
:root {
  --safe-top:    env(safe-area-inset-top, 44px);
  --safe-bottom: env(safe-area-inset-bottom, 34px);
}
.app-header  { padding-top: calc(var(--safe-top) + 12px); }
.app-content { padding-bottom: calc(var(--safe-bottom) + 20px); }
```

| 기기 | 너비 | 대응 |
|------|------|------|
| iPhone SE | 375px | 기본 (base) |
| iPhone Pro | 390px | 여백 자동 조정 |
| iPhone Pro Max | 428px | 카드 너비 확장 |
| iPad+ | 768px+ | 중앙 정렬, max-width: 480px |

---

## 7. 로고 & 파비콘

### 7.1 앱 로고 (public/app-logo.svg + 512×512 PNG)
- 형태: 둥근 모서리 사각형(r=112px) 안에 동전 + 별빛 SVG 모티프
- 배경: 딥 네이비 → 토스 블루 그라데이션
- 메인 심볼: 빛나는 금색 동전, 주위 별빛 3개
- 스타일: 플랫 + 미니멀

### 7.2 파비콘 (public/favicon.svg)
- 32×32, 동전 SVG 심볼만 단순화

### 7.3 SVG 로고 코드
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#191F28"/>
      <stop offset="100%" stop-color="#0064FF"/>
    </linearGradient>
  </defs>
  <!-- 배경 -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)"/>
  <!-- 동전 원 -->
  <circle cx="256" cy="248" r="120" fill="#FFB800"/>
  <circle cx="256" cy="248" r="100" fill="#FFC940"/>
  <!-- 달러 심볼 -->
  <text x="256" y="288" text-anchor="middle" font-size="96" font-weight="700"
    fill="#191F28" font-family="sans-serif">$</text>
  <!-- 별빛 3개 -->
  <circle cx="360" cy="140" r="10" fill="#FFB800" opacity="0.9"/>
  <circle cx="390" cy="180" r="6"  fill="#FFFFFF" opacity="0.7"/>
  <circle cx="148" cy="160" r="8"  fill="#7B61FF" opacity="0.8"/>
</svg>
```

---

## 8. 토스 심사 체크리스트

| 항목 | 스펙 | 상태 |
|------|------|------|
| 모바일 viewport | `width=device-width, initial-scale=1, viewport-fit=cover` | 필수 |
| Safe Area 대응 | `env(safe-area-inset-*)` | 필수 |
| 아이콘 SVG 사용 | 이모지 사용 금지, outline SVG + currentColor | **필수** |
| 로고 512×512 PNG | `public/app-logo-512.png` | 필수 |
| /privacy 페이지 | 개인정보처리방침 | 필수 |
| /support 페이지 | 고객센터 (전화: 1660-0161) | 필수 |
| 외부 링크 없음 | 미니앱 내부에서만 동작 | 필수 |
| _redirects | `/* /index.html 200` (SPA용) | 필수 |
| 색상 대비 WCAG AA | 4.5:1 이상 | 권장 |
| 터치 타겟 44×44px | 모든 버튼/탭 영역 | 권장 |
| prefers-reduced-motion | 애니메이션 미디어 쿼리 대응 | 권장 |

---

*Design by Isaac_D (@isaacd_bot) | 2026-04-06*
