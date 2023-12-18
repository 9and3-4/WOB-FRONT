import React, { useState } from "react";
import styled from "styled-components";
import { SelectButton } from "../MBTI/MBTIcommon";

const MBTIGird = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 40px;
`;

const SelectMBTI = ({ options, max, mbtiItem }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [value, setValue] = useState("");
  const maxSelection = max; // 최대 선택 할 수 있는 개수
  const handleSelect = (item) => {
    console.log("선택된 mbti : ", item);
    setSelectedItems([item]);
  };

  return (
    <>
      <MBTIGird>
        {options.map((mbti) => (
          <SelectButton
            key={mbti}
            onClick={() => handleSelect(mbti)}
            selected={selectedItems.includes(mbti)}
          >
            {mbti}
          </SelectButton>
        ))}
      </MBTIGird>
    </>
  );
};

export default SelectMBTI;
