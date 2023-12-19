import styled from "styled-components";
import { InputBar, AuthInputBar, GreenButton } from "./LoginCommon";
import { Link } from "react-router-dom";
import { KH_DOMAIN } from "../../utils/Common";
import { useState } from "react";
import LoginPageAxiosApi from "../../api/LoginPageAxiosApi";
import Modal from "../../utils/Modal";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginBox = styled.div`
  background-color: #dfede9;
  width: 320px;
  padding: 20px;
  border-radius: 30px;
  text-align: center;
`;

const RowAlignBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const AlignBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
`;
const OauthLogo = styled.img`
  width: 40px;
  margin: 10px 20px;
  background-color: white;
  padding: 5px;
  border-radius: 50%;
`;

const BlackButton = styled(GreenButton)`
  background-color: #353535;
`;

const SmallGreenButton = styled.button`
  background-color: #04bf8a;
  color: #fff;
  margin: 10px;
  border: none;
  border-radius: 30px;
  padding: 10px;
  width: 70px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // 모달 오픈
  const [modalText, setModelText] = useState("정말 로그아웃 하시겠습니까?"); // 모달에 넣을 내용

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };

  const handleCheckNickName = async () => {
    try {
      const result = await LoginPageAxiosApi.userNickNameCheck({
        nickname: nickName,
      });
      //   console.log("결과는? ", result.data);
      const message = result.data
        ? "사용 가능한 닉네임입니다."
        : "사용 불가능한 닉네임입니다.";
      setModelText(message);
      setModalOpen(true);
    } catch (error) {
      console.error("Error during nickname check:", error);
    }
  };

  const handleSignUp = () => {
    // 비밀번호와 비밀번호 확인이 같은지 확인
    const isPasswordMatch = password === passwordCheck;
    console.log("Passwords match:", isPasswordMatch);
  };

  // Modal 닫기 눌렀을 때, ModalOpen(false)
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <AlignBox>
        <Logo src="/wob-logo-green.png" alt="main logo" />
        <LoginBox>
          <AlignBox>
            <RowAlignBox>
              <AuthInputBar placeholder="Email Address" />
              <SmallGreenButton>인증하기</SmallGreenButton>
            </RowAlignBox>
            <RowAlignBox>
              <AuthInputBar
                placeholder="Nick Name"
                value={nickName}
                onChange={handleNickNameChange}
              />
              <SmallGreenButton onClick={handleCheckNickName}>
                중복확인
              </SmallGreenButton>
            </RowAlignBox>
            <InputBar
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <InputBar
              type="password"
              placeholder="Password Check"
              value={passwordCheck}
              onChange={handlePasswordCheckChange}
            />
          </AlignBox>
          <BlackButton onClick={handleSignUp}>동의하고 시작하기</BlackButton>
          <Link to={`${KH_DOMAIN}/oauth2/authorization/google`}>
            <OauthLogo src="/google-log.png" />
          </Link>
          <Link to={`${KH_DOMAIN}/oauth2/authorization/naver`}>
            <OauthLogo src="/naver-log.png" />
          </Link>
          <Link to={`${KH_DOMAIN}/oauth2/authorization/kakao`}>
            <OauthLogo src="/kakao-log.png" />
          </Link>
        </LoginBox>
      </AlignBox>
      <Modal open={modalOpen} close={closeModal} header="알림">
        {modalText}
      </Modal>
    </Container>
  );
};

export default SignUp;
