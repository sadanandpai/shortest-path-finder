"use client";

import "allotment/dist/style.css";
import { Allotment } from "allotment";
import classes from "./challenge.module.scss";
import { ChallengeLeftPanel } from "@/components/challenge-ui/challenge-left-panel";
import { ChallengeRightPanel } from "@/components/challenge-ui/challenge-right-panel";

export default function Challenge() {
  return (
    <div className={classes.challengeWrapper}>
      <Allotment minSize={400}>
        <ChallengeLeftPanel />
        <ChallengeRightPanel />
      </Allotment>
    </div>
  );
}
