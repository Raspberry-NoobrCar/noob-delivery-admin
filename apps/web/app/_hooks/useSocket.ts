"use client"

import { create } from "zustand";

interface Subscriber<T> {
  path: string;
  type: "onmessage" | "onclose" | "onopen";
  callback: (data: T) => void;
}

interface SocketStore {
  ws: WebSocket | null;
  alive: boolean;
  send: (path: string, _data: string | object) => void;
  subscribe: <T>(
    path: string, 
    config: { type: Subscriber<unknown>["type"], callback: Subscriber<T>["callback"] }
  ) => void;
  init: (host: string) => void;
  messageSubscribers: Map<string, Set<Subscriber<unknown>>>;
  otherSubscribers: Map<Subscriber<unknown>["type"], Set<Subscriber<unknown>>>;
}

const useSocket = create<SocketStore>((set, get) => {

  const dispatchMessage = (type: Subscriber<unknown>["type"], e: any) => {
    if (type === "onmessage") {
      const data = JSON.parse(e.data);
      const path = data.path;
      if (path === undefined) {
        console.error("message identify is not defined", e.data);
      } else {
        get().messageSubscribers.get(path)?.forEach(subscriber => subscriber.callback(data));
      }
    } else {
      get().otherSubscribers.get(type)?.forEach(subscriber => subscriber.callback(e));
    }
  }

  return {
    ws: null,
    alive: false,
    send: (path, _data) => {
      const data = { path, data: _data };
      get().ws.send(JSON.stringify(data));
    },
    subscribe: (path, config) => {
      if (config.type === "onmessage") {
        const messageSubscribers = get().messageSubscribers;
        if (path === undefined) {
          console.error("must declare path for onmessage event");
          return;
        }
        let subs = messageSubscribers.get(path);
        if (!subs) {
          messageSubscribers.set(path, new Set<Subscriber<unknown>>);
          subs = messageSubscribers.get(path);
        }
        subs.add({ path, ...config });
      } else {
        const otherSubscribers = get().messageSubscribers;
        let subs = otherSubscribers.get(config.type);
        if (!subs) {
          otherSubscribers.set(config.type, new Set<Subscriber<unknown>>);
          subs = otherSubscribers.get(config.type);
        }
        subs.add({ path, ...config });
        console.log("add sub", otherSubscribers.size);
      }
    },
    init: (host) => {
      const ws = new WebSocket(host);
      const messageSubscribers = new Map<string, Set<Subscriber<unknown>>>();
      const otherSubscribers = new Map<Subscriber<unknown>["type"], Set<Subscriber<unknown>>>();

      set({ ws, messageSubscribers, otherSubscribers });
      ws.onmessage = (e) => {
        if (!get().alive) set({ alive: true });
        dispatchMessage("onmessage", e);
      };
      ws.onclose = (e) => {
        set({ alive: false })
        dispatchMessage("onclose", e);
      };
      ws.onopen = (e) => {
        set({ alive: true })
        dispatchMessage("onopen", e);
      };
    },
    messageSubscribers: null,
    otherSubscribers: null
  }
})

export default useSocket;