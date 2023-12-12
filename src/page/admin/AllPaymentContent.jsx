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

const MemberBoard = styled.div`
.list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 20px;
    
    h3 {
        font-size: 25px;
        font-weight: bold;
    }

    input {
        display: flex;
        text-align: center;
        border-style: none;
        border-bottom: 1px solid black;
    }
}
p {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    

.buttons {
    display: flex;
    justify-content: right;
    
    button {
    background-color: #DFEDE9;
    border: 1px solid #353535; 
    border-radius: 5px;
    margin: 0 20px 0 5px;

    &:hover {
        background-color: #04BF8A;
    }
}
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

            <MemberBoard>
                <div className="list">
                    <h3>전체 결제 내역 목록</h3>
                </div>
                <div className="Board">
                        <th>
                            <tr>번호</tr>
                            <tr>이름</tr>
                            <tr>결제정보</tr>
                            <tr>결제 현황</tr>
                        </th>
                        <td>
                            <tr>No.1</tr>
                            <tr>홍길동</tr>
                            <tr>결제 상세 정보</tr>
                            <tr>진행중</tr>
                        </td>
                        <td>
                            <tr>No.2</tr>
                            <tr>아무개</tr>
                            <tr>결제 상세 정보</tr>
                            <tr>입금 완료</tr>
                        </td>
                        <td>
                            <tr>No.3</tr>
                            <tr>홍홍홍</tr>
                            <tr>결제 상세 정보</tr>
                            <tr>미입급</tr>
                        </td>
                        <td>
                            <tr>No.4</tr>
                            <tr>동동동</tr>
                            <tr>결제 상세 정보</tr>
                            <tr>입금 완료</tr>
                        </td>
                        <td>
                            <tr>No.5</tr>
                            <tr>길길길</tr>
                            <tr>결제 상세 정보</tr>
                            <tr>미입금</tr>
                        </td>
                </div>
                <div className="buttons">
                    <button>수정</button>
                    <button>삭제</button>
                </div>
                <p>1 | 2 | 3 | 4 </p>
           </MemberBoard>
           <h2>전체 결제 내역 그래프</h2>
        </Container>
    )
};

export default AllPaymentContent;