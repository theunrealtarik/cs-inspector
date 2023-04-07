import { Events, socket } from "lib";
import { useEffect, useReducer, useState } from "react";

// constants
const MAX_TRIES = 5;
const INITIAL = {
  isLoading: true,
  isInstantError: false,
  isError: false,
  isConnected: false,
  tries: 0,
} satisfies IUseConnectState;

export function useConnect() {
  const [state, dispatch] = useReducer(
    (prev: IUseConnectState, curr: Partial<IUseConnectState>) => ({
      ...prev,
      ...curr,
    }),
    INITIAL
  );

  const connect = () => {
    socket.on(Events.CONNECT, () =>
      dispatch({ isConnected: true, isLoading: false })
    );
  };

  useEffect(() => {
    connect();
    socket.on(Events.CONNECTION_ERROR, () => {
      if (state.tries < MAX_TRIES) {
        dispatch({
          isConnected: false,
          isInstantError: true,
          isError: state.tries === MAX_TRIES - 1,
          isLoading: true,
          tries: state.tries + 1,
        });
      }

      setTimeout(() => connect(), 1000);
    });

    return () => {
      dispatch({ isConnected: false });
      socket.off("connect");
    };
  }, [state.tries]);

  return state;
}

interface IUseConnectState {
  isLoading: boolean;
  isInstantError: boolean;
  isError: boolean;
  isConnected: boolean;
  tries: number;
}
