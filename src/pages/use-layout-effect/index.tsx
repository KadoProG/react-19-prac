import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * useLayoutEffect の使用例
 *
 * useLayoutEffect は useEffect と似ていますが、以下の違いがあります：
 * - useEffect: ブラウザの描画後に非同期で実行される
 * - useLayoutEffect: ブラウザの描画前に同期的に実行される
 *
 * 使用するタイミング：
 * 1. DOM要素のサイズや位置を測定して調整する必要がある場合
 * 2. 視覚的なフラッシュ（ちらつき）を防ぎたい場合
 * 3. レイアウトに影響を与える変更を行う場合
 */

// 例1: useEffect を使った場合（フラッシュが発生する可能性がある）
const TooltipWithEffect = ({ text }: { text: string }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current && tooltipRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      // ボタンの下に配置
      setPosition({
        top: buttonRect.bottom + 10,
        left: buttonRect.left + (buttonRect.width - tooltipRect.width) / 2,
      });
    }
  }, [text]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        ホバーしてください（useEffect版）
      </button>
      <div
        ref={tooltipRef}
        className="absolute z-10 rounded bg-gray-800 px-3 py-2 whitespace-nowrap text-white shadow-lg"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          opacity: position.top === 0 ? 0 : 1,
        }}
      >
        {text}
      </div>
    </div>
  );
};

// 例2: useLayoutEffect を使った場合（フラッシュが発生しない）
const TooltipWithLayoutEffect = ({ text }: { text: string }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (buttonRef.current && tooltipRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      // ボタンの下に配置
      setPosition({
        top: buttonRect.bottom + 10,
        left: buttonRect.left + (buttonRect.width - tooltipRect.width) / 2,
      });
    }
  }, [text]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        ホバーしてください（useLayoutEffect版）
      </button>
      <div
        ref={tooltipRef}
        className="absolute z-10 rounded bg-gray-800 px-3 py-2 whitespace-nowrap text-white shadow-lg"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          opacity: position.top === 0 ? 0 : 1,
        }}
      >
        {text}
      </div>
    </div>
  );
};

// 例3: 要素を中央揃えにする例（useEffect版 - フラッシュが発生）
const CenteredBoxWithEffect = () => {
  const [left, setLeft] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current && containerRef.current) {
      // コンテナの幅とボックスの幅を測定して中央揃え
      const containerWidth = containerRef.current.offsetWidth;
      const boxWidth = boxRef.current.offsetWidth;
      setLeft((containerWidth - boxWidth) / 2);
    }
  }, []);

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-red-600">useEffect版（フラッシュが発生）</p>
      <div
        ref={containerRef}
        className="relative h-32 w-full border-2 border-dashed border-gray-300 bg-gray-50"
      >
        <div
          ref={boxRef}
          className="absolute top-1/2 -translate-y-1/2 rounded bg-red-500 px-6 py-3 text-white"
          style={{ left: `${left}px` }}
        >
          中央揃えのボックス
        </div>
      </div>
      <p className="text-xs text-gray-600">
        ページ読み込み時に一瞬左側に表示されてから中央に移動します
      </p>
    </div>
  );
};

// 例4: 要素を中央揃えにする例（useLayoutEffect版 - フラッシュが発生しない）
const CenteredBoxWithLayoutEffect = () => {
  const [left, setLeft] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (boxRef.current && containerRef.current) {
      // コンテナの幅とボックスの幅を測定して中央揃え
      const containerWidth = containerRef.current.offsetWidth;
      const boxWidth = boxRef.current.offsetWidth;
      setLeft((containerWidth - boxWidth) / 2);
    }
  }, []);

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-green-600">useLayoutEffect版（フラッシュなし）</p>
      <div
        ref={containerRef}
        className="relative h-32 w-full border-2 border-dashed border-gray-300 bg-gray-50"
      >
        <div
          ref={boxRef}
          className="absolute top-1/2 -translate-y-1/2 rounded bg-green-500 px-6 py-3 text-white"
          style={{ left: `${left}px` }}
        >
          中央揃えのボックス
        </div>
      </div>
      <p className="text-xs text-gray-600">
        描画前に位置が計算されるため、最初から中央に表示されます
      </p>
    </div>
  );
};

// 例5: 要素の表示/非表示で位置を調整する例（useEffect版 - フラッシュが発生）
const PositionAdjustmentWithEffect = () => {
  const [show, setShow] = useState(false);
  const [top, setTop] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && triggerRef.current && boxRef.current) {
      // トリガーボタンの位置を測定して、ボックスの位置を調整
      const triggerRect = triggerRef.current.getBoundingClientRect();
      setTop(triggerRect.bottom + 10);
    }
  }, [show]);

  return (
    <div className="space-y-4">
      <button
        ref={triggerRef}
        onClick={() => setShow(!show)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        {show ? '非表示' : '表示'}
      </button>
      {show && (
        <div
          ref={boxRef}
          className="absolute rounded border-2 border-red-500 bg-red-50 p-4"
          style={{ top: `${top}px`, left: '50%', transform: 'translateX(-50%)' }}
        >
          <p className="font-semibold text-red-600">useEffect版（フラッシュが発生）</p>
          <p className="mt-2">表示時に一瞬ずれた位置に表示されてから正しい位置に移動します。</p>
        </div>
      )}
    </div>
  );
};

// 例6: 要素の表示/非表示で位置を調整する例（useLayoutEffect版 - フラッシュが発生しない）
const PositionAdjustmentWithLayoutEffect = () => {
  const [show, setShow] = useState(false);
  const [top, setTop] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (show && triggerRef.current && boxRef.current) {
      // トリガーボタンの位置を測定して、ボックスの位置を調整（描画前に実行）
      const triggerRect = triggerRef.current.getBoundingClientRect();
      setTop(triggerRect.bottom + 10);
    }
  }, [show]);

  return (
    <div className="space-y-4">
      <button
        ref={triggerRef}
        onClick={() => setShow(!show)}
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        {show ? '非表示' : '表示'}
      </button>
      {show && (
        <div
          ref={boxRef}
          className="absolute rounded border-2 border-green-500 bg-green-50 p-4"
          style={{ top: `${top}px`, left: '50%', transform: 'translateX(-50%)' }}
        >
          <p className="font-semibold text-green-600">useLayoutEffect版（フラッシュなし）</p>
          <p className="mt-2">描画前に位置が計算されるため、最初から正しい位置に表示されます。</p>
        </div>
      )}
    </div>
  );
};

// 例7: 要素のサイズに基づいて動的に調整する例（useEffect版 - フラッシュが発生）
const DynamicHeightBoxWithEffect = () => {
  const [height, setHeight] = useState(100);
  const [content, setContent] = useState('短いテキスト');
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && boxRef.current) {
      // コンテンツの高さを測定して、ボックスの高さを調整
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(Math.max(100, contentHeight + 40)); // 最小100px、パディング40px
    }
  }, [content]);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block font-semibold">コンテンツを変更:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded border border-gray-300 p-2"
          rows={3}
        />
      </div>
      <div
        ref={boxRef}
        className="rounded border-2 border-red-500 bg-red-50 p-4 transition-all duration-200"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="text-gray-800">
          {content}
        </div>
      </div>
      <p className="text-sm text-red-600">
        useEffect版: 高さが変わる際に一瞬古い高さが表示されます
      </p>
    </div>
  );
};

// 例8: 要素のサイズに基づいて動的に調整する例（useLayoutEffect版 - フラッシュが発生しない）
const DynamicHeightBoxWithLayoutEffect = () => {
  const [height, setHeight] = useState(100);
  const [content, setContent] = useState('短いテキスト');
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (contentRef.current && boxRef.current) {
      // コンテンツの高さを測定して、ボックスの高さを調整
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(Math.max(100, contentHeight + 40)); // 最小100px、パディング40px
    }
  }, [content]);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block font-semibold">コンテンツを変更:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded border border-gray-300 p-2"
          rows={3}
        />
      </div>
      <div
        ref={boxRef}
        className="rounded border-2 border-green-500 bg-green-50 p-4 transition-all duration-200"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="text-gray-800">
          {content}
        </div>
      </div>
      <p className="text-sm text-green-600">
        useLayoutEffect版: 描画前に高さが計算されるため、スムーズに調整されます
      </p>
    </div>
  );
};

// 例9: スクロール位置の復元（useEffect版 - フラッシュが発生）
const ScrollRestoreWithEffect = () => {
  const [items, setItems] = useState<string[]>(['アイテム1', 'アイテム2', 'アイテム3']);
  const [scrollPosition, setScrollPosition] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // スクロール位置を復元（描画後に実行されるため、一瞬スクロール位置がずれる）
    if (listRef.current) {
      listRef.current.scrollTop = scrollPosition;
    }
  }, [items, scrollPosition]);

  const handleScroll = () => {
    if (listRef.current) {
      setScrollPosition(listRef.current.scrollTop);
    }
  };

  const addItem = () => {
    setItems([...items, `アイテム${items.length + 1}`]);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-red-600">useEffect版（フラッシュが発生）</p>
      <button
        onClick={addItem}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        アイテムを追加
      </button>
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="h-48 overflow-y-auto rounded border-2 border-red-300 p-4"
      >
        {items.map((item, index) => (
          <div key={index} className="border-b border-gray-200 p-2">
            {item}
          </div>
        ))}
      </div>
      <p className="text-xs text-red-600">
        アイテム追加時に一瞬スクロール位置がずれてから復元されます
      </p>
    </div>
  );
};

// 例10: スクロール位置の復元（useLayoutEffect版 - フラッシュが発生しない）
const ScrollRestoreWithLayoutEffect = () => {
  const [items, setItems] = useState<string[]>(['アイテム1', 'アイテム2', 'アイテム3']);
  const [scrollPosition, setScrollPosition] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // スクロール位置を復元（描画前に実行されるため、フラッシュがない）
    if (listRef.current) {
      listRef.current.scrollTop = scrollPosition;
    }
  }, [items, scrollPosition]);

  const handleScroll = () => {
    if (listRef.current) {
      setScrollPosition(listRef.current.scrollTop);
    }
  };

  const addItem = () => {
    setItems([...items, `アイテム${items.length + 1}`]);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-green-600">useLayoutEffect版（フラッシュなし）</p>
      <button
        onClick={addItem}
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        アイテムを追加
      </button>
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="h-48 overflow-y-auto rounded border-2 border-green-300 p-4"
      >
        {items.map((item, index) => (
          <div key={index} className="border-b border-gray-200 p-2">
            {item}
          </div>
        ))}
      </div>
      <p className="text-xs text-green-600">
        描画前にスクロール位置が復元されるため、スムーズに動作します
      </p>
    </div>
  );
};

export const UseLayoutEffect = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 p-6">
      <div>
        <h1 className="mb-4 text-3xl font-bold">useLayoutEffect の使用例</h1>
        <div className="mb-6 border-l-4 border-blue-500 bg-blue-50 p-4">
          <h2 className="mb-2 text-xl font-semibold">useLayoutEffect とは？</h2>
          <p className="mb-2">
            <code className="rounded bg-gray-200 px-2 py-1">useLayoutEffect</code> は{' '}
            <code className="rounded bg-gray-200 px-2 py-1">useEffect</code> と似ていますが、
            ブラウザが画面に描画する<strong>前に</strong>同期的に実行されます。
          </p>
          <h3 className="mt-4 mb-2 font-semibold">使用するタイミング：</h3>
          <ul className="list-inside list-disc space-y-1">
            <li>DOM要素のサイズや位置を測定して調整する必要がある場合</li>
            <li>視覚的なフラッシュ（ちらつき）を防ぎたい場合</li>
            <li>レイアウトに影響を与える変更を行う場合</li>
          </ul>
          <h3 className="mt-4 mb-2 font-semibold">注意点：</h3>
          <ul className="list-inside list-disc space-y-1">
            <li>同期的に実行されるため、重い処理は避けるべき</li>
            <li>
              ほとんどの場合、<code className="rounded bg-gray-200 px-2 py-1">useEffect</code>{' '}
              で十分
            </li>
            <li>レイアウトの測定や調整が必要な場合のみ使用</li>
          </ul>
          <div className="mt-4 rounded bg-yellow-50 p-3">
            <p className="text-sm text-yellow-800">
              <strong>補足：</strong>
              実際には、現代のブラウザは高速なため、違いは数ミリ秒程度で見えにくい場合があります。
              しかし、スクロール位置の復元や大きな要素の位置調整など、特定のケースでは違いが明確に現れます。
              パフォーマンスが重要なアプリケーションや、ユーザー体験を最適化したい場合に特に有効です。
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <section className="rounded-lg border border-gray-300 p-6">
          <h2 className="mb-4 text-2xl font-bold">例1: useEffect vs useLayoutEffect</h2>
          <p className="mb-4 text-gray-700">
            ツールチップの位置を計算する際、
            <code className="rounded bg-gray-200 px-2 py-1">useEffect</code> を使うと
            一瞬フラッシュが発生する可能性がありますが、
            <code className="rounded bg-gray-200 px-2 py-1">useLayoutEffect</code> を使うと
            描画前に位置が計算されるため、フラッシュが発生しません。
          </p>
          <div className="flex justify-center gap-8">
            <TooltipWithEffect text="これはuseEffect版です" />
            <TooltipWithLayoutEffect text="これはuseLayoutEffect版です" />
          </div>
        </section>

        <section className="rounded-lg border border-gray-300 p-6">
          <h2 className="mb-4 text-2xl font-bold">例2: 要素の中央揃え</h2>
          <p className="mb-4 text-gray-700">
            要素を親コンテナの中央に配置する際、
            <code className="rounded bg-gray-200 px-2 py-1">useEffect</code> を使うと
            一瞬ずれた位置に表示されてから中央に移動しますが、
            <code className="rounded bg-gray-200 px-2 py-1">useLayoutEffect</code> を使うと
            描画前に位置が計算されるため、最初から中央に表示されます。
          </p>
          <div className="space-y-6">
            <CenteredBoxWithEffect />
            <CenteredBoxWithLayoutEffect />
          </div>
        </section>

        <section className="rounded-lg border border-gray-300 p-6">
          <h2 className="mb-4 text-2xl font-bold">例3: 要素の表示位置の調整</h2>
          <p className="mb-4 text-gray-700">
            要素を表示する際に、他の要素の位置を測定して配置する場合、
            <code className="rounded bg-gray-200 px-2 py-1">useEffect</code> を使うと
            一瞬ずれた位置に表示されてから正しい位置に移動しますが、
            <code className="rounded bg-gray-200 px-2 py-1">useLayoutEffect</code> を使うと
            描画前に位置が計算されるため、最初から正しい位置に表示されます。
          </p>
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
            <PositionAdjustmentWithEffect />
            <PositionAdjustmentWithLayoutEffect />
          </div>
        </section>

        <section className="rounded-lg border border-gray-300 p-6">
          <h2 className="mb-4 text-2xl font-bold">例4: 動的な高さの調整</h2>
          <p className="mb-4 text-gray-700">
            コンテンツの高さに応じて、ボックスの高さを自動的に調整します。
            <code className="rounded bg-gray-200 px-2 py-1">useEffect</code> を使うと
            高さが変わる際に一瞬古い高さが表示されますが、
            <code className="rounded bg-gray-200 px-2 py-1">useLayoutEffect</code> を使うと
            描画前に高さが計算されるため、スムーズに調整されます。
          </p>
          <div className="space-y-6">
            <DynamicHeightBoxWithEffect />
            <DynamicHeightBoxWithLayoutEffect />
          </div>
        </section>

        <section className="rounded-lg border border-gray-300 p-6">
          <h2 className="mb-4 text-2xl font-bold">例5: スクロール位置の復元</h2>
          <p className="mb-4 text-gray-700">
            リストにアイテムを追加しても、スクロール位置を保持します。
            <code className="rounded bg-gray-200 px-2 py-1">useEffect</code> を使うと
            一瞬スクロール位置がずれてから復元されますが、
            <code className="rounded bg-gray-200 px-2 py-1">useLayoutEffect</code> を使うと
            描画前にスクロール位置が復元されるため、スムーズに動作します。
            <strong className="mt-2 block text-red-600">
              この例では違いが比較的明確に現れます。スクロールしてからアイテムを追加してみてください。
            </strong>
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ScrollRestoreWithEffect />
            <ScrollRestoreWithLayoutEffect />
          </div>
        </section>
      </div>
    </div>
  );
};
