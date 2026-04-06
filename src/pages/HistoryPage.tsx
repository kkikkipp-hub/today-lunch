import { useMemo } from 'react';
import { getThisWeekHistory, getThisWeekTotal, getChallengeData, formatPrice, getWeekStartKST } from '../utils/storage';

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

function getWeekDots(): { label: string; date: string; hasRecord: boolean }[] {
  const weekStart = getWeekStartKST();
  const start = new Date(weekStart + 'T00:00:00Z');
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    return { label: DAY_LABELS[i], date: dateStr, hasRecord: false };
  });
}

export default function HistoryPage() {
  const thisWeek = getThisWeekHistory();
  const weekTotal = getThisWeekTotal();
  const { weekBudget } = getChallengeData();
  const weekPct = Math.min(100, Math.round((weekTotal / weekBudget) * 100));

  const weekDots = useMemo(() => {
    const dots = getWeekDots();
    const dateSet = new Set(thisWeek.map(r => r.date));
    return dots.map(d => ({ ...d, hasRecord: dateSet.has(d.date) }));
  }, [thisWeek]);

  // 카테고리 통계
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    thisWeek.forEach(r => {
      counts[r.category] = (counts[r.category] ?? 0) + 1;
    });
    const total = thisWeek.length || 1;
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, count]) => ({ cat, pct: Math.round((count / total) * 100) }));
  }, [thisWeek]);

  return (
    <div className="page history-page">
      <div className="page-header-simple">
        <h1 className="page-title">이번 주 식사 기록</h1>
      </div>

      {/* 주간 요약 */}
      <div className="week-summary-card">
        <div className="week-summary-row">
          <span className="week-summary-label">이번 주 지출</span>
          <span className="week-summary-total">{formatPrice(weekTotal)}</span>
        </div>
        <div className="week-progress-track">
          <div
            className="week-progress-fill"
            style={{
              width: `${weekPct}%`,
              background: weekPct >= 90 ? '#FF3B30' : weekPct >= 70 ? '#FF6B35' : '#FFB800',
            }}
          />
        </div>
        <div className="week-summary-row">
          <span className="week-budget-label">목표 {formatPrice(weekBudget)}</span>
          <span className="week-remain-label">남은 예산 {formatPrice(Math.max(0, weekBudget - weekTotal))}</span>
        </div>
      </div>

      {/* 요일 점도트 */}
      <div className="week-dots">
        {weekDots.map(d => (
          <div key={d.date} className="week-dot-item">
            <div className={`week-dot ${d.hasRecord ? 'filled' : ''}`} />
            <span className="week-dot-label">{d.label}</span>
          </div>
        ))}
      </div>

      {/* 기록 리스트 */}
      <div className="history-list">
        {thisWeek.length === 0 ? (
          <div className="empty-state">
            <p>이번 주 기록이 없어요.</p>
            <p>홈에서 메뉴 추천을 받아보세요!</p>
          </div>
        ) : (
          thisWeek.map(record => (
            <div key={record.date} className="history-item">
              <div className="history-day">
                {DAY_LABELS[new Date(record.date + 'T00:00:00Z').getUTCDay() === 0 ? 6 : new Date(record.date + 'T00:00:00Z').getUTCDay() - 1]}
              </div>
              <div className="history-info">
                <span className="history-menu">{record.menuName}</span>
                <span className="history-category">{record.category}</span>
              </div>
              <span className="history-price">{formatPrice(record.price)}</span>
            </div>
          ))
        )}
      </div>

      {/* 카테고리 통계 */}
      {categoryStats.length > 0 && (
        <div className="category-stats">
          <h3 className="stats-title">자주 먹은 카테고리</h3>
          {categoryStats.map(({ cat, pct }) => (
            <div key={cat} className="stats-row">
              <span className="stats-cat">{cat}</span>
              <div className="stats-bar-track">
                <div className="stats-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="stats-pct">{pct}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
