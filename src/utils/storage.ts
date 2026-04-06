export interface LunchRecord {
  date: string;       // YYYY-MM-DD
  menuName: string;
  category: string;
  price: number;
}

export interface ChallengeData {
  weekBudget: number;     // 주간 목표 예산
  weekStart: string;      // YYYY-MM-DD (이번 주 월요일)
}

// Safe localStorage wrappers
function safeGet(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
}

// KST 기준 오늘 날짜
export function getTodayKST(): string {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

// 이번 주 월요일 날짜 (KST 기준)
export function getWeekStartKST(): string {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const day = kst.getUTCDay(); // 0=일, 1=월 ...
  const diff = day === 0 ? -6 : 1 - day;
  kst.setUTCDate(kst.getUTCDate() + diff);
  return kst.toISOString().slice(0, 10);
}

// 점심 기록 저장/로드
export function getLunchHistory(): LunchRecord[] {
  const raw = safeGet('lunch_history');
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

export function addLunchRecord(record: LunchRecord): void {
  const history = getLunchHistory();
  // 같은 날짜 기록이 있으면 교체
  const idx = history.findIndex(r => r.date === record.date);
  if (idx >= 0) {
    history[idx] = record;
  } else {
    history.unshift(record);
  }
  // 최근 30개만 유지
  safeSet('lunch_history', JSON.stringify(history.slice(0, 30)));
}

export function getThisWeekHistory(): LunchRecord[] {
  const weekStart = getWeekStartKST();
  return getLunchHistory().filter(r => r.date >= weekStart);
}

export function getThisWeekTotal(): number {
  return getThisWeekHistory().reduce((sum, r) => sum + r.price, 0);
}

// 챌린지 설정
const DEFAULT_BUDGET = 50000;

export function getChallengeData(): ChallengeData {
  const raw = safeGet('lunch_challenge');
  if (!raw) return { weekBudget: DEFAULT_BUDGET, weekStart: getWeekStartKST() };
  try { return JSON.parse(raw); } catch { return { weekBudget: DEFAULT_BUDGET, weekStart: getWeekStartKST() }; }
}

export function setChallengeData(data: ChallengeData): void {
  safeSet('lunch_challenge', JSON.stringify(data));
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR') + '원';
}
