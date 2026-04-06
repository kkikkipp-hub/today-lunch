import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { type MenuItem, CATEGORY_LABELS } from '../data/menus';
import { addLunchRecord, formatPrice, getThisWeekTotal, getChallengeData } from '../utils/storage';

function BackIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}
function ShuffleIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>;
}
function CheckIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>;
}

interface LocationState {
  results: MenuItem[];
  budget: number;
  date: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const [shuffled, setShuffled] = useState<MenuItem[]>(state?.results ?? []);
  const [mainIdx, setMainIdx] = useState(0);
  const [saved, setSaved] = useState(false);

  const results = shuffled;
  const date = state?.date ?? '';

  function handleReshuffle() {
    setShuffled(prev => shuffleArray(prev));
    setMainIdx(0);
    setSaved(false);
  }

  useEffect(() => {
    if (!results.length) navigate('/');
  }, [results, navigate]);

  if (!results.length) return null;

  const main = results[mainIdx];
  const avgPrice = Math.round((main.minPrice + main.maxPrice) / 2);

  const weekTotal = getThisWeekTotal();
  const { weekBudget } = getChallengeData();
  const weekPct = Math.min(100, Math.round((weekTotal / weekBudget) * 100));

  function handleSave() {
    addLunchRecord({
      date,
      menuName: main.name,
      category: CATEGORY_LABELS[main.category],
      price: avgPrice,
    });
    setSaved(true);
  }

  return (
    <div className="page result-page">
      <div className="result-header">
        <button className="btn-back" onClick={() => navigate('/')} aria-label="뒤로가기">
          <BackIcon />
        </button>
        <span className="result-header-title">오늘의 추천</span>
        <button className="btn-reshuffle" onClick={handleReshuffle}>
          <ShuffleIcon />
          다시 추천
        </button>
      </div>

      {/* 메인 추천 카드 */}
      <div className="main-card">
        <div className="main-card-top">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <circle cx="32" cy="32" r="32" fill="#FFF0EA"/>
            <ellipse cx="32" cy="42" rx="14" ry="4" fill="none" stroke="#FF6B35" strokeWidth="2"/>
            <path d="M18 42 Q18 50 32 50 Q46 50 46 42" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
            <line x1="27" y1="20" x2="24" y2="40" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
            <line x1="32" y1="18" x2="29" y2="40" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="27" cy="19" r="2" fill="#FFB800"/>
            <circle cx="32" cy="17" r="2" fill="#FFB800"/>
          </svg>
        </div>

        <div className="main-card-body">
          <h2 className="menu-name">{main.name}</h2>
          <p className="menu-price">{formatPrice(main.minPrice)} ~ {formatPrice(main.maxPrice)}</p>
          <p className="menu-reason">"{main.reason}"</p>
          <div className="menu-tags">
            {main.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 대안 메뉴 */}
      {results.length > 1 && (
        <div className="alt-menus">
          <p className="alt-label">다른 선택지</p>
          <div className="alt-grid">
            {results.map((m, i) => i === mainIdx ? null : (
              <button
                key={m.id}
                className="alt-card"
                onClick={() => { setMainIdx(i); setSaved(false); }}
              >
                <span className="alt-name">{m.name}</span>
                <span className="alt-price">{formatPrice(m.minPrice)}~</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 기록 버튼 */}
      <div className="result-actions">
        {!saved ? (
          <button className="btn-save" onClick={handleSave}>
            <CheckIcon />
            이 메뉴로 기록하기
          </button>
        ) : (
          <div className="save-done">
            <CheckIcon />
            기록 완료!
          </div>
        )}
      </div>

      {/* 챌린지 미니 프리뷰 */}
      <button className="challenge-preview" onClick={() => navigate('/challenge')}>
        <div className="challenge-preview-text">
          <span>이번 주 식사비</span>
          <span className="challenge-preview-amount">{formatPrice(weekTotal)} / {formatPrice(weekBudget)}</span>
        </div>
        <div className="challenge-preview-bar">
          <div className="challenge-preview-fill" style={{ width: `${weekPct}%` }} />
        </div>
        <span className="challenge-preview-pct">{weekPct}%</span>
      </button>
    </div>
  );
}
