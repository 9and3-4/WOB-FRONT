import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MenuContainer = styled.div`
  background-color: #fff;
  color: #ed342e;
  display: flex;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 12%;
    right: -1%;
    width: 200px;
    height: 76%;
    border-radius: 0.35rem;
    opacity: 0.9;
    border: 1px solid #ed342e;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    z-index: 1000;
    transition: all 0.5s ease-in-out;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  }

  @media (min-width: 300px) {
    align-items: center;
    padding: 0 15px;
    margin: 0;
    justify-content: space-between;
  }
`;

const MenuItem = styled.div`
  margin: 10px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border: none; /* 네모 대신 밑줄로 변경 */
  border-bottom: 2px solid #ed342e; /* 밑줄 스타일 */
  padding: 4px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 4px;
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Icon = styled.img`
  width: 30px;
  height: auto;
  @media (max-width: 768px) {
    width: 60px;
  }
`;

const menuOptions = {
  Admin: {
    menuItem1: "전체 회원 목록",
    menuItem2: "방문자 현황",
    menuItem3: "지역별 종목 비율",
    menuItem4: "키워드 높은 순",
  },
  Payment: {
    menuItem1: "전체 결제 승인 모아보기",
    menuItem2: "전체 결제 내역 목록",
    menuItem3: "전체 결제 내역 그래프",
  },
  Board: {
    menuItem1: "전체 게시물 목록",
    menuItem2: "전체 게시물 수정/삭제",
  },
  Advertising: {
    menuItem1: "광고 관리하기",
  },
  default: {
    menuItem1: "관리자 전용 전체 채팅방 목록",
    menuItem2: "1:1 관리자 채팅 문의",
  },
};

const Menu = (props) => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  // 사용자의 타입에 따른 메뉴 정보 가져오기
  const { menuItem1, menuItem2, menuItem3, menuItem4 } =
    menuOptions[props.Admin] || menuOptions["default"];

  // 메뉴 항목 클릭 시 해당 URL로 이동하는 함수
  const handleMenuClick = (menuItem) => {
    switch (menuItem) {
      case "전체 회원 관리":
        // 로그인 항목 클릭 시 특별한 동작 수행 (예: 모달 열기, 함수 호출 등)
        navigate("/AllMemberInfo");
        break;
      case "전체 결제 내역 관리":
        navigate("/AllPaymentContent");
        break;
      case "전체 게시판 관리":
        navigate("/AllBoardContent");
        break;
      case "광고 관리":
        navigate("/Advertising");
        break;
      case "1:1 문의하기":
        navigate("/AskContent");
        break;
      default:
        navigate("/AdminMain");
    }
  };

  return (
    <MenuContainer open={props.open}>
      <SearchBox>
        <SearchInput type="text" />
      </SearchBox>
      {/* 동적으로 메뉴 항목 생성 */}
      {[menuItem1, menuItem2, menuItem3, menuItem4 && menuItem4].map(
        (menuItem, index) => (
          <MenuItem key={index} onClick={() => handleMenuClick(menuItem)}>
            {menuItem}
          </MenuItem>
        )
      )}
      {/* {icon && (
        <MenuItem onClick={handleMypage}>
          <Icon src={icon} />
        </MenuItem>
      )} */}
    </MenuContainer>
  );
};
export default Menu;