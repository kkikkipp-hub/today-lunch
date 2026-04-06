import { type Category, type Mood, type MenuItem } from '../data/menus';

export function mapCategory(categoryName: string): Category | null {
  const name = categoryName.toLowerCase();

  if (/한식|국밥|설렁탕|해장국/.test(name)) return 'korean';
  if (/중식|중국/.test(name)) return 'chinese';
  if (/일식|초밥|라멘|돈카츠|우동|소바/.test(name)) return 'japanese';
  if (/양식|이탈리안|피자|파스타|햄버거|브런치|스테이크/.test(name)) return 'western';
  if (/분식|떡볶이|김밥|라면|순대/.test(name)) return 'snack';
  if (/카페|커피|디저트|베이커리/.test(name)) return 'cafe';

  return null;
}

export function estimatePrice(category: Category): { min: number; max: number } {
  switch (category) {
    case 'korean':   return { min: 8000,  max: 12000 };
    case 'chinese':  return { min: 8000,  max: 14000 };
    case 'japanese': return { min: 9000,  max: 15000 };
    case 'western':  return { min: 9000,  max: 16000 };
    case 'snack':    return { min: 5000,  max: 9000  };
    case 'cafe':     return { min: 6000,  max: 12000 };
  }
}

export function defaultMoods(category: Category): Mood[] {
  switch (category) {
    case 'korean':   return ['hearty', 'spicy'];
    case 'chinese':  return ['hearty', 'spicy'];
    case 'japanese': return ['light', 'healthy'];
    case 'western':  return ['light', 'hearty'];
    case 'snack':    return ['spicy', 'light'];
    case 'cafe':     return ['light', 'healthy'];
  }
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}

interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  distance: string;
}

interface KakaoResponse {
  documents: KakaoPlace[];
}

export async function searchNearbyRestaurants(
  lat: number,
  lng: number,
  categories: Category[],
  budget: number,
  moods: Mood[]
): Promise<MenuItem[]> {
  const apiKey = import.meta.env.VITE_KAKAO_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_KAKAO_API_KEY가 설정되지 않았습니다.');
  }

  const params = new URLSearchParams({
    query: '음식점',
    x: String(lng),
    y: String(lat),
    radius: '500',
    category_group_code: 'FD6',
    size: '15',
    sort: 'distance',
  });

  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?${params}`,
    { headers: { Authorization: `KakaoAK ${apiKey}` } }
  );

  if (!res.ok) {
    throw new Error(`카카오 API 오류: ${res.status}`);
  }

  const data: KakaoResponse = await res.json();

  // KakaoPlace → MenuItem 변환 및 카테고리/예산 필터
  let items: MenuItem[] = data.documents.flatMap((place): MenuItem[] => {
    const category = mapCategory(place.category_name);
    if (!category) return [];

    // 카테고리 필터 (선택된 카테고리가 있으면 해당 카테고리만)
    if (categories.length > 0 && !categories.includes(category)) return [];

    const price = estimatePrice(category);

    // 예산 필터
    if (price.min > budget) return [];

    const dist = parseInt(place.distance, 10) || 0;
    const distStr = formatDistance(dist);
    const address = place.road_address_name || place.address_name;

    return [{
      id: `kakao-${place.id}`,
      name: place.place_name,
      category,
      moods: defaultMoods(category),
      minPrice: price.min,
      maxPrice: price.max,
      tags: [distStr],
      reason: `${distStr} 거리 — ${address}`,
      distance: dist,
      address,
      phone: place.phone || undefined,
      isRealPlace: true,
    }];
  });

  // 기분 점수로 정렬
  if (moods.length > 0) {
    items = items.sort((a, b) => {
      const aScore = moods.filter(mood => a.moods.includes(mood)).length;
      const bScore = moods.filter(mood => b.moods.includes(mood)).length;
      return bScore - aScore;
    });
  }

  // 최대 3개 반환
  return items.slice(0, 3);
}
