import { useNavigate } from "react-router-dom";
import SettingHeader from "../../layout/SettingHeader";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

const Container = styled.div`
  /* padding: 24px; */
  border-radius: 8px;
  width: 768px;
  margin: 0px auto;
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  padding: 30px;

  .title {
    font-size: 20px;
    color: gray;
  }
  p {
    margin-top: 10px;
    font-size: 24px;
  }
  button {
    position: relative;
    background-color: transparent; // 버튼 배경 없애기
    border: none;
    width: 768px;
    height: 100px;
    margin: -30px;
    cursor: pointer;
    .text {
      position: absolute;
      font-size: 26px;
      left: 30px;
      top: 30px;
    }
    .pointer {
      position: absolute;
      right: 50px;
      top: 30px;
      font-size: 30px;
    }
  }
  div {
    position: relative;
    height: 50px;
    margin-top: 20px;
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
    }
    .text2 {
      position: absolute;
      left: 15%;
      font-size: 20px;
    }
    .connected {
      position: absolute;
      right: 10%;
      font-size: 16px;
      color: gray;
    }
  }
`;

const Account = () => {
  const navigate = useNavigate();
  const [google, setGoogle] = useState("");
  const [naver, setNaver] = useState("");
  const [kakao, setKakao] = useState("");
  // 제 3자 로그인 정보를 가져옴
  useEffect(() => {
    const loginSetting = async () => {
      const rsp = "NAVER";
      switch (rsp) {
        case "GOOGLE":
          setGoogle("연결됨");
          // setNaver("");
          // setKakao("");
          break;
        case "NAVER":
          setNaver("연결됨");
          // setKakao("");
          // setGoogle("");
          break;
        case "KAKAO":
          setKakao("연결됨");
          // setNaver("");
          // setGoogle("");

          break;
        default:
          break;
      }
    };
    loginSetting();
  }, []);

  return (
    <>
      <SettingHeader title="계정관리" />
      <Container>
        <SubContainer>
          <span className="title">로그인 정보</span>
          <p>{localStorage.getItem("email")}</p>
        </SubContainer>
        <SubContainer>
          <button onClick={() => navigate("/PasswordChange")}>
            <span className="text">비밀번호 변경</span>
            <span className="pointer">&gt;</span>
          </button>
        </SubContainer>
        <SubContainer>
          <span className="title">연결된 계정</span>
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/googleicon.png?alt=media&token=6605354f-bec1-4db6-b62b-4e4e61104469"
              alt="구글"
            />
            <span className="text2">GOOGLE</span>
            <span className="connected">{google}</span>
          </div>
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/navericon.png?alt=media&token=dc735a00-0cff-4d91-b236-d10ae4cf8cb5"
              alt="네이버"
            />
            <span className="text2">NAVER</span>
            <span className="connected">{naver}</span>
          </div>
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/kakaoicon.png?alt=media&token=2b99b220-30f2-412a-8ad6-f90c76639bce"
              alt="카카오"
            />
            <span className="text2">KAKAO</span>
            <span className="connected">{kakao}</span>
          </div>
        </SubContainer>
        <SubContainer>
          <button onClick={() => navigate("/Withdrawal")}>
            <span className="text">계정 탈퇴</span>
            <span className="pointer">&gt;</span>
          </button>
        </SubContainer>
        <SubContainer>
          <button>
            <span className="text">로그아웃</span>
            <span className="pointer">&gt;</span>
          </button>
        </SubContainer>
      </Container>
    </>
  );
};
export default Account;
