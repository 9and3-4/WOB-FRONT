import React from "react";
import styled from "styled-components";
import FullLogoBth from "../../component/FullLogoBtn";
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

const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 10px;
    
    button {
        background-color: #DFEDE9;
        border-radius: 20px;
        margin: 20px;
        padding: 30px;
        font-size: 20px;
        box-shadow: 1px 2px 3px #353535;

        &:hover {
            background-color: #04BF8A;
        }
    }
`;

const AdminMain = () => {

    return (
        <Container>
            <SubHeader />
            <div className="Logo">
                <FullLogoBth />
                <span>관리자 메뉴</span>
            </div>
            <Buttons>
                <button>전체 회원 관리</button>
                <button>전체 결제 내역 관리</button>
                <button>전체 게시글 관리</button>
                <button>광고 관리</button>
                <button>문의 하기/Q&A</button>
            </Buttons>
        </Container>
    )
};

export default AdminMain;