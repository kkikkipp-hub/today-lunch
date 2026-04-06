import { useState, useEffect } from 'react';
import { getTodayKST, getLunchHistory } from '../utils/storage';

function getKSTHour(): number {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).getUTCHours();
}

function hasTodayRecord(): boolean {
  const today = getTodayKST();
  return getLunchHistory().some(r => r.date === today);
}

export function useLunchReminder() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 11:00~13:59 사이이고 오늘 기록이 없으면 배너 표시
    const hour = getKSTHour();
    const isLunchTime = hour >= 11 && hour < 14;
    const dismissed = sessionStorage.getItem('reminder_dismissed') === 'true';

    if (isLunchTime && !hasTodayRecord() && !dismissed) {
      // 1초 뒤에 표시 (앱 로드 직후 너무 즉각적이지 않도록)
      const t = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    setShow(false);
    sessionStorage.setItem('reminder_dismissed', 'true');
  }

  return { show, dismiss };
}
