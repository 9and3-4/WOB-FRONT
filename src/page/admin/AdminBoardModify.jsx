// 관리자 페이지 글수정하기
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

const AdminBoardModify = () => {
    return (
        <Container>
         <SubHeader />
            <div className="Logo">
                <FullLogoBth />
                <span>게시판 글 수정하기</span>
            </div>

        <Layout />
        </Container>
    )
};

export default AdminBoardModify;