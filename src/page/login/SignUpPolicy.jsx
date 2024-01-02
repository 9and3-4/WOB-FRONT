import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import UserAgreements from "../../component/Join/UserAgreements";
import UserPolicy from "../../component/Join/UserPolicy";

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;

const SelectOptionBoard = styled.div`
  width: 28em;
  height: 160px;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  transition: height 0.5s ease; // 트랜지션 추가
  height: 685px;
  @media only screen and (max-width: 768px) {
    width: 25em;
  }
`;

const SelectOptionBoardHeader = styled.div`
  width: 28em;
  height: 40px;
  background-color: #dfede9;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  @media only screen and (max-width: 768px) {
    width: 25em;
  }
`;
const OptionBoardHeaderLogo = styled.img`
  width: 50px;
  height: auto;
  margin-left: 10px;
`;
const OptionBoardBody = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  border: 2px solid #dfede9;
  transition: height 0.5s ease; // 트랜지션 추가
  height: 615px;
`;
const UserPolicyBody = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  border: 1px solid #eee;
  transition: height 0.5s ease; // 트랜지션 추가
  height: 46%; /* 나누어진 높이 */
`;

const UserAgreementsBody = styled.div`
  box-sizing: border-box;
  overflow-y: auto;
  border: 1px solid #eee;
  transition: height 0.5s ease; // 트랜지션 추가
  height: 47%; /* 나누어진 높이 */
`;

const SelectOptionBoardFooter = styled.div`
  width: 28em;
  height: 40px;
  background-color: #04bf8a;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 20px; /* 왼쪽 하단 모서리 둥글게 */
  border-bottom-right-radius: 20px; /* 오른쪽 하단 모서리 둥글게 */
  position: absolute;
  bottom: 0;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    width: 25em;
  }
`;

const AreasGird = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px 30px;
  padding: 40px;
`;

const CheckboxInput = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 1rem;
  width: 1.5rem;
  height: 1.5rem;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #04bf8a;
  }
`;

const StyledLabel = styled.label`
  background-color: #fff;
  display: flex;
  align-items: center;
  user-select: none;
  padding: 0.3rem;
  border-bottom: 2px solid #eee;
`;

const StyledP = styled.p`
  margin-left: 0.25rem;
`;

const PolicyModal = ({ options, min, max, title, text }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handlePass = () => {
    navigate("/");
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsOpen(!isOpen);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, []);

  const Checkbox = ({ text, checked, onChange }) => {
    return (
      <StyledLabel>
        <CheckboxInput type="checkbox" checked={checked} onChange={onChange} />
        <StyledP>{text}</StyledP>
      </StyledLabel>
    );
  };

  return (
    <CenterBox>
      <SelectOptionBoard>
        <SelectOptionBoardHeader>
          <OptionBoardHeaderLogo src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/wob-logo-green.png?alt=media&token=b89ea23a-e1f1-4863-a76f-54811d63edcb" />
        </SelectOptionBoardHeader>
        <OptionBoardBody>
          <Checkbox
            text={"전체 동의하기"}
            // checked={allChecked}
            // onChange={handleAllCheckedChange}
          />
          <UserPolicyBody>
            <Checkbox
              text={"개인정보처리방침 동의"}
              // checked={allChecked}
              // onChange={handleAllCheckedChange}
            />
            <UserPolicy />
          </UserPolicyBody>
          <UserAgreementsBody>
            <Checkbox
              text={"이용 약관 동의"}
              // checked={allChecked}
              // onChange={handleAllCheckedChange}
            />
            <UserAgreements />
          </UserAgreementsBody>
        </OptionBoardBody>
        <SelectOptionBoardFooter onClick={handleToggle}>
          동의하고 계속하기
        </SelectOptionBoardFooter>
      </SelectOptionBoard>
    </CenterBox>
  );
};

export default PolicyModal;
