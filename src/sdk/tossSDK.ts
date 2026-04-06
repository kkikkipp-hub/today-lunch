// TossApp SDK mock — 토스 앱 외부(로컬 개발)에서도 동작하도록 처리
const isInToss =
  typeof window !== 'undefined' &&
  window.navigator.userAgent.includes('TossApp');

export const tossSDK = {
  ready: async () => {
    if (isInToss) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mod = await import('@apps-in-toss/web-framework') as any;
        await (mod.ready ?? mod.default?.ready)?.();
      } catch {
        // 토스 외부 환경 — 무시
      }
    }
  },
  close: () => {
    if (isInToss) {
      import('@apps-in-toss/web-framework').then((mod: any) => {
        (mod.navigation ?? mod.default?.navigation)?.close();
      }).catch(() => {});
    } else {
      window.history.back();
    }
  },
};
