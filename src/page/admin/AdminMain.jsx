// 관리자 메인 페이지
import React from "react";
import styled from "styled-components";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import SubHeader from "../../layout/SubHeader";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/admin/Layout";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .Logo {
    display: flex;
    align-items: center;

    span {
      font-size: 30px;
      font-weight: bold;
      margin: 100px;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;

const Click = styled.div`
  background-color: #dfede9;
  border-radius: 20px;
  margin: 20px;
  padding: 30px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  box-shadow: 1px 2px 3px #353535;
  cursor: pointer;

  &:hover {
    background-color: #04bf8a;
  }
`;

const AdminMain = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <SubHeader />
      <div className="Logo">
        <FullLogoBth />
        <span>관리자 메뉴</span>
      </div>
      <Buttons>
        <Click onClick={() => handleNavigate("/AllMemberInfo")}>
          전체 회원 관리
        </Click>
        <Click onClick={() => handleNavigate("/AllPaymentContent")}>
          전체 결제 내역 관리
        </Click>
        <Click onClick={() => handleNavigate("/AllBoardContent")}>
          전체 카테고리 관리
        </Click>
        <Click onClick={() => handleNavigate("/")}>전체 게시판 관리</Click>
        <Click onClick={() => handleNavigate("/Advertising")}>광고 관리</Click>
        <Click onClick={() => handleNavigate("/AskContent")}>
          문의 하기/Q&A
        </Click>
        <Click onClick={() => handleNavigate("/")}>홈으로 돌아가기</Click>
      </Buttons>
      <Layout />
    </Container>
  );
};

export default AdminMain;
