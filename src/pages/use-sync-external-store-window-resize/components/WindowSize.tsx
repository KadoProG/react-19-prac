import { useSyncExternalStore } from 'react';

// キャッシュされたスナップショット（値が変わらない限り同じ参照を返す）
let cachedSnapshot = { width: 0, height: 0 };

function getSnapshot() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // 値が変わった場合のみ新しいオブジェクトを作成
  if (cachedSnapshot.width !== width || cachedSnapshot.height !== height) {
    cachedSnapshot = { width, height };
  }

  return cachedSnapshot;
}

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

export function WindowSize() {
  const size = useSyncExternalStore(subscribe, getSnapshot);

  return (
    <p>
      width: {size.width}, height: {size.height}
    </p>
  );
}
