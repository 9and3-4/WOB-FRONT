import { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  TitleAlign,
  TextAlign,
  SelectButton,
  InputBar,
  NextButton,
} from "./InterestCommon";
import LoginPageAxiosApi from "../../api/LoginPageAxiosApi";
import { useNavigate } from "react-router-dom";

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StyledNextButton = styled(NextButton)`
  width: 700px;
  position: fixed;
  bottom: 0;
  margin-bottom: 50px;
`;

const SelectOptionBoard = styled.div`
  width: 650px;
  height: 160px;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  transition: height 0.5s ease; // 트랜지션 추가
  ${({ isOpen }) => isOpen && "height: 600px;"}// isOpen에 따라 높이 변경
`;

const SelectOptionBoardHeader = styled.div`
  width: 650px;
  height: 80px;
  background-color: #dfede9;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;
const OptionBoardHeaderLogo = styled.img`
  width: 80px;
  height: auto;
  margin-left: 10px;
`;
const OptionBoardBody = styled.div`
  transition: height 0.3s ease; // 트랜지션 추가
  box-sizing: border-box;
  overflow: auto;
  ${({ isOpen }) => isOpen && "border: 2px solid #dfede9;"}
  ${({ isOpen }) => isOpen && "height: 440px;"} // isOpen에 따라 높이 변경
`;

const SelectOptionBoardFooter = styled.div`
  width: 650px;
  height: 80px;
  background-color: #04bf8a;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 40px; /* 왼쪽 하단 모서리 둥글게 */
  border-bottom-right-radius: 40px; /* 오른쪽 하단 모서리 둥글게 */
  position: absolute;
  bottom: 0;
`;

const AreasGird = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  padding: 40px;
`;

const SelectArea = ({ options, min, max, title, text }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const minSelection = min; // 최소 선택 할 수 있는 개수
  const maxSelection = max; // 최대 선택 할 수 있는 개수

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      if (selectedItems.length < maxSelection) {
        setSelectedItems([...selectedItems, item]);
      }
    }
  };

  const isNextButtonActive =
    selectedItems.length >= minSelection &&
    selectedItems.length <= maxSelection;

  const handleNext = (selectedItems) => {
    const itemsWithInput = selectedItems;

    if (LoginPageAxiosApi.interestAreas(itemsWithInput)) {
      console.log(itemsWithInput);
      console.log("interestAreas 등록 완료");
      navigate("/");
    }
  };

  return (
    <CenterBox>
      <TitleAlign>{title}</TitleAlign>
      <TextAlign>{text}</TextAlign>
      <SelectOptionBoard isOpen={isOpen}>
        <SelectOptionBoardHeader>
          <OptionBoardHeaderLogo src="/wob-logo-green.png" />
        </SelectOptionBoardHeader>
        <OptionBoardBody isOpen={isOpen}>
          <AreasGird>
            {options.map((activity) => (
              <SelectButton
                key={activity}
                onClick={() => handleSelect(activity)}
                selected={selectedItems.includes(activity)}
              >
                {activity}
              </SelectButton>
            ))}
          </AreasGird>
        </OptionBoardBody>
        <SelectOptionBoardFooter onClick={handleToggle}>
          지역선택하기
        </SelectOptionBoardFooter>
      </SelectOptionBoard>
      <StyledNextButton
        active={isNextButtonActive}
        onClick={isNextButtonActive ? () => handleNext(selectedItems) : null}
      >
        다음
      </StyledNextButton>
    </CenterBox>
  );
};

export default SelectArea;
