import { useEffect, useState } from "react";
import { useConnect } from "./useConnect";
import { Events, socket } from "lib";

export function useProcess() {
  const connection = useConnect();
  const [processId, setProcessId] = useState<number | null>(null);

  useEffect(() => {
    socket.on(Events.GAME, (pid) => {
      // setProcessId(processId);
      setProcessId(pid);
    });
  }, []);

  return {
    pid: processId,
    isGameRunning: Number.isInteger(processId),
  };
}
