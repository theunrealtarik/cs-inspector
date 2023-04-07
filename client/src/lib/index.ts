import { io } from "socket.io-client";

export const uri = "http://127.0.0.1:5000";
export const socket = io(uri);

export * from "./events";
