import { useEffect, useState } from "react";
import { DesktopAppsList } from "@/components/windows/desktop/apps-list";

type MatchedParam = { app: string; value: string };

// Build case-insensitive lookup: lowercase enum key -> proper-cased enum key
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
  // If already valid JSON, return as-is (decoded)
  try {
    JSON.parse(trimmed);
    return trimmed;
  } catch {
    // Not valid JSON → make it a JSON string
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
  // Compute initial value synchronously so first render isn't empty
  const [matched, setMatched] = useState<MatchedParam[]>(() =>
    parseParamsFromLocation(filter)
  );

  useEffect(() => {
    // Re-parse on filter change and on browser navigation
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
