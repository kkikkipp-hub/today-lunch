import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { type MenuItem, CATEGORY_LABELS } from '../data/menus';
import { addLunchRecord, formatPrice, getThisWeekTotal, getChallengeData, getFavoritePlaces, toggleFavoritePlace, isFavoritePlace } from '../utils/storage';
import { searchByMenuName, type NearbyPlace } from '../utils/kakao';

function BackIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
}
function LocationPinIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function ShuffleIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>;
}
function CheckIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>;
}
function MapPinIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function PhoneIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>;
}
function CloseIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}
function HeartIcon({ filled }: { filled?: boolean }) {
  return filled
    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--coral)" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
}
function ShareIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
}

interface LocationState {
  results: MenuItem[];
  budget: number;
  date: string;
  lat?: number;
  lng?: number;
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
  const [shareCopied, setShareCopied] = useState(false);

  // 바텀시트 상태
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetPlaces, setSheetPlaces] = useState<NearbyPlace[]>([]);
  const [sheetLoading, setSheetLoading] = useState(false);
  const [sheetError, setSheetError] = useState<string | null>(null);
  // 가게 선택 & 가격 입력
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState('');
  const [placeSaved, setPlaceSaved] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set(getFavoritePlaces().map(f => f.id)));

  const results = shuffled;
  const date = state?.date ?? '';
  const lat = state?.lat;
  const lng = state?.lng;
  const hasCoords = lat !== undefined && lng !== undefined;

  function handleReshuffle() {
    setShuffled(prev => shuffleArray(prev));
    setMainIdx(0);
    setSaved(false);
    setSheetOpen(false);
  }

  useEffect(() => {
    if (!results.length) navigate('/');
  }, [results, navigate]);

  // 바텀시트 닫힐 때 스크롤 복원
  useEffect(() => {
    document.body.style.overflow = sheetOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sheetOpen]);

  if (!results.length) return null;

  const main = results[mainIdx];
  const avgPrice = Math.round((main.minPrice + main.maxPrice) / 2);

  const weekTotal = getThisWeekTotal();
  const { weekBudget } = getChallengeData();
  const weekPct = Math.min(100, Math.round((weekTotal / weekBudget) * 100));

  async function handleShare() {
    const text = `오늘 점심은 "${main.name}"!\n${main.reason}\n${formatPrice(main.minPrice)} ~ ${formatPrice(main.maxPrice)}`;
    if (navigator.share) {
      await navigator.share({ title: '오늘의 점심 추천', text }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(text).catch(() => {});
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  }

  function handleSave() {
    addLunchRecord({
      date,
      menuName: main.name,
      category: CATEGORY_LABELS[main.category],
      price: avgPrice,
    });
    setSaved(true);
  }

  function handleSelectPlace(placeId: string) {
    if (selectedPlaceId === placeId) {
      setSelectedPlaceId(null);
      setPriceInput('');
    } else {
      setSelectedPlaceId(placeId);
      setPriceInput('');
    }
  }

  function handleSavePlace(place: NearbyPlace) {
    const price = parseInt(priceInput.replace(/,/g, ''), 10);
    if (!price || price <= 0) return;
    addLunchRecord({
      date,
      menuName: `${main.name} (${place.name})`,
      category: CATEGORY_LABELS[main.category],
      price,
    });
    setPlaceSaved(place.id);
    setSelectedPlaceId(null);
    setPriceInput('');
    setSaved(true);
  }

  function handleToggleFavorite(place: NearbyPlace) {
    const added = toggleFavoritePlace({ id: place.id, name: place.name, address: place.address, phone: place.phone });
    setFavorites(prev => {
      const next = new Set(prev);
      added ? next.add(place.id) : next.delete(place.id);
      return next;
    });
  }

  async function handleShowNearby() {
    if (!hasCoords) return;
    setSheetOpen(true);
    setSheetLoading(true);
    setSheetError(null);
    try {
      const raw = await searchByMenuName(main.name, lat!, lng!);
      // 즐겨찾기 먼저 정렬
      const favIds = new Set(getFavoritePlaces().map(f => f.id));
      const places = [...raw].sort((a, b) => (favIds.has(b.id) ? 1 : 0) - (favIds.has(a.id) ? 1 : 0));
      setSheetPlaces(places);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setSheetError(msg);
      console.error('[nearby] 오류:', msg);
    } finally {
      setSheetLoading(false);
    }
  }

  return (
    <div className="page result-page">
      <div className="result-header">
        <button className="btn-back" onClick={() => navigate('/')} aria-label="뒤로가기">
          <BackIcon />
        </button>
        <span className="result-header-title">오늘의 추천</span>
        <div className="result-header-right">
          <button className="btn-share" onClick={() => void handleShare()} aria-label="공유">
            <ShareIcon />
            {shareCopied ? '복사됨!' : '공유'}
          </button>
          <button className="btn-reshuffle" onClick={handleReshuffle}>
            <ShuffleIcon />
            다시 추천
          </button>
        </div>
      </div>

      {/* 메인 추천 카드 */}
      <div className="main-card">
        <div className="main-card-top">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <circle cx="32" cy="32" r="32" fill="var(--coral-light)"/>
            <ellipse cx="32" cy="42" rx="14" ry="4" fill="none" stroke="var(--coral)" strokeWidth="2"/>
            <path d="M18 42 Q18 50 32 50 Q46 50 46 42" fill="none" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round"/>
            <line x1="27" y1="20" x2="24" y2="40" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round"/>
            <line x1="32" y1="18" x2="29" y2="40" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="27" cy="19" r="2" fill="var(--gold)"/>
            <circle cx="32" cy="17" r="2" fill="var(--gold)"/>
          </svg>
        </div>

        <div className="main-card-body">
          <h2 className="menu-name">{main.name}</h2>
          <p className="menu-price">{formatPrice(main.minPrice)} ~ {formatPrice(main.maxPrice)}</p>
          <p className="menu-reason">"{main.reason}"</p>
          {main.isRealPlace && main.address && (
            <p className="menu-address">
              <LocationPinIcon />
              {main.address}
            </p>
          )}
          {main.isRealPlace && main.phone && (
            <p className="menu-phone">{main.phone}</p>
          )}
          <div className="menu-tags">
            {main.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          {/* 주변 가게 보기 버튼 — 위치 있을 때만 */}
          {hasCoords && import.meta.env.VITE_KAKAO_API_KEY && (
            <button className="btn-nearby" onClick={handleShowNearby}>
              <MapPinIcon />
              근처 가게 보기
            </button>
          )}
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
                aria-label={`${m.name} 선택`}
                onClick={() => { setMainIdx(i); setSaved(false); setSheetOpen(false); }}
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

      {/* 주변 가게 바텀시트 */}
      {sheetOpen && (
        <>
          <div className="sheet-backdrop" onClick={() => setSheetOpen(false)} />
          <div className="sheet" role="dialog" aria-label={`${main.name} 근처 가게`}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <span className="sheet-title">"{main.name}" 근처 가게</span>
              <button className="sheet-close" onClick={() => setSheetOpen(false)} aria-label="닫기">
                <CloseIcon />
              </button>
            </div>
            <div className="sheet-body">
              {sheetLoading && (
                <div className="sheet-loading">
                  <div className="sheet-spinner" />
                  <p>가게 찾는 중...</p>
                </div>
              )}
              {sheetError && (
                <p className="sheet-empty">오류: {sheetError}</p>
              )}
              {!sheetLoading && !sheetError && sheetPlaces.length === 0 && (
                <p className="sheet-empty">반경 1km 내 가게를 찾지 못했어요.</p>
              )}
              {!sheetLoading && sheetPlaces.map(place => {
                const isSelected = selectedPlaceId === place.id;
                const isSaved = placeSaved === place.id;
                return (
                  <div key={place.id} className={`place-item ${isSelected ? 'place-item--open' : ''}`}>
                    <button
                      className="place-row"
                      onClick={() => !isSaved && handleSelectPlace(place.id)}
                      aria-expanded={isSelected}
                    >
                      <div className="place-info">
                        <span className="place-name">
                          {favorites.has(place.id) && <span className="fav-dot" />}
                          {place.name}
                        </span>
                        <span className="place-address">
                          <LocationPinIcon />
                          {place.distanceStr} · {place.address}
                        </span>
                        {place.phone && (
                          <span className="place-phone">
                            <PhoneIcon />
                            {place.phone}
                          </span>
                        )}
                      </div>
                      <div className="place-actions">
                        <button
                          className="btn-fav"
                          onClick={e => { e.stopPropagation(); handleToggleFavorite(place); }}
                          aria-label={favorites.has(place.id) ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                        >
                          <HeartIcon filled={favorites.has(place.id)} />
                        </button>
                        {isSaved
                          ? <span className="place-saved-badge"><CheckIcon />기록됨</span>
                          : <span className="place-dist-badge">{place.distanceStr}</span>
                        }
                      </div>
                    </button>
                    {isSelected && (
                      <div className="place-record-row">
                        <div className="place-price-input-wrap">
                          <input
                            className="place-price-input"
                            type="number"
                            inputMode="numeric"
                            placeholder="실제 금액 입력"
                            value={priceInput}
                            onChange={e => setPriceInput(e.target.value)}
                            autoFocus
                          />
                          <span className="place-price-unit">원</span>
                        </div>
                        <button
                          className="place-record-btn"
                          onClick={() => handleSavePlace(place)}
                          disabled={!priceInput || parseInt(priceInput) <= 0}
                        >
                          기록하기
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
