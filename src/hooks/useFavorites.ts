"use client";
import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "aura_favorites";

let cachedRaw: string | null = null;
let cachedIds: string[] = [];
const EMPTY: string[] = [];

const getSnapshot = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedIds;
    cachedRaw = raw;
    cachedIds = raw ? (JSON.parse(raw) as string[]) : EMPTY;
    return cachedIds;
  } catch {
    return EMPTY;
  }
};

const getServerSnapshot = (): string[] => EMPTY;

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};

export const useFavorites = () => {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const sync = useCallback((next: string[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("storage"));
  }, []);

  const add = useCallback(
    (id: string) => {
      if (!ids.includes(id)) sync([...ids, id]);
    },
    [ids, sync],
  );

  const remove = useCallback(
    (id: string) => {
      sync(ids.filter((i) => i !== id));
    },
    [ids, sync],
  );

  const toggle = useCallback(
    (id: string) => {
      if (ids.includes(id)) remove(id);
      else add(id);
    },
    [ids, add, remove],
  );

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, ready: true, add, remove, toggle, isFavorite };
};
