import { useState } from 'react';

type LocationState =
  | { status: 'idle' }
  | { status: 'requesting' }
  | { status: 'granted'; lat: number; lng: number }
  | { status: 'denied' }
  | { status: 'error'; message: string };

export function useLocation() {
  const [location, setLocation] = useState<LocationState>({ status: 'idle' });

  function request() {
    if (!navigator.geolocation) {
      setLocation({ status: 'error', message: '위치 정보를 지원하지 않는 브라우저입니다.' });
      return;
    }
    setLocation({ status: 'requesting' });
    navigator.geolocation.getCurrentPosition(
      pos => setLocation({
        status: 'granted',
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }),
      err => {
        if (err.code === err.PERMISSION_DENIED) {
          setLocation({ status: 'denied' });
        } else {
          setLocation({ status: 'error', message: '위치를 가져올 수 없습니다.' });
        }
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  }

  return { location, request };
}
