import { SandpackConsole } from "@codesandbox/sandpack-react";
import { useRef } from "react";

export function TestConsole() {
  const consoleRef = useRef(null);

  return (
    <>
      <SandpackConsole
        style={{ height: "300px" }}
        ref={consoleRef}
        showSyntaxError={false}
      />
    </>
  );
}
