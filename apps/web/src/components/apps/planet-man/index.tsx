import { useState } from "react";
import PlanetManHeader from "./planet-man-header";
import UrlRow from "./url-row";
import RequestEditor from "./request-editor";
import ResponsePanel from "./response-panel";
import { usePlanetManRequest } from "./use-planet-man-request";
import type { HttpMethod } from "./types";

const DEFAULT_URL = "https://jsonplaceholder.typicode.com/posts/1";
const DEFAULT_HEADERS = '{\n  "Accept": "application/json"\n}';

function PlanetMan() {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState(DEFAULT_URL);
  const [headersText, setHeadersText] = useState(DEFAULT_HEADERS);
  const [bodyText, setBodyText] = useState(
    '{\n  "title": "Planetman",\n  "body": "orbit",\n  "userId": 1\n}'
  );

  const { loading, clientError, response, send, clearError } =
    usePlanetManRequest();

  const handleSend = () => {
    clearError();
    void send({ method, url, headersText, bodyText });
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-ctp-base text-ctp-text">
      <PlanetManHeader />
      <div className="flex min-h-0 flex-1 flex-col gap-2 p-2 @lg/appwindow:flex-row">
        <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 @lg/appwindow:max-w-[50%]">
          <UrlRow
            method={method}
            onMethodChange={setMethod}
            url={url}
            onUrlChange={setUrl}
            onSend={handleSend}
            loading={loading}
          />
          {clientError ? (
            <p
              className="rounded border border-ctp-red/40 bg-ctp-red/10 px-2 py-1.5 text-xs text-ctp-red"
              role="alert"
            >
              {clientError}
            </p>
          ) : null}
          <RequestEditor
            method={method}
            headersText={headersText}
            onHeadersChange={setHeadersText}
            bodyText={bodyText}
            onBodyChange={setBodyText}
          />
        </section>
        <section className="flex min-h-0 min-w-0 flex-1 flex-col @lg/appwindow:max-w-[50%]">
          <h2 className="sr-only">Response</h2>
          <ResponsePanel response={response} />
        </section>
      </div>
    </div>
  );
}

export default PlanetMan;
