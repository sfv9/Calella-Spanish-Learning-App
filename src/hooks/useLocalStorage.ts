import { useEffect, useRef, useState } from "react";

/**
 * Persistent state hook.
 *
 * Hardened against several real-world failure modes that were causing the
 * "points aren't saving" reports:
 *
 * 1. **Synchronous write on every set.** The previous version used a
 *    `useEffect` to write to localStorage after render. That works for
 *    normal flows but loses writes when the page is closed / navigated /
 *    backgrounded before the effect flushes. We now write synchronously
 *    inside a wrapped setter so the data hits localStorage before React
 *    finishes scheduling the render.
 *
 * 2. **`pagehide` / `visibilitychange` flush.** iOS Safari can suspend a
 *    backgrounded tab without firing effects again. We listen for the
 *    page going away and write one last time as insurance.
 *
 * 3. **Quota / private mode safety.** localStorage can throw QuotaExceeded
 *    or be entirely unavailable in private browsing. We swallow these so
 *    a write failure can't crash the app, but we log them so they're
 *    debuggable.
 *
 * 4. **Initial-render write skip.** The old hook also wrote on mount even
 *    if the value hadn't changed, which made it impossible to tell from
 *    Network/Storage panels whether real writes were happening. We skip
 *    the no-op initial write now.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, internalSetValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Keep a ref to the latest value so the pagehide listener can flush it.
  const latestRef = useRef(value);
  latestRef.current = value;

  const writeNow = (v: T) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(v));
    } catch (err) {
      // QuotaExceeded, SecurityError (Safari private mode), etc.
      // eslint-disable-next-line no-console
      console.warn(`[useLocalStorage] write failed for "${key}":`, err);
    }
  };

  // Wrapped setter: writes synchronously, then calls React's setter.
  // Handles BOTH plain values and functional updaters.
  const setValue: typeof internalSetValue = (next) => {
    internalSetValue((prev) => {
      const resolved =
        typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      writeNow(resolved);
      return resolved;
    });
  };

  // Flush on tab hide / page unload as insurance against suspended effects.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const flush = () => writeNow(latestRef.current);
    window.addEventListener("pagehide", flush);
    window.addEventListener("visibilitychange", flush);
    window.addEventListener("beforeunload", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      window.removeEventListener("visibilitychange", flush);
      window.removeEventListener("beforeunload", flush);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue] as const;
}
