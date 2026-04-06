export type Mood = 'hearty' | 'light' | 'spicy' | 'healthy';
export type Category = 'korean' | 'chinese' | 'japanese' | 'western' | 'snack' | 'cafe';

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  moods: Mood[];
  minPrice: number;
  maxPrice: number;
  tags: string[];
  reason: string;
  // 실제 장소 데이터 (카카오 API)
  distance?: number;    // meters
  address?: string;
  phone?: string;
  isRealPlace?: boolean;
}

export const MENUS: MenuItem[] = [
  { id: 'm01', name: '김치찌개 정식', category: 'korean', moods: ['hearty', 'spicy'], minPrice: 8000, maxPrice: 10000, tags: ['얼큰', '든든', '한식'], reason: '얼큰하고 든든한 한식으로 오후도 파이팅!' },
  { id: 'm02', name: '된장찌개 정식', category: 'korean', moods: ['hearty', 'healthy'], minPrice: 7000, maxPrice: 9000, tags: ['구수한', '든든', '건강'], reason: '구수한 된장으로 속을 든든하게 채워요.' },
  { id: 'm03', name: '비빔밥', category: 'korean', moods: ['healthy', 'light'], minPrice: 8000, maxPrice: 11000, tags: ['건강', '채소', '균형'], reason: '신선한 채소로 영양 균형을 맞춰보세요!' },
  { id: 'm04', name: '제육볶음 정식', category: 'korean', moods: ['hearty', 'spicy'], minPrice: 8000, maxPrice: 10000, tags: ['매콤', '든든', '돼지고기'], reason: '매콤한 제육볶음으로 기운을 충전하세요!' },
  { id: 'm05', name: '순두부찌개', category: 'korean', moods: ['light', 'spicy'], minPrice: 7000, maxPrice: 9000, tags: ['얼큰', '부드러운', '단백질'], reason: '부드러운 순두부로 가볍게 먹어요.' },
  { id: 'm06', name: '삼겹살 정식', category: 'korean', moods: ['hearty'], minPrice: 10000, maxPrice: 14000, tags: ['든든', '고기', '특식'], reason: '든든한 고기 한 상으로 오늘 하루 보상!' },
  { id: 'm07', name: '짜장면', category: 'chinese', moods: ['hearty', 'light'], minPrice: 6000, maxPrice: 8000, tags: ['짜장', '면', '중식'], reason: '언제 먹어도 실패 없는 클래식 짜장면.' },
  { id: 'm08', name: '짬뽕', category: 'chinese', moods: ['spicy', 'hearty'], minPrice: 7000, maxPrice: 9000, tags: ['얼큰', '해물', '국물'], reason: '시원한 짬뽕 국물로 속을 풀어보세요!' },
  { id: 'm09', name: '탕수육', category: 'chinese', moods: ['hearty'], minPrice: 14000, maxPrice: 20000, tags: ['바삭', '달콤', '공유'], reason: '오늘은 동료와 함께 탕수육 어떠세요?' },
  { id: 'm10', name: '마라탕', category: 'chinese', moods: ['spicy'], minPrice: 10000, maxPrice: 15000, tags: ['마라', '얼얼', '중독성'], reason: '얼얼한 마라탕으로 스트레스를 날려버려요!' },
  { id: 'm11', name: '라멘', category: 'japanese', moods: ['hearty', 'spicy'], minPrice: 9000, maxPrice: 13000, tags: ['국물', '면', '든든'], reason: '진한 라멘 국물로 속을 따뜻하게 채워요.' },
  { id: 'm12', name: '돈카츠 정식', category: 'japanese', moods: ['hearty'], minPrice: 9000, maxPrice: 13000, tags: ['바삭', '든든', '일식'], reason: '바삭한 돈카츠로 포만감 가득하게!' },
  { id: 'm13', name: '연어 덮밥', category: 'japanese', moods: ['healthy', 'light'], minPrice: 10000, maxPrice: 14000, tags: ['신선한', '오메가3', '건강'], reason: '신선한 연어로 건강한 점심을!' },
  { id: 'm14', name: '초밥', category: 'japanese', moods: ['light', 'healthy'], minPrice: 10000, maxPrice: 18000, tags: ['신선한', '특식', '가벼운'], reason: '깔끔한 초밥으로 기분 전환해보세요.' },
  { id: 'm15', name: '파스타', category: 'western', moods: ['light', 'hearty'], minPrice: 9000, maxPrice: 14000, tags: ['양식', '면', '크림'], reason: '부드러운 파스타로 여유로운 점심 시간!' },
  { id: 'm16', name: '버거', category: 'western', moods: ['hearty'], minPrice: 8000, maxPrice: 13000, tags: ['든든', '패스트푸드', '간편'], reason: '든든한 버거로 오후 에너지 충전!' },
  { id: 'm17', name: '샐러드 볼', category: 'western', moods: ['healthy', 'light'], minPrice: 9000, maxPrice: 13000, tags: ['건강', '다이어트', '가벼운'], reason: '신선한 채소 한 가득, 가볍고 건강하게!' },
  { id: 'm18', name: '스테이크 덮밥', category: 'western', moods: ['hearty'], minPrice: 12000, maxPrice: 18000, tags: ['특식', '고기', '서양'], reason: '오늘은 스테이크로 스스로를 대접해요!' },
  { id: 'm19', name: '떡볶이 세트', category: 'snack', moods: ['spicy', 'light'], minPrice: 5000, maxPrice: 8000, tags: ['매콤', '분식', '추억'], reason: '매콤한 떡볶이로 추억 소환!' },
  { id: 'm20', name: '김밥 + 라면', category: 'snack', moods: ['light', 'hearty'], minPrice: 5000, maxPrice: 8000, tags: ['간편', '가성비', '분식'], reason: '가성비 최강! 김밥 + 라면 조합.' },
  { id: 'm21', name: '순대국밥', category: 'snack', moods: ['hearty', 'spicy'], minPrice: 7000, maxPrice: 9000, tags: ['든든', '국물', '서민'], reason: '뚝배기 순대국밥으로 든든하게!' },
  { id: 'm22', name: '카페 브런치', category: 'cafe', moods: ['light', 'healthy'], minPrice: 10000, maxPrice: 16000, tags: ['카페', '브런치', '여유'], reason: '오늘은 카페 브런치로 여유롭게!' },
  { id: 'm23', name: '샌드위치 + 커피', category: 'cafe', moods: ['light'], minPrice: 7000, maxPrice: 11000, tags: ['간편', '카페', '빠른'], reason: '바쁜 날엔 샌드위치로 가볍고 빠르게!' },
];

export function recommendMenus(
  moods: Mood[],
  categories: Category[],
  budget: number,
  excludeNames: string[] = [],
  weatherBoost: Partial<Record<Mood, number>> = {}
): MenuItem[] {
  const base = MENUS.filter(m => {
    const catMatch = categories.length === 0 || categories.includes(m.category);
    const budgetMatch = m.minPrice <= budget;
    return catMatch && budgetMatch;
  });

  // 이번 주 먹은 메뉴 제외 (결과가 없으면 제외 조건 무시)
  let filtered = base.filter(m => !excludeNames.includes(m.name));
  if (filtered.length === 0) filtered = base;

  // 기분 + 날씨 점수로 정렬
  filtered = filtered.sort((a, b) => {
    const score = (item: MenuItem) => {
      let s = moods.filter(mood => item.moods.includes(mood)).length;
      item.moods.forEach(mood => { s += weatherBoost[mood] ?? 0; });
      return s;
    };
    return score(b) - score(a);
  });

  // 상위 3개 반환 (첫 번째가 메인 추천)
  return filtered.slice(0, 3);
}

export const MOOD_LABELS: Record<Mood, string> = {
  hearty: '든든하게',
  light: '가볍게',
  spicy: '매콤하게',
  healthy: '건강하게',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  korean: '한식',
  chinese: '중식',
  japanese: '일식',
  western: '양식',
  snack: '분식',
  cafe: '카페',
};
