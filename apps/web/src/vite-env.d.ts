/// <reference types="vite/client" />
declare module "*.ttf";

declare module "atrament/fill" {
  /** Returns a Worker running atrament's flood-fill implementation */
  function createFillWorker(options?: WorkerOptions): Worker;
  export default createFillWorker;
}