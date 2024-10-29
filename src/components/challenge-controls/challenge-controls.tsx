/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { TestInput } from "./test-input";
import { TestCases } from "./test-cases";
import { TestConsole } from "./test-console";
import { TestOutput } from "./test-output";

interface Props {
  defaultInput: string;
  testCode: (...args: any) => string;
}

export function ChallengeControls({ defaultInput, testCode }: Props) {
  const { dispatch, listen } = useSandpack();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [testResult, setTestResult] = useState<any>({});

  useEffect(() => {
    const unsubscribe = listen((data) => {
      if (data.type === "test" && data.event === "test_end") {
        setTestResult({
          status: data.test.status,
          error: data.test.errors?.[0]?.message,
        });
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function run() {
    setSelectedIndex(1);
    dispatch({
      type: "run-tests",
      path: "/add.test.ts",
    });
  }

  return (
    <>
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabList className="flex gap-4 justify-between">
          <Tab className="tab">Input</Tab>
          <Tab className="tab">Output</Tab>
          <Tab className="tab">TestCases</Tab>
          <Tab className="tab">Console</Tab>

          <button className="ml-auto btn">^</button>
        </TabList>

        <TabPanels className="mt-2">
          <TabPanel className="rounded-xl bg-white/5 p-3" unmount={false}>
            <TestInput defaultInput={defaultInput} testCode={testCode} />
          </TabPanel>
          <TabPanel className="rounded-xl bg-white/5 p-3" unmount={false}>
            <TestOutput {...testResult} />
          </TabPanel>
          <TabPanel className="rounded-xl bg-white/5 p-3" unmount={false}>
            <TestCases />
          </TabPanel>
          <TabPanel className="rounded-xl bg-white/5 p-3" unmount={false}>
            <TestConsole />
          </TabPanel>
        </TabPanels>
      </TabGroup>

      <div>
        <button className="btn" onClick={run}>
          Run
        </button>
      </div>
    </>
  );
}
