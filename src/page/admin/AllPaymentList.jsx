// 전체 결제 내역 관리(전체 결제 승인 모아보기)
import React from "react";
import styled from "styled-components";
import Layout from "../../component/admin/Layout";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import SubHeader from "../../layout/SubHeader";

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

const AllPaymentList = () => {
    return (
        <Container>
         <SubHeader />
            <div className="Logo">
                <FullLogoBth />
                <span>관리자 메뉴</span>
            </div>

        <div>전체 결제 내역 관리(전체 결제 승인 모아보기)</div>
        <Layout />
        </Container>
    )
};

export default AllPaymentList;