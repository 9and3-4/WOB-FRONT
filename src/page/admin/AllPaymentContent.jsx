// 관리자 결제 내역 관리(모아보기)
import React from "react";
import styled from "styled-components";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import SubHeader from "../../layout/SubHeader";
import Layout from "../../component/admin/Layout";


const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  h1 {
        font-size: 25px;
        font-weight: bold;
        margin-left: 30px;
    }

    h2 {
        font-size: 25px;
        font-weight: bold;
        margin: 30px;
        padding-bottom: 300px;
    }

  .Logo {
    display: flex;
    align-items: center;

        span {
            font-size: 30px;
            font-weight: bold;
            margin: 80px;
        }
  }
  .Board {
    border: 1px solid #353535;
    border-radius: 10px;
    margin: 20px 20px;
    padding: 0 20px;
    th {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 30px 40px;
        font-size: 25px;
        color: #353535;
        font-weight: bold;
    }
    td{
        background-color: #DFEDE9;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0px;
        padding: 20px 20px;
        border-radius: 10px;
    }
}
`;

const Payment = styled.div`
    display: grid;
    grid-template-columns: repeat(2,2fr);
    gap: 100px;
    align-items: center;
    margin: 30px 150px;
    padding: 50px;
        td {
            font-size: 23px;
            font-weight: bold;
            padding: 20px 0;
        }
        tr {
            line-height: 40px;
        }
`;



const AllPaymentContent = () => {
 
    return (
        <Container>
            <SubHeader />
            <div className="Logo">
                <FullLogoBth />
                <span>전체 결제 내역 관리</span>
            </div>
            <h1>전체 결제 승인 모아보기</h1>
            <Payment>
                <th>
                    <td>주문 관리</td>
                    <tr>신규 주문</tr>
                    <tr>취소 관리</tr>
                </th>
                <th>
                    <td>답변 관리</td>
                    <tr>답변 대기 문의</tr>
                    <tr>문의</tr>
                </th>
                <th>
                    <td>예약 관리</td>
                    <tr>예약 완료</tr>
                    <tr>예약 취소</tr>
                </th>
                <th>
                    <td>결제 관리</td>
                    <tr>입금 대기</tr>
                    <tr>취소 요청</tr>
                    <tr>취소 처리중</tr>
                </th>
            </Payment>
           {/* 햄버거 토글 사이드바 */}
           <Layout/>
        </Container>
    )
};

export default AllPaymentContent;