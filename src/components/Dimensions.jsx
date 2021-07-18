import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import Dropdown from "react-dropdown";
import { useWindowSize } from "@react-hook/window-size";
import Slider, { SliderTooltip, Handle } from "rc-slider";
import { toast } from "react-toastify";

import "rc-slider/assets/index.css";
import "react-dropdown/style.css";

import { AiOutlineInfoCircle } from "react-icons/ai";
import { MobilePopup } from "./MobilePopup";
import { cellWidth, cellGap } from "../common/config";

import {
  rowsOptions,
  colsOptions,
  minRows,
  minColumns,
  maxRows,
  maxColumns,
} from "../common/config";

const Container = styled.div`
  width: 90%;
  margin: auto;
`;

const SliderContainer = styled.div`
  column-gap: 5%;
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  justify-content: center;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  flex-grow: 1;
  column-gap: 10px;

  & > div {
    flex: 1;
  }
`;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

// The height used by non grid display
const topHeight = 145;

export function Dimensions({ rows, cols, resetGrid, setRows, setCols }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [width, height] = useWindowSize();

  // keep the number rows and columns withing the viewing window (works on resize as well)
  useEffect(() => {
    const totalCellWidth = cellWidth + cellGap;

    // if columns exceed the actual width
    if (cols * totalCellWidth > width - cellWidth) {
      setCols(Math.floor((width - cellWidth) / totalCellWidth));
      toast.warning("Max screen dimension set", {
        toastId: 1,   // just an id to prevent duplicates
      });
    }

    // if rows exceed the actual width
    if (rows * totalCellWidth > height - topHeight) {
      setRows(Math.floor((height - topHeight) / (cellWidth + cellGap)));
      toast.warning("Max screen dimension set", {
        toastId: 1,   // just an id to prevent duplicates
      });
    }
    resetGrid();
  }, [rows, cols, width, height]);

  return (
    <Container>
      <SliderContainer>
        <Label>
          Rows
          <Slider min={minRows} max={maxRows} value={rows} onChange={setRows} handle={handle} />
        </Label>

        <Label>
          Columns
          <Slider
            min={minColumns}
            max={maxColumns}
            value={cols}
            onChange={setCols}
            handle={handle}
          />
        </Label>
      </SliderContainer>

      <DropdownContainer>
        <Label>
          Rows
          <Dropdown
            options={rowsOptions}
            value={String(rows)}
            onChange={(e) => setRows(+e.value)}
            name="rows"
          />
        </Label>

        <Label>
          Columns
          <Dropdown
            options={colsOptions}
            value={String(cols)}
            onChange={(e) => setCols(+e.value)}
          />
        </Label>

        <AiOutlineInfoCircle
          onClick={() => setIsOpen(true)}
          className={css`
            color: blue;
            min-width: 1em;
          `}
        />

        <MobilePopup isOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </DropdownContainer>
    </Container>
  );
}
