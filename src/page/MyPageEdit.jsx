import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserStore";
import MyPageAxiosApi from "../api/MyPageAxiosApi";
import { storage } from "../api/firebase";
import Common, { formatDate } from "../utils/Common";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import Edit from "../images/Edit.png";
import Setting from "../images/Setting.png";
import { Link } from "react-router-dom";

const Container = styled.div`
  /* padding: 24px; */
  border-radius: 8px;
  width: 768px;
  margin: 0px auto;
`;

const LogoImage = styled.img`
  cursor: pointer;
  width: 100px;
  margin: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const UserNickname = styled.h2`
  margin-left: 20px;
`;

const UserImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 20px;
`;
const FieldEditTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IMGField = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
const EditNick = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  width: 80%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const Label = styled.label`
  display: block;
  margin: 20px 10px;
  font-weight: bold;
  font-size: 1.5em;
`;
const SubmitButton = styled.button`
  padding: 5px;
  background-color: #dfede9;
  width: 3em;
  margin-left: 1em;
  color: #000000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2em;
  &:hover {
    background-color: #04bf8a;
  }
`;
const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;
const EditLogo = styled.img`
  width: 30px;
  height: 30px;
  justify-content: left;
  align-items: end;
`;
const EditLogoCon = styled.div`
  display: flex;
  justify-content: right;
`;
const EditBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
`;
const FooterCon = styled.div`
  /* padding: 0 20px; */
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 10px;
`;
const StyledLink = styled(Link)`
  margin: 0 30px;
`;

const MyPageEdit = () => {
  const { email } = useParams();
  const [user, setUser] = useState("");
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editNickname, setEditNickname] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [nickname, setNickname] = useState("");
  // const context = useContext(UserContext);
  // const { setNickname } = context;

  useEffect(() => {
    const userInfo = async () => {
      const rsp = await MyPageAxiosApi.userGetOne(localStorage.email);
      console.log("rsp data  :", rsp.data);
      if (rsp.status === 200) {
        setUser(rsp.data);
        setUrl(rsp.data.image);
      }
    };
    userInfo();

    // 로컬 스토리지에서 로그인한 사용자 정보를 가져옵니다.
    const loginUserEmail = localStorage.getItem("email");
    // 로그인한 사용자와 글쓴이가 같은지 비교
    if (loginUserEmail === email) {
      setIsCurrentUser(true);
    }
  }, [email]);

  const logoImage =
    "https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/logosmall.png?alt=media&token=5f1756d7-08ab-4930-a834-1c2d82e2c34d";

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  //입력 필드 변경 처리
  const handleChange = (e) => {
    setEditNickname(e.target.value);
  };

  //회원정보 업데이트 Axios호출
  const handleSubmit = async (e) => {
    e.preventDefault();
    const rsp = await MyPageAxiosApi.userUpdate(
      localStorage.email,
      editNickname,
      url
    );
    console.log("회원정보 업데이트 rsp 확인 : ", rsp);
    if (rsp.status === 200) {
      setEditMode(false);
      // setNickname(editNickname); // 회원 정보 업데이트 axios 호출 후 전역 상태관리 호출
      setNickname(editNickname);
      console.log("setUser : ", setUser(editNickname));
      const rsp = await MyPageAxiosApi.userGetOne(localStorage.email);
      if (rsp.status === 200) {
        setUser(rsp.data);
        setUrl(rsp.data.image);
      }
    }
  };

  //handle clike 파일 업로드
  const handleUploadChange = async (e) => {
    try {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
      } else {
        console.log("파일 선택 취소");
      }
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file); //파일 업로드 후 기다리기
      console.log("파일 업로드 성공!!");

      // 업로드 후 이미지 URL 가져오기
      const uploadedUrl = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : ", uploadedUrl);
      setUrl(uploadedUrl); //미리보기 URL업데이트 (상태 업데이트)
    } catch (error) {
      console.error("Upload failed 파일 업로드 에러 :", error);
    }
  };

  return (
    <Container>
      <HeaderBox>
        <LogoImage src={logoImage} alt="logo" onClick={goToHome} />
        <EditLogoCon>
          {!editMode && (
            <EditLogo onClick={() => setEditMode(true)} src={Edit} alt="edit" />
          )}
          <StyledLink to="/">
            <EditLogo src={Setting} alt="Setting" />
          </StyledLink>
        </EditLogoCon>
      </HeaderBox>
      <FieldEditTitle>
        <Label>프로필 사진</Label>
      </FieldEditTitle>
      <UserInfo>
        {/* 사용자 프로필 사진 부분 */}
        <UserImage src={url || "http://via.placeholder.com/160"} alt="User" />
      </UserInfo>
      {!editMode ? (
        <>
          {/* 현재 사용자가 로그인한 사용자인 경우에만 편집 버튼 표시 */}
          {/* {isCurrentUser && (
            <SubmitButton onClick={() => setEditMode(true)}>편집</SubmitButton>
          )} */}
        </>
      ) : (
        <>
          <IMGField>
            <input type="file" name="file" onChange={handleUploadChange} />
            {/* <SendSubmitButton>전송</SendSubmitButton> */}
          </IMGField>
        </>
      )}
      <FieldEditTitle>
        <Label>닉네임</Label>
      </FieldEditTitle>
      <EditNick>
        {!editMode ? (
          <UserNickname>{user.nickname}</UserNickname>
        ) : (
          <Input
            type="text"
            name="Nickname"
            // placeholder={user.nickname}
            value={editNickname}
            onChange={handleChange}
          />
        )}
      </EditNick>
      <FieldEditTitle>
        <Label>희망 지역</Label>
      </FieldEditTitle>
      <FieldEditTitle>
        <Label>관심 레져</Label>
      </FieldEditTitle>
      <FieldEditTitle>
        <Label>MBTI</Label>
      </FieldEditTitle>
      {!editMode ? (
        <>
          {/* 현재 사용자가 로그인한 사용자인 경우에만 편집 버튼 표시 */}
          {/* {isCurrentUser && (
            <SubmitButton onClick={() => setEditMode(true)}>편집</SubmitButton>
          )} */}
        </>
      ) : (
        <EditBtn>
          <SubmitButton onClick={handleSubmit}>수정</SubmitButton>
          <SubmitButton onClick={() => setEditMode(false)}>취소</SubmitButton>
        </EditBtn>
      )}
      <FooterCon>
        <Footer />
      </FooterCon>
    </Container>
  );
};

export default MyPageEdit;
