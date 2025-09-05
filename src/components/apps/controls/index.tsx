import AppFoundation, {
  AppFoundationProps,
} from "@/components/ui/app-foundation";
import { useState, lazy, Suspense } from "react";
import { attemptControlLogin } from "@/api/Auth";

const SettingsComponent = lazy(() =>
  import("@/components/apps/controls/article-controls").then((module) => {
    return { default: module.default };
  })
);

function Controls() {
  const [writtenPassword, setWrittenPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function onChangeText(event: React.ChangeEvent<HTMLInputElement>) {
    setWrittenPassword(event.target.value);
    event.preventDefault();
  }

  function onSubmitPassword(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    authPassword(writtenPassword);
  }

  function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    authPassword(writtenPassword);
  }

  async function authPassword(password: string) {
    const result = await attemptControlLogin(password);
    if (result) {
      setPassword(writtenPassword);
    }
  }

  return (
    <div style={{ width: "100%", height: "100%", border: "none" }}>
      <div
        style={{
          widows: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {password === "sonic2000" ? (
          <Suspense fallback={<h1>DAMN ITS LOADING RN BOYS ITS LADING</h1>}>
            <SettingsComponent password={password} />
          </Suspense>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <form onSubmit={onFormSubmit} className="flex flex-col gap-2.5">
              <input
                className="h-20 rounded-xl w-96 text-3xl py-2 px-1 bg-gray-950 border-2 border-solid border-gray-900 text-white"
                type="password"
                onChange={onChangeText}
                placeholder="Password...."
              />
              <button
                className="create-article-button"
                type="submit"
                onClick={onSubmitPassword}
              >
                Log In
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Controls;
