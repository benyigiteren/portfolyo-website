"use client";

import { useEffect, useState } from "react";
import { Eye } from "@/components/icons";

export function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const sessionKey = "yigiteren-view-counted";
    const alreadyCounted = window.sessionStorage.getItem(sessionKey) === "1";

    fetch(`/api/views${alreadyCounted ? "" : "?hit=1"}`, { cache: "no-store", signal: controller.signal })
      .then((response) => response.json())
      .then((data: { count?: number }) => {
        if (typeof data.count === "number") setCount(data.count);
        if (!alreadyCounted) window.sessionStorage.setItem(sessionKey, "1");
      })
      .catch(() => setCount(0));

    return () => controller.abort();
  }, []);

  return (
    <span className="inline-flex min-h-5 items-center gap-2 text-[10px] font-semibold uppercase tracking-[.17em] text-faint" aria-label={`${count ?? 0} görüntülenme`}>
      <Eye size={14} weight="regular" aria-hidden />
      {new Intl.NumberFormat("tr-TR").format(count ?? 0)} görüntülenme
    </span>
  );
}