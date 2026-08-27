"use client";

import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    // Media query state is unknowable during SSR; this one-time sync on
    // mount is the earliest point the real value can be read.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(query.matches);
    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return isMobile;
}
