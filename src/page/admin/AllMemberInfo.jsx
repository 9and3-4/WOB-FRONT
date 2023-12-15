// 관리자 회원 관리
import React from "react";
import styled from "styled-components";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import SubHeader from "../../layout/SubHeader";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const MemberBoard = styled.div`
    .list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: 20px;
        
        p {
            margin-right: 350px;
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

const SearchIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #04bf8a;
  font-size: 23px;
  `;

const AllMemberInfo = () => {
    const navigate = useNavigate();

    const goToSearchPage = () => {
        navigate("searchMain");
      };

    return (
        <Container>
            <SubHeader />
            <div className="Logo">
                <FullLogoBth />
                <span>전체 회원 관리</span>
            </div>
            <MemberBoard>
                <div className="list">
                    <p>전체 회원 목록</p>
                    <input type="text" placeholder="회원 검색" />
                    <SearchIcon icon={faSearch} onClick={goToSearchPage} />
                </div>
                <div className="Board">
                        <th>
                            <tr>번호</tr>
                            <tr>이름</tr>
                            <tr>이메일</tr>
                            <tr>가입일자</tr>
                        </th>
                        <td>
                            <tr>No.1</tr>
                            <tr>홍길동</tr>
                            <tr>ghdrlfehd@gmail.com</tr>
                            <tr>2023.12.06</tr>
                        </td>
                        <td>
                            <tr>No.2</tr>
                            <tr>아무개</tr>
                            <tr>ghdrlfehd@gmail.com</tr>
                            <tr>2023.12.08</tr>
                        </td>
                        <td>
                            <tr>No.3</tr>
                            <tr>홍홍홍</tr>
                            <tr>ghdrlfehd@gmail.com</tr>
                            <tr>2023.12.10</tr>
                        </td>
                        <td>
                            <tr>No.4</tr>
                            <tr>동동동</tr>
                            <tr>ghdrlfehd@gmail.com</tr>
                            <tr>2023.12.11</tr>
                        </td>
                        <td>
                            <tr>No.5</tr>
                            <tr>길길길</tr>
                            <tr>ghdrlfehd@gmail.com</tr>
                            <tr>2023.12.12</tr>
                        </td>
                </div>
                <div className="buttons">
                    <button>수정</button>
                    <button>삭제</button>
                </div>
                <p>1 | 2 | 3 | 4 </p>
           </MemberBoard>

           {/* 햄버거 토글 사이드바 */}
           <Layout />
        </Container>
    )
};

export default AllMemberInfo;