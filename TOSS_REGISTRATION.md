# 토스 미니앱 등록 체크리스트 — 오늘의 점심

> 공식 문서: https://developers-apps-in-toss.toss.im

---

## 등록 정보

| 항목 | 내용 |
|------|------|
| 앱 이름 | 오늘의 점심 |
| 카테고리 | 생활 / 편의 |
| 한줄 소개 | 기분과 예산에 맞는 점심 메뉴, 매일 딱 맞게 추천해드려요 |
| 서비스 URL (운영) | (배포 후 작성) |
| 서비스 URL (테스트) | `http://localhost:5173` |
| 개인정보처리방침 | `{서비스URL}/privacy` |
| 고객센터 URL | `{서비스URL}/support` |
| 고객센터 전화번호 | **1660-0161** |
| 로고 | `public/logo-512.png` (512×512px PNG) ✅ |

> 무료 앱이므로 사업자등록 없이 출시 가능.

---

## 사전 준비

| 항목 | 상태 | 비고 |
|------|------|------|
| 토스 콘솔 계정 생성 | ⬜ 미완 | https://developers-apps-in-toss.toss.im |
| 미니앱 콘솔 등록 | ⬜ 미완 | 계정 생성 후 진행 |
| 서비스 배포 (Cloudflare Pages) | ⬜ 미완 | 아래 배포 방법 참고 |

---

## 기술 체크리스트

| 항목 | 상태 | 파일 |
|------|------|------|
| 모바일 viewport (375px) | ✅ | `index.html` |
| `viewport-fit=cover` (safe-area) | ✅ | `index.html` |
| Toss SDK 초기화 (`TossApp.ready()`) | ✅ mock | `src/sdk/tossSDK.ts` |
| 뒤로가기 처리 (`tossSDK.close()`) | ✅ mock | `src/sdk/tossSDK.ts` |
| 개인정보처리방침 페이지 | ✅ | `/privacy` |
| 고객센터 페이지 | ✅ | `/support` |
| 고객센터 전화번호 표시 | ✅ | `/support` — 1660-0161 |
| SPA 라우팅 (`_redirects`) | ✅ | `public/_redirects` |
| 로고 512×512px PNG | ✅ | `public/logo-512.png` |
| 이모지 사용 금지 (SVG 아이콘 사용) | ✅ | 전 페이지 확인 완료 |
| 외부 링크 없음 | ⚠️ | `index.html`의 Pretendard CDN 링크 확인 필요 |
| localStorage 정상 동작 | ✅ | 토스 WebView 지원 |
| setInterval cleanup | ✅ | 사용 없음 |
| 실제 SDK 교체 | ⬜ | 토스 심사 전 mock → 실 SDK 교체 |

---

## SDK 실제 연동 시 변경 사항

현재 `src/sdk/tossSDK.ts`는 토스 앱 외부에서도 동작하는 mock 패턴.
토스 심사 전 아래 패키지가 공개 배포 후 교체:

```bash
npm install @apps-in-toss/web-framework
```

`tossSDK.ts`의 `import('@apps-in-toss/web-framework')` 부분이 실제 SDK로 동작.

---

## 배포 방법 (Cloudflare Pages)

```bash
# 빌드
npm run build

# Cloudflare Pages 최초 생성
npx wrangler pages project create today-lunch

# 배포
npx wrangler pages deploy dist --project-name today-lunch
```

---

## 등록 단계

```
1단계: 콘솔 계정 생성
  └─ https://developers-apps-in-toss.toss.im → 토스 앱 로그인 → 워크스페이스 생성

2단계: 미니앱 등록
  └─ 앱 이름, 로고(public/logo-512.png), 카테고리, 서비스 URL 입력
  └─ 개인정보처리방침 URL: {서비스URL}/privacy
  └─ 고객센터 URL: {서비스URL}/support
  └─ 고객센터 전화번호: 1660-0161

3단계: 샌드박스 테스트
  └─ 토스 앱 개발자 모드에서 로컬 URL 연결
  └─ iOS + Android 양쪽 테스트

4단계: 검수 요청
  └─ 콘솔 → "검수 요청" → 1~2 영업일

5단계: 승인 후 오픈
```
