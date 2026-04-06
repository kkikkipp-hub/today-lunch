import type { MenuItem } from '../data/menus';

export interface LunchRecord {
  date: string;       // YYYY-MM-DD KST
  menuId: string;
  menuName: string;
  category: string;
  price: number;      // user-entered or estimated midpoint
}

const KEY_HISTORY = 'lunch_history';
const KEY_BUDGET_GOAL = 'lunch_budget_goal';

function kstDate(): string {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

function safeGet(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
}

export function getHistory(): LunchRecord[] {
  try {
    return JSON.parse(safeGet(KEY_HISTORY) || '[]');
  } catch { return []; }
}

export function addRecord(menu: MenuItem, price?: number): LunchRecord {
  const record: LunchRecord = {
    date: kstDate(),
    menuId: menu.id,
    menuName: menu.name,
    category: menu.category,
    price: price ?? Math.round((menu.minPrice + menu.maxPrice) / 2),
  };
  const history = getHistory();
  // Allow only one record per day (replace if same day)
  const filtered = history.filter(r => r.date !== record.date);
  safeSet(KEY_HISTORY, JSON.stringify([record, ...filtered].slice(0, 30)));
  return record;
}

export function getWeekHistory(): LunchRecord[] {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const history = getHistory();
  const result: LunchRecord[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(kst);
    d.setUTCDate(kst.getUTCDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const found = history.find(r => r.date === dateStr);
    if (found) result.push(found);
  }
  return result;
}

export function getWeekTotal(): number {
  return getWeekHistory().reduce((sum, r) => sum + r.price, 0);
}

export function getBudgetGoal(): number {
  return parseInt(safeGet(KEY_BUDGET_GOAL) || '50000', 10);
}

export function setBudgetGoal(amount: number): void {
  safeSet(KEY_BUDGET_GOAL, String(amount));
}

export function getTodayRecord(): LunchRecord | null {
  return getHistory().find(r => r.date === kstDate()) ?? null;
}
