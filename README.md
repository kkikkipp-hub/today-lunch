# 오늘의 점심

> 기분과 예산에 맞는 점심 메뉴, 매일 딱 맞게 추천해드려요

토스 미니앱 (앱인토스). React 19 + TypeScript + Vite.

---

## 주요 기능

- **메뉴 추천**: 기분(든든/가볍게/매콤/건강), 예산, 음식 종류 선택 → 최대 3개 추천
- **다시 추천**: Fisher-Yates 셔플로 현재 결과 순서 재배치 (홈으로 이동 없음)
- **식사 기록**: 추천 결과를 로컬 스토리지에 저장
- **주간 챌린지**: 식사비 절약 목표 설정 및 진행률 추적
- **뱃지 시스템**: 연속 기록, 주간/월간 목표 달성 시 뱃지 획득

---

## 기술 스택

| | |
|---|---|
| 프레임워크 | React 19 + TypeScript + Vite |
| 라우팅 | react-router-dom v7 |
| 스타일 | CSS Variables (no framework) |
| 폰트 | Pretendard Variable |
| SDK | `@apps-in-toss/web-framework` (mock 패턴) |
| 테스트 | Vitest + happy-dom |

---

## 개발 시작

```bash
npm install
npm run dev        # 개발 서버 (http://localhost:5173)
npm run build      # 프로덕션 빌드
npm run preview    # 빌드 결과 미리보기
npm test           # 테스트 실행
```

---

## 토스 심사 등록

`TOSS_REGISTRATION.md` 참고.

---

## 페이지 구조

| 경로 | 설명 |
|------|------|
| `/` | 홈 (기분·예산·음식 종류 선택) |
| `/result` | 추천 결과 |
| `/history` | 이번 주 식사 기록 |
| `/challenge` | 식사비 절약 챌린지 |
| `/privacy` | 개인정보처리방침 |
| `/support` | 고객지원 |
