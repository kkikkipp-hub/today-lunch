import { useLocation, useNavigate } from 'react-router-dom';

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF6B35' : '#8B95A1'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function HistoryIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF6B35' : '#8B95A1'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function ChallengeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF6B35' : '#8B95A1'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 000-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0012 0V2z"/>
    </svg>
  );
}

const TABS = [
  { path: '/', label: '홈', Icon: HomeIcon },
  { path: '/history', label: '기록', Icon: HistoryIcon },
  { path: '/challenge', label: '챌린지', Icon: ChallengeIcon },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHidden = location.pathname === '/result' ||
    location.pathname === '/privacy' ||
    location.pathname === '/support';

  if (isHidden) return null;

  return (
    <nav className="bottom-nav" aria-label="메인 탭">
      {TABS.map(({ path, label, Icon }) => {
        const active = location.pathname === path;
        return (
          <button
            key={path}
            className={`bottom-nav-item ${active ? 'active' : ''}`}
            onClick={() => navigate(path)}
            aria-current={active ? 'page' : undefined}
          >
            <Icon active={active} />
            <span className="bottom-nav-label">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
