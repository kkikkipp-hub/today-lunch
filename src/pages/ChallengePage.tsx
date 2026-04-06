import { useState } from 'react';
import { getChallengeData, setChallengeData, getThisWeekTotal, getThisWeekHistory, formatPrice } from '../utils/storage';

function BadgeFirst() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
}
function BadgeStreak() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>;
}
function BadgeWeekly() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg>;
}
function BadgeMonthly() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;
}

const BADGE_ICONS = { first: BadgeFirst, streak3: BadgeStreak, weekly: BadgeWeekly, monthly: BadgeMonthly };

const BADGES = [
  { id: 'first', label: '첫 기록', desc: '첫 번째 식사 기록', required: 1 },
  { id: 'streak3', label: '3일 연속', desc: '3일 연속 기록', required: 3 },
  { id: 'weekly', label: '주간 달성', desc: '이번 주 목표 달성', required: 0 },
  { id: 'monthly', label: '월간 달성', desc: '한 달 목표 달성', required: 20 },
];

function OnTrackIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>;
}
function OverTrackIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>;
}

function TrophyIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg>;
}

function getRemainingDays(): number {
  const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const dayOfWeek = now.getUTCDay();
  const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 0;
  return daysUntilFriday;
}

export default function ChallengePage() {
  const challengeData = getChallengeData();
  const [budget, setBudget] = useState(challengeData.weekBudget);

  const weekTotal = getThisWeekTotal();
  const weekHistory = getThisWeekHistory();
  const weekPct = Math.min(100, Math.round((weekTotal / budget) * 100));
  const remaining = Math.max(0, budget - weekTotal);
  const avgPerDay = weekHistory.length > 0 ? Math.round(weekTotal / weekHistory.length) : 0;
  const isOnTrack = avgPerDay <= Math.round(budget / 5);
  const remainDays = getRemainingDays();

  function handleBudgetChange(delta: number) {
    const next = Math.max(20000, Math.min(200000, budget + delta));
    setBudget(next);
    setChallengeData({ ...challengeData, weekBudget: next });
  }

  const weeklyAchieved = weekTotal <= budget && weekHistory.length >= 3;
  const badgeStatus = {
    first: weekHistory.length >= 1,
    streak3: weekHistory.length >= 3,
    weekly: weeklyAchieved,
    monthly: false,
  };

  const fillColor = weekPct >= 100 ? '#FF3B30' : weekPct >= 80 ? '#FF6B35' : weekPct >= 50 ? '#FFB800' : '#00C853';

  return (
    <div className="page challenge-page">
      <div className="page-header-simple">
        <TrophyIcon />
        <h1 className="page-title">식사비 절약 챌린지</h1>
      </div>

      {/* 목표 설정 */}
      <div className="challenge-card">
        <h2 className="challenge-section-title">이번 주 목표</h2>
        <div className="budget-control">
          <button className="budget-adj-btn" onClick={() => handleBudgetChange(-5000)} aria-label="5천원 감소">- 5천</button>
          <span className="challenge-budget-amount">{formatPrice(budget)}</span>
          <button className="budget-adj-btn" onClick={() => handleBudgetChange(5000)} aria-label="5천원 증가">+ 5천</button>
        </div>
        {remainDays > 0 && (
          <p className="remain-days">남은 기간: {remainDays}일</p>
        )}
      </div>

      {/* 진행 상황 */}
      <div className="challenge-card">
        <h2 className="challenge-section-title">현재 진행 상황</h2>
        <div className="challenge-amounts">
          <span className="challenge-spent">{formatPrice(weekTotal)}</span>
          <span className="challenge-target"> / {formatPrice(budget)}</span>
        </div>
        <div className="challenge-track">
          <div className="challenge-fill" style={{ width: `${weekPct}%`, background: fillColor }} />
        </div>
        <div className="challenge-meta">
          {avgPerDay > 0 && (
            <span className={`meta-item ${isOnTrack ? 'on-track' : 'over-track'}`}>
              하루 평균 {formatPrice(avgPerDay)} {isOnTrack ? <OnTrackIcon /> : <OverTrackIcon />}
            </span>
          )}
          <span className="meta-item">목표까지 {formatPrice(remaining)} 남음</span>
        </div>
      </div>

      {/* 달성 뱃지 */}
      <div className="challenge-card">
        <h2 className="challenge-section-title">달성 뱃지</h2>
        <div className="badge-grid">
          {BADGES.map(badge => {
            const unlocked = badgeStatus[badge.id as keyof typeof badgeStatus];
            return (
              <div key={badge.id} className={`badge-item ${unlocked ? 'unlocked' : 'locked'}`}>
                <div className={`badge-icon ${unlocked ? 'unlocked-icon' : ''}`}>
                  {unlocked ? (
                    (() => { const Icon = BADGE_ICONS[badge.id as keyof typeof BADGE_ICONS]; return <Icon />; })()
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                  )}
                </div>
                <span className="badge-label">{badge.label}</span>
                {!unlocked && <span className="badge-desc">{badge.desc}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
