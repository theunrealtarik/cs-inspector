import { Events, clamp, socket } from "lib";
import { useCallback, useEffect, useState } from "react";
import type { IEntity, IRawEntity } from "types";

export function useData() {
  const [data, setData] = useState<IEntity[] | null>(null);

  const handleData = useCallback((payload: string) => {
    const parsed = JSON.parse(payload) as IRawEntity[];

    setData(
      parsed
        .filter((e) => e.addr > 0)
        .map((e) => ({
          id: e.addr,
          armor: clamp(e.armor, 100, 0),
          health: clamp(e.health, 100, 0),
          team: {
            id: e.team_id,
            label:
              e.team_id === 3
                ? "Counter-Terrorist"
                : e.team_id === 2
                ? "Terrorist"
                : "Spectator",
            icon:
              e.team_id === 3 ? "/ct.webp" : e.team_id === 2 ? "/t.webp" : "",
          },
        }))
    );
  }, []);

  useEffect(() => {
    socket.on(Events.DATA, handleData);

    return () => {
      socket.off(Events.DATA, handleData);
    };
  }, [handleData]);

  return data;
}
