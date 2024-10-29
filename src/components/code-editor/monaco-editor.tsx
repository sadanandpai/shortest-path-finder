import Editor from "@monaco-editor/react";
import {
  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack,
} from "@codesandbox/sandpack-react";

export function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  return (
    <SandpackStack style={{ height: "100%" }}>
      <FileTabs />
      <Editor
        width="100%"
        height="100%"
        language="javascript"
        theme="vs-light"
        options={{
          minimap: {
            enabled: false,
          },
        }}
        key={sandpack.activeFile}
        defaultValue={code}
        onChange={(value) => updateCode(value || "")}
      />
    </SandpackStack>
  );
}
