import { useEffect, useRef } from "react";
import { Events, socket } from "lib";

export function useProcess() {
  const processIdRef = useRef<number | null>(null);

  useEffect(() => {
    socket.on(Events.GAME, (pid) => {
      processIdRef.current = Number(pid);
    });
  }, []);

  return {
    pid: processIdRef.current,
    isGameRunning: Number.isInteger(processIdRef.current),
  };
}
