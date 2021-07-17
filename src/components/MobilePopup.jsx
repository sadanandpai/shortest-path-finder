import React from "react";
import styled from "@emotion/styled";
import ReactiveButton from "reactive-button";
import Modal from "react-modal";

import { FaRandom } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { BsPlay } from "react-icons/bs";
import { IoEnterOutline } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { CgTrashEmpty } from "react-icons/cg";

Modal.setAppElement("#root");

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  row-gap: 20px;
  height: 100%;

  div {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
`;

export function MobilePopup({ isOpen, setIsOpen }) {
  return (
    <Modal isOpen={isOpen} contentLabel="Example Modal">
      <InfoContainer>
        <div>
          <IoEnterOutline />
          <span> Entry</span>
        </div>
        <div>
          <IoExitOutline />
          <span>Exit</span>
        </div>
        <div>
          <MdBlock />
          <span>Wall</span>
        </div>
        <div>
          <CgTrashEmpty />
          <span>Clear</span>
        </div>
        <div>
          <BsPlay />
          <span>Search</span>
        </div>
        <div>
          <GrPowerReset />
          <span>Reset</span>
        </div>
        <div>
          <FaRandom />
          <span>Randomize</span>
        </div>
        <ReactiveButton onClick={setIsOpen} color="primary" idleText="Close" />
      </InfoContainer>
    </Modal>
  );
}
