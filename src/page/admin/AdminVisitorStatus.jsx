// 전체 회원 관리(방문자 현황)
import React from "react";
import styled from "styled-components";
import Layout from "../../component/admin/Layout";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import SubHeader from "../../layout/SubHeader";
import VisitStateChat from "../../component/admin/VisitStateChat";


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

const AdminVisitorStatus = () => {
    return (
        <Container>
         <SubHeader />
            <div className="Logo">
                <FullLogoBth />
                <span>방문자 현황</span>
            </div>
            <VisitStateChat/>
        <Layout />
        </Container>
    )
};

export default AdminVisitorStatus;