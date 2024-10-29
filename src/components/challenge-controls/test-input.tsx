/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSandpack } from "@codesandbox/sandpack-react";
import ContentEditable from "react-contenteditable";
import { useEffect, useState } from "react";

interface Props {
  defaultInput: string;
  testCode: (...args: any) => string;
}

export function TestInput({ defaultInput, testCode }: Props) {
  const { sandpack } = useSandpack();
  const [userInput, setUserInput] = useState<string>(defaultInput);

  useEffect(() => {
    const [num1, num2] = userInput
      .split(",")
      .map((line) => line.trim())
      .map(Number);

    sandpack.updateFile("/add.test.ts", testCode(num1, num2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput]);

  return (
    <>
      <ContentEditable
        className="bg-gray-200 rounded-md p-3 max-h-24 overflow-auto"
        html={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        tagName="div"
      />
    </>
  );
}
