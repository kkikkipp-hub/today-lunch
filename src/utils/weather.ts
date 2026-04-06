import { type Mood } from '../data/menus';

export interface WeatherResult {
  temp: number;       // 섭씨
  isRainy: boolean;
  isCold: boolean;    // < 8°C
  isHot: boolean;     // > 28°C
  label: string;      // UI 표시용
}

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
}

// WMO weather code → 비 여부
function isRainyCode(code: number): boolean {
  // 51-67: 이슬비/비, 80-82: 소나기, 95-99: 뇌우
  return (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95;
}

export async function fetchWeather(lat: number, lng: number): Promise<WeatherResult> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code&timezone=Asia%2FSeoul`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('날씨 API 오류');
  const data: OpenMeteoResponse = await res.json();

  const temp = data.current.temperature_2m;
  const code = data.current.weather_code;
  const isRainy = isRainyCode(code);
  const isCold = temp < 8;
  const isHot = temp > 28;

  let label = '';
  if (isRainy) label = `비 ${temp}°C`;
  else if (isCold) label = `추운 날씨 ${temp}°C`;
  else if (isHot) label = `더운 날씨 ${temp}°C`;
  else label = `${temp}°C`;

  return { temp, isRainy, isCold, isHot, label };
}

// 날씨 → 기분 가중치 (추천 점수에 더해줄 값)
export function weatherMoodBoost(weather: WeatherResult): Partial<Record<Mood, number>> {
  const boost: Partial<Record<Mood, number>> = {};
  if (weather.isCold || weather.isRainy) {
    boost.hearty = 2;
    boost.spicy = 1;
    boost.light = -1;
  }
  if (weather.isHot) {
    boost.light = 2;
    boost.healthy = 1;
    boost.hearty = -1;
  }
  return boost;
}
