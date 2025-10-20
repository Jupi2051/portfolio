import { useEffect, useState } from "react";
import { DesktopAppsList } from "@/components/windows/desktop/apps-list";

type MatchedParam = { app: string; value: string };

const enumKeyMap: Record<string, string> = Object.keys(DesktopAppsList)
  .filter((k) => isNaN(Number(k)))
  .reduce<Record<string, string>>((acc, key) => {
    acc[key.toLowerCase()] = key;
    return acc;
  }, {});

function safelyDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function ensureJsonString(value: string): string {
  const trimmed = value.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    return JSON.stringify(value);
  }
}

function parseParamsFromLocation(filter?: DesktopAppsList[]): MatchedParam[] {
  if (typeof window === "undefined") return [];
  const search = window.location.search || "";
  const params = new URLSearchParams(search);

  const allowedKeys: Set<string> | null =
    Array.isArray(filter) && filter.length > 0
      ? new Set(
          filter
            .map((value) => DesktopAppsList[value])
            .filter((name): name is string => typeof name === "string")
        )
      : null;

  const result: MatchedParam[] = [];
  params.forEach((rawValue, key) => {
    const properKey = enumKeyMap[key.toLowerCase()];
    if (!properKey) return;
    if (allowedKeys && !allowedKeys.has(properKey)) return;
    const decoded = safelyDecode(rawValue);
    result.push({ app: properKey, value: ensureJsonString(decoded) });
  });
  return result;
}

const useApplicationURLParams = (
  filter?: DesktopAppsList[]
): MatchedParam[] => {
  const [matched, setMatched] = useState<MatchedParam[]>(() =>
    parseParamsFromLocation(filter)
  );

  useEffect(() => {
    const update = () => setMatched(parseParamsFromLocation(filter));

    update();

    if (typeof window !== "undefined") {
      window.addEventListener("popstate", update);
      // Custom event some routers emit on push/replace; harmless if unused
      window.addEventListener("pushstate", update as EventListener);
      window.addEventListener("replacestate", update as EventListener);
      return () => {
        window.removeEventListener("popstate", update);
        window.removeEventListener("pushstate", update as EventListener);
        window.removeEventListener("replacestate", update as EventListener);
      };
    }
  }, [filter]);

  return matched;
};

export default useApplicationURLParams;
