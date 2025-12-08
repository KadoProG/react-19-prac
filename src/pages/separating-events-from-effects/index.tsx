import { useEffect, useEffectEvent, useState } from 'react';
import { toast } from 'react-toastify';

/**
 * https://react.dev/learn/separating-events-from-effects
 */
const ChatRoom = ({ roomId, theme }: { roomId: string; theme: string }) => {
  const handleConnect = useEffectEvent((selectedRoomId: string) => {
    toast.info(`Connecting to ${selectedRoomId}..., ${theme}`);
  });

  useEffect(() => {
    handleConnect(roomId);
  }, [roomId]);

  return <div>ChatRoom</div>;
};

export const SeparatingEventsFromEffects = () => {
  const [roomId, setRoomId] = useState('general');
  const [theme, setTheme] = useState('light');

  return (
    <div className="flex flex-col gap-4 p-4">
      <select
        name="roomId"
        id="roomId"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="rounded-md border border-gray-300 p-2"
      >
        <option value="general">General</option>
        <option value="travel">Travel</option>
        <option value="music">Music</option>
      </select>
      <select
        name="theme"
        id="theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="rounded-md border border-gray-300 p-2"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <ChatRoom roomId={roomId} theme={theme} />
      <div>
        <h2 className="text-2xl font-bold">何が言いたいか</h2>
        <p>
          useEffectEventを使って、イベントを分離することで、コンポーネントの再レンダリングを防ぎ、パフォーマンスを向上させることができます。
        </p>
      </div>
    </div>
  );
};
