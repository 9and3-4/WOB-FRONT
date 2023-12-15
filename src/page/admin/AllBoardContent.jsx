// 관리자 게시판 관리
import React from "react";
import styled from "styled-components";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import SubHeader from "../../layout/SubHeader";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import { storage } from "../../api/firebase";
import Layout from "../../component/admin/Layout";
// import AdminBoardList from "../../component/admin/AdminBoardList";
// import AdminBoardDetail from "../../component/admin/AdminBoardDetail";

const FormContainer = styled.div`
  max-width: 768px;
  min-width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center; // 수직 방향 중앙 정렬
  margin: 40px; // 여백 추가
`;

const StyledLabel = styled.label`
  text-align: center;
`;
const StyledLabel2 = styled.label`
  margin-left: 40px;
  text-align: center;
`;

const Title = styled.div`
  color: #333;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin: 30px 20px;
  display: flex;
`;
const StyledInput = styled.input`
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin-left: 25px;
`;

const StyledInput2 = styled.input`
  border: 1px solid red;
  padding: 15px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #DFEDE9;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #04BF8A;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // 버튼을 중앙에 위치시킴
  margin-top: 20px; // 버튼 상단에 여백 추가
  gap: 10px; // 버튼 사이에 여백 추가
`;

const UserImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 5px;
  margin-top: 20px;
`;

const UploadButton = styled.button`
  background-color: #DFEDE9;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #04BF8A;
  }
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Container = styled.div`
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
const Wrap = styled.div`
   margin: 30px 20px;

    h5 {
        font-size: 20px;
        padding: 20px;
    }
    ul {
        border: 1px solid #353535;
        li {
         display: flex;
         padding: 20px;
        }
        .btn {
            background-color: #DFEDE9;
            border: 1px solid #353535; 
            border-radius: 5px;

        &:hover {
            background-color: #04BF8A;
        }
    }
    }
    b {
        font-size: 20px;
        font-weight: bold;
    }
    input {
        width: 600px;
        height: 60px;
    }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #04bf8a;
  font-size: 23px;
  `;


const AllBoardContent = () => {
    const navigate = useNavigate();

    const goToSearchPage = () => {
        navigate("searchMain");
      };

      const [name, setName] = useState("");
      const [img, setImg] = useState("");
      const [logo, setLogo] = useState("");

      // const [content, setContent] = useState("");
      const [file, setFile] = useState(null);
      const [file2, setFile2] = useState(null);
      // const [categories, setCategories] = useState([]); // 새 상태 추가
    
    
      // 종목명 name에 저장
      const handleNameChange = (e) => {
        setName(e.target.value);
      };

      // 등록하기 버튼 클릭 시,
      const handleSubmit = async () => {
        console.log(name, img, logo);
        try {
          const rsp = await AdminAxiosApi.categorySave(
            name,
            img,
            logo
          );
          if (rsp.data === true) {
            alert("카테고리 등록 성공");
          } else {
            alert("카테고리 등록 실패");
          }
        } catch (error) {
          console.log(error);
        }
      };

      const handleReset = () => {
        setName("");
        setImg("");
        setLogo("");
      };
    
      // img 파일 선택
      const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
      };
      // logo 파일 선택
      const handleFileInputChange2 = (e) => {
        setFile2(e.target.files[0]);
      };

      // img 업로드
      const handleUploadClick = async () => {
        try {
          const storageRef = storage.ref();
          const fileRef = storageRef.child(file.name);
    
          // 파일을 업로드하고 기다립니다.
          await fileRef.put(file);
          console.log("File uploaded successfully!");
    
          // 다운로드 URL을 가져오고 기다립니다.
          const url = await fileRef.getDownloadURL();
          console.log("img 저장경로 확인 : " + url);
    
          // 상태를 업데이트합니다.
          setImg(url);
        } catch (error) {
          // 에러를 처리합니다.
          console.error("Upload failed", error);
        }
      };

      // logo 업로드
      const handleUploadClick2 = async () => {
        try {
          const storageRef = storage.ref();
          const fileRef = storageRef.child(file2.name);
    
          // 파일을 업로드하고 기다립니다.
          await fileRef.put(file2);
          console.log("File uploaded successfully!");
    
          // 다운로드 URL을 가져오고 기다립니다.
          const url2 = await fileRef.getDownloadURL();
          console.log("logo 저장경로 확인 : " + url2);
    
          // 상태를 업데이트합니다.
          setLogo(url2);
        } catch (error) {
          // 에러를 처리합니다.
          console.error("Upload failed", error);
        }
      };


    return (
        <Container>
            <SubHeader />
            <div className="Logo">
                <FullLogoBth />
                <span>전체 게시판 관리</span>
            </div>
            <MemberBoard>
                <div className="list">
                    <p>전체 게시판 관리</p>
                    <input type="text" placeholder="게시글 검색" />
                    <SearchIcon icon={faSearch} onClick={goToSearchPage} />
                </div>
                <table className="Board">
                        <th>
                            <tr>번호</tr>
                            <tr>이름</tr>
                            <tr>내용</tr>
                            <tr>작성일자</tr>
                        </th>
                        <td>
                            <tr>No.1</tr>
                            <tr>홍길동</tr>
                            <tr>내용</tr>
                            <tr>2023.12.06</tr>
                        </td>
                        <td>
                            <tr>No.2</tr>
                            <tr>아무개</tr>
                            <tr>내용</tr>
                            <tr>2023.12.08</tr>
                        </td>
                        <td>
                            <tr>No.3</tr>
                            <tr>홍홍홍</tr>
                            <tr>내용</tr>
                            <tr>2023.12.10</tr>
                        </td>
                        <td>
                            <tr>No.4</tr>
                            <tr>동동동</tr>
                            <tr>내용</tr>
                            <tr>2023.12.11</tr>
                        </td>
                        <td>
                            <tr>No.5</tr>
                            <tr>길길길</tr>
                            <tr>내용</tr>
                            <tr>2023.12.12</tr>
                        </td>
                </table>
                <div className="buttons">
                    <button>등록</button>
                    <button>수정</button>
                    <button>삭제</button>
                </div>
                <p>1 | 2 | 3 | 4 </p>
           </MemberBoard>

    {/* 게시물 등록 */}
        <Wrap>
        <Title>게시물 등록</Title>
          <FormContainer>

          <FieldContainer>
            <StyledLabel htmlFor="title">종목</StyledLabel>
            <StyledInput
              type="text"
              id="title"
              name="title"
              value={name}
              onChange={handleNameChange}
            />
          </FieldContainer>

            <FileUploadContainer>
              <StyledLabel2 htmlFor="title">사진</StyledLabel2>
              <StyledInput2 type="file" onChange={handleFileInputChange} />
              <UploadButton onClick={handleUploadClick}>Upload</UploadButton>
          </FileUploadContainer>
          {img && <UserImage src={img} alt="uploaded" />}

          <FileUploadContainer>
              <StyledLabel2 htmlFor="title">로고</StyledLabel2>
              <StyledInput2 type="file" onChange={handleFileInputChange2} />
              <UploadButton onClick={handleUploadClick2}>Upload</UploadButton>
          </FileUploadContainer>
          {logo && <UserImage src={logo} alt="uploaded" />}

          <ButtonContainer>
            <SubmitButton onClick={handleSubmit}>글쓰기</SubmitButton>
            <SubmitButton onClick={handleReset}>취소</SubmitButton>
          </ButtonContainer>

        </FormContainer>

            <div className="modify">
              <b>게시물 수정</b>
            </div>
            <div className="delete">
              <b>게시물 삭제</b>
            </div>
          </Wrap>
           {/* 햄버거 토글 사이드바 */}
           <Layout/>
        </Container>
    )
};

export default AllBoardContent;