import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getThisWeekHistory, getThisWeekTotal, getChallengeData, formatPrice, getWeekStartKST, getMonthHistory, getMonthTotal } from '../utils/storage';

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

function getKSTYearMonth(): string {
  const kst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 7); // 'YYYY-MM'
}

function formatYearMonth(ym: string): string {
  const [y, m] = ym.split('-');
  return `${y}년 ${parseInt(m)}월`;
}

// 월별 일별 지출 SVG 바차트
function MonthBarChart({ yearMonth }: { yearMonth: string }) {
  const records = getMonthHistory(yearMonth);
  const daysInMonth = new Date(parseInt(yearMonth.slice(0, 4)), parseInt(yearMonth.slice(5, 7)), 0).getDate();
  const byDay: Record<number, number> = {};
  records.forEach(r => {
    const day = parseInt(r.date.slice(8, 10));
    byDay[day] = (byDay[day] ?? 0) + r.price;
  });
  const maxVal = Math.max(...Object.values(byDay), 1);

  return (
    <div className="month-chart">
      <div className="month-bars">
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const val = byDay[day] ?? 0;
          const pct = Math.round((val / maxVal) * 100);
          return (
            <div key={day} className="month-bar-col" title={val > 0 ? formatPrice(val) : ''}>
              <div className="month-bar-track">
                <div className="month-bar-fill" style={{ height: `${pct}%` }} />
              </div>
              {(day === 1 || day % 5 === 0) && (
                <span className="month-bar-label">{day}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'week' | 'month'>('week');

  // 월 선택 (현재 월 기준 최근 3개월)
  const currentYM = getKSTYearMonth();
  const monthOptions = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => {
      const d = new Date(Date.now() + 9 * 60 * 60 * 1000);
      d.setUTCMonth(d.getUTCMonth() - i);
      return d.toISOString().slice(0, 7);
    });
  }, []);
  const [selectedMonth, setSelectedMonth] = useState(currentYM);

  // 주간 데이터
  const thisWeek = getThisWeekHistory();
  const weekTotal = getThisWeekTotal();
  const { weekBudget } = getChallengeData();
  const weekPct = Math.min(100, Math.round((weekTotal / weekBudget) * 100));

  const weekDots = useMemo(() => {
    const dots = getWeekDots();
    const dateSet = new Set(thisWeek.map(r => r.date));
    return dots.map(d => ({ ...d, hasRecord: dateSet.has(d.date) }));
  }, [thisWeek]);

  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    thisWeek.forEach(r => { counts[r.category] = (counts[r.category] ?? 0) + 1; });
    const total = thisWeek.length || 1;
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
      .map(([cat, count]) => ({ cat, pct: Math.round((count / total) * 100) }));
  }, [thisWeek]);

  // 월간 데이터
  const monthRecords = getMonthHistory(selectedMonth);
  const monthTotal = getMonthTotal(selectedMonth);
  const monthCategoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    monthRecords.forEach(r => { counts[r.category] = (counts[r.category] ?? 0) + 1; });
    const total = monthRecords.length || 1;
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
      .map(([cat, count]) => ({ cat, pct: Math.round((count / total) * 100) }));
  }, [monthRecords]);

  return (
    <div className="page history-page">
      <div className="page-header-simple">
        <h1 className="page-title">식사 기록</h1>
      </div>

      {/* 탭 */}
      <div className="history-tabs">
        <button className={`history-tab ${tab === 'week' ? 'active' : ''}`} onClick={() => setTab('week')}>이번 주</button>
        <button className={`history-tab ${tab === 'month' ? 'active' : ''}`} onClick={() => setTab('month')}>월간</button>
      </div>

      {tab === 'week' && (
        <>
          <div className="week-summary-card">
            <div className="week-summary-row">
              <span className="week-summary-label">이번 주 지출</span>
              <span className="week-summary-total">{formatPrice(weekTotal)}</span>
            </div>
            <div className="week-progress-track">
              <div className="week-progress-fill" style={{ width: `${weekPct}%`, background: weekPct >= 90 ? '#FF3B30' : weekPct >= 70 ? '#FF6B35' : '#FFB800' }} />
            </div>
            <div className="week-summary-row">
              <span className="week-budget-label">목표 {formatPrice(weekBudget)}</span>
              <span className="week-remain-label">남은 예산 {formatPrice(Math.max(0, weekBudget - weekTotal))}</span>
            </div>
          </div>

          <div className="week-dots">
            {weekDots.map(d => (
              <div key={d.date} className="week-dot-item">
                <div className={`week-dot ${d.hasRecord ? 'filled' : ''}`} />
                <span className="week-dot-label">{d.label}</span>
              </div>
            ))}
          </div>

          <div className="history-list">
            {thisWeek.length === 0 ? (
              <div className="empty-state">
                <p>이번 주 기록이 없어요.</p>
                <p>홈에서 메뉴 추천을 받아보세요!</p>
                <button className="btn-empty-action" onClick={() => navigate('/')}>메뉴 추천받기</button>
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

          {categoryStats.length > 0 && (
            <div className="category-stats">
              <h3 className="stats-title">자주 먹은 카테고리</h3>
              {categoryStats.map(({ cat, pct }) => (
                <div key={cat} className="stats-row">
                  <span className="stats-cat">{cat}</span>
                  <div className="stats-bar-track"><div className="stats-bar-fill" style={{ width: `${pct}%` }} /></div>
                  <span className="stats-pct">{pct}%</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'month' && (
        <>
          {/* 월 선택 */}
          <div className="month-selector">
            {monthOptions.map(ym => (
              <button key={ym} className={`month-tab ${selectedMonth === ym ? 'active' : ''}`} onClick={() => setSelectedMonth(ym)}>
                {formatYearMonth(ym)}
              </button>
            ))}
          </div>

          <div className="week-summary-card">
            <div className="week-summary-row">
              <span className="week-summary-label">{formatYearMonth(selectedMonth)} 총 지출</span>
              <span className="week-summary-total">{formatPrice(monthTotal)}</span>
            </div>
            <div className="week-summary-row" style={{ marginTop: 4 }}>
              <span className="week-budget-label">{monthRecords.length}회 기록</span>
              <span className="week-remain-label">평균 {monthRecords.length > 0 ? formatPrice(Math.round(monthTotal / monthRecords.length)) : '0원'}/끼</span>
            </div>
          </div>

          <MonthBarChart yearMonth={selectedMonth} />

          {monthRecords.length === 0 ? (
            <div className="empty-state"><p>{formatYearMonth(selectedMonth)} 기록이 없어요.</p></div>
          ) : (
            <div className="history-list">
              {monthRecords.map(record => (
                <div key={record.date} className="history-item">
                  <div className="history-day">{record.date.slice(8)}일</div>
                  <div className="history-info">
                    <span className="history-menu">{record.menuName}</span>
                    <span className="history-category">{record.category}</span>
                  </div>
                  <span className="history-price">{formatPrice(record.price)}</span>
                </div>
              ))}
            </div>
          )}

          {monthCategoryStats.length > 0 && (
            <div className="category-stats">
              <h3 className="stats-title">카테고리별 비율</h3>
              {monthCategoryStats.map(({ cat, pct }) => (
                <div key={cat} className="stats-row">
                  <span className="stats-cat">{cat}</span>
                  <div className="stats-bar-track"><div className="stats-bar-fill" style={{ width: `${pct}%` }} /></div>
                  <span className="stats-pct">{pct}%</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
