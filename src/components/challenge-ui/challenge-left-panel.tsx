import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ProblemStatement } from "../challenge-details/problem-statement";
import { problem } from "@/data/1";
import { Solution } from "../challenge-details/solution";

export function ChallengeLeftPanel() {
  return (
    <TabGroup defaultIndex={0} className="h-full">
      <TabList className="tab-list">
        <Tab className="tab">Question</Tab>
        <Tab className="tab">Result</Tab>
        <Tab className="tab">Submissions</Tab>
        <Tab className="tab">Solution</Tab>
      </TabList>

      <TabPanels className="tab-panels">
        <TabPanel className="tab-panel">
          <ProblemStatement {...problem} />
        </TabPanel>
        <TabPanel className="tab-panel">All tests result</TabPanel>
        <TabPanel className="tab-panel">Successful submissions</TabPanel>
        <TabPanel className="tab-panel">
          <Solution code={problem.solution} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
