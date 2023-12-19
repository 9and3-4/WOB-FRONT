import { useState } from "react";
import styled from "styled-components";
import {
  TitleAlign,
  TextAlign,
  SelectButton,
  InputBar,
  NextButton,
} from "./InterestCommon";
import LoginPageAxiosApi from "../../api/LoginPageAxiosApi";

const AreaGird = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 40px;
`;

const SelectArea = ({ options, min, max, title, text }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [value, setValue] = useState("");
  const minSelection = min; // 최소 선택 할 수 있는 개수
  const maxSelection = max; // 최대 선택 할 수 있는 개수

  const handleSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      if (
        value
          ? selectedItems.length < maxSelection - 1 // 기타: 값이 들어온 경우 버튼을 2개까지만
          : selectedItems.length < maxSelection // 버튼만 선택한 경우 3개까지만
      ) {
        setSelectedItems([...selectedItems, item]);
      }
    }
  };

  const isNextButtonActive =
    selectedItems.length + (value ? 1 : 0) >= minSelection &&
    selectedItems.length + (value ? 1 : 0) <= maxSelection;

  const handleNext = (selectedItems) => {
    const itemsWithInput = value ? [...selectedItems, value] : selectedItems;
    // console.log("itemsWithInput : ", itemsWithInput);

    if (LoginPageAxiosApi.interestAreas(itemsWithInput)) {
      console.log("interestAreas 등록 완료");
    }
  };

  return (
    <>
      <TitleAlign>{title}</TitleAlign>
      <TextAlign>{text}</TextAlign>
      <AreaGird>
        {options.map((activity) => (
          <SelectButton
            key={activity}
            onClick={() => handleSelect(activity)}
            selected={selectedItems.includes(activity)}
          >
            {activity}
          </SelectButton>
        ))}
        <NextButton
          active={isNextButtonActive}
          onClick={isNextButtonActive ? () => handleNext(selectedItems) : null}
        >
          다음
        </NextButton>
      </AreaGird>
    </>
  );
};

export default SelectArea;
