import axios, { isAxiosError } from "axios";
import { useCallback, useState } from "react";
import type { HttpMethod, GaiaResponse } from "./types";

function parseHeadersJson(raw: string): Record<string, string> {
  const t = raw.trim();
  if (!t) return {};
  const obj = JSON.parse(t) as Record<string, unknown>;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = typeof v === "string" ? v : JSON.stringify(v);
  }
  return out;
}

function parseRequestBody(raw: string): unknown {
  const t = raw.trim();
  if (!t) return undefined;
  try {
    return JSON.parse(t) as unknown;
  } catch {
    return t;
  }
}

function formatResponseBody(data: unknown): string {
  if (data === undefined || data === null || data === "") return "";
  if (typeof data === "string") return data;
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}

function headersRecordToPlain(
  headers: Record<string, unknown>
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(headers)) {
    if (v === undefined || v === null) continue;
    out[k] = typeof v === "string" ? v : String(v);
  }
  return out;
}

export function useGaiaRequest() {
  const [loading, setLoading] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);
  const [response, setResponse] = useState<GaiaResponse | null>(null);

  const send = useCallback(
    async (input: {
      method: HttpMethod;
      url: string;
      headersText: string;
      bodyText: string;
    }) => {
      const url = input.url.trim();
      if (!url) {
        setClientError("Enter a URL.");
        setResponse(null);
        return;
      }

      let headers: Record<string, string>;
      try {
        headers = parseHeadersJson(input.headersText);
      } catch {
        setClientError(
          "Headers must be valid JSON, e.g. {\"Accept\":\"application/json\"}"
        );
        setResponse(null);
        return;
      }

      setLoading(true);
      setClientError(null);
      const started = performance.now();

      const needsBody = ["POST", "PUT", "PATCH", "DELETE"].includes(
        input.method
      );
      const data = needsBody ? parseRequestBody(input.bodyText) : undefined;

      try {
        const res = await axios.request({
          method: input.method,
          url,
          headers,
          data,
          validateStatus: () => true,
          transformResponse: [(d) => d],
          responseType: "text",
        });

        const durationMs = Math.round(performance.now() - started);
        const bodyText =
          typeof res.data === "string"
            ? res.data
            : formatResponseBody(res.data);

        let prettyBody = bodyText;
        const contentType = String(
          res.headers["content-type"] ?? ""
        ).toLowerCase();
        if (
          contentType.includes("application/json") &&
          bodyText.trim().startsWith("{")
        ) {
          try {
            prettyBody = JSON.stringify(JSON.parse(bodyText), null, 2);
          } catch {
            /* keep raw */
          }
        }

        setResponse({
          status: res.status,
          statusText: res.statusText,
          headers: headersRecordToPlain(
            res.headers as Record<string, unknown>
          ),
          body: prettyBody,
          durationMs,
        });
      } catch (e: unknown) {
        const durationMs = Math.round(performance.now() - started);
        if (isAxiosError(e) && e.response) {
          const res = e.response;
          const bodyText =
            typeof res.data === "string"
              ? res.data
              : formatResponseBody(res.data);
          setResponse({
            status: res.status,
            statusText: res.statusText ?? "",
            headers: headersRecordToPlain(
              res.headers as Record<string, unknown>
            ),
            body: bodyText,
            durationMs,
          });
          setClientError(null);
        } else if (isAxiosError(e)) {
          setResponse(null);
          setClientError(
            e.message || "Request failed (often CORS or network)."
          );
        } else {
          setResponse(null);
          setClientError(e instanceof Error ? e.message : "Unknown error.");
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    clientError,
    response,
    send,
    clearError: () => setClientError(null),
  };
}
