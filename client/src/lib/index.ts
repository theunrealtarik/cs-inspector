import { io } from "socket.io-client";

export const uri = "http://127.0.0.1:5000";
export const socket = io(uri);

export function classNames(...classes: string[]) {
  return classes.join(" ");
}

export function clamp(value: number, max: number, min: number) {
  if (value > max) {
    value = max;
  } else if (value < min) {
    value = min;
  }

  return value;
}

export * from "./events";
