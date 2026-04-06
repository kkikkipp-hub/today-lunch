import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Mood, type Category, MOOD_LABELS, CATEGORY_LABELS, recommendMenus } from '../data/menus';
import { getTodayKST } from '../utils/storage';

// SVG 아이콘
function HeartyIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>;
}
function LightIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
}
function SpicyIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z"/><path d="M8 12s1-2 4-2 4 2 4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
}
function HealthyIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
}

const MOOD_ICONS: Record<Mood, React.FC> = {
  hearty: HeartyIcon,
  light: LightIcon,
  spicy: SpicyIcon,
  healthy: HealthyIcon,
};

const CATEGORIES: Category[] = ['korean', 'chinese', 'japanese', 'western', 'snack', 'cafe'];

function getDateLabel(): string {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const month = now.getUTCMonth() + 1;
  const date = now.getUTCDate();
  const day = days[now.getUTCDay()];
  return `${month}월 ${date}일 ${day}요일`;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [budget, setBudget] = useState(10000);

  function toggleMood(mood: Mood) {
    setSelectedMoods(prev =>
      prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
    );
  }

  function toggleCategory(cat: Category) {
    setSelectedCategories(prev => {
      if (prev.includes(cat)) return prev.filter(c => c !== cat);
      if (prev.length >= 3) return prev;
      return [...prev, cat];
    });
  }

  function handleRecommend() {
    const results = recommendMenus(selectedMoods, selectedCategories, budget);
    navigate('/result', { state: { results, budget, date: getTodayKST() } });
  }

  const canRecommend = selectedMoods.length > 0 || selectedCategories.length > 0;

  return (
    <div className="page home-page">
      <div className="home-header">
        <p className="date-label">{getDateLabel()}</p>
        <h1 className="home-title">오늘 점심 뭐 먹을까요?</h1>
      </div>

      {/* 기분 선택 */}
      <div className="section-card">
        <h2 className="section-label">기분이 어때요?</h2>
        <div className="mood-grid">
          {(Object.keys(MOOD_LABELS) as Mood[]).map(mood => {
            const Icon = MOOD_ICONS[mood];
            const active = selectedMoods.includes(mood);
            return (
              <button
                key={mood}
                className={`mood-btn ${active ? 'active' : ''}`}
                onClick={() => toggleMood(mood)}
              >
                <span className="mood-icon"><Icon /></span>
                <span className="mood-label">{MOOD_LABELS[mood]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 예산 슬라이더 */}
      <div className="section-card">
        <h2 className="section-label">예산은요?</h2>
        <div className="budget-display">
          <span className="budget-amount">{budget.toLocaleString('ko-KR')}원</span>
        </div>
        <input
          type="range"
          min={5000}
          max={20000}
          step={1000}
          value={budget}
          onChange={e => setBudget(Number(e.target.value))}
          className="budget-slider"
          aria-label="예산 설정"
        />
        <div className="budget-range-labels">
          <span>5,000원</span>
          <span>20,000원</span>
        </div>
      </div>

      {/* 카테고리 선택 */}
      <div className="section-card">
        <h2 className="section-label">
          음식 종류
          <span className="section-sub"> (최대 3개)</span>
        </h2>
        <div className="category-grid">
          {CATEGORIES.map(cat => {
            const active = selectedCategories.includes(cat);
            return (
              <button
                key={cat}
                className={`category-btn ${active ? 'active' : ''}`}
                onClick={() => toggleCategory(cat)}
              >
                <span className="category-label">{CATEGORY_LABELS[cat]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="home-cta">
        <button
          className={`btn-cta ${canRecommend ? '' : 'disabled'}`}
          onClick={handleRecommend}
          disabled={!canRecommend}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
          오늘의 메뉴 추천받기
        </button>
      </div>
    </div>
  );
}
