import styled from "styled-components";
import {
  InputBar,
  AuthInputBar,
  GreenButton,
} from "../../component/login/LoginCommon";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { KH_DOMAIN } from "../../utils/Common";
import { useState } from "react";
import LoginPageAxiosApi from "../../api/LoginPageAxiosApi";
import Modal from "../../utils/Modal";
import Common from "../../utils/Common";

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
  &:hover {
    cursor: pointer;
    background-color: #dfede9;
    border-radius: 25%;
  }
`;

const BlackButton = styled(GreenButton)`
  background-color: #353535;
  &:hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }
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

const PrevNavigateBox = styled.div`
  margin-top: 20px;
  text-decoration: underline;
  opacity: 0.5;
  &:hover {
    cursor: pointer;
  }
`;

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedAgreement = state ?? false; // ConditionModal에서 undefined와 null값을 받았을경우 default값으로 false로 설정
  console.log("Signup selectedAgreement", selectedAgreement);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleCheckEmail = async () => {
    try {
      const result = await LoginPageAxiosApi.mailConfirm({
        email: email,
      });
      console.log(result.status);
      if (result.status === 200) {
        setEmailVerified(true);
      }
    } catch (error) {
      console.error("Error during nickname check:", error);
    }
  };

  const handleCheckCode = async () => {
    try {
      const result = await LoginPageAxiosApi.mailVerify({
        email: email,
        code: code,
      });
      console.log(result.status);
      if (result.status === 200) {
        setCodeVerified(true);
      }
    } catch (error) {
      console.error("Error during nickname check:", error);
    }
  };

  const handleChangePasswordClick = () => {
    if (emailVerified && codeVerified && password === passwordCheck) {
      // 이메일과 코드가 확인되었을 때 처리할 로직
      console.log(
        "이메일과 인증번호가 유효합니다. 비밀번호 변경을 시작합니다."
      );
      handleChangePassword();
    } else if (emailVerified && codeVerified && password !== passwordCheck) {
      console.log("비밀번호와 비밀번호 확인이 불일치합니다.");
    } else {
      console.log("이메일과 인증번호가 유효하지않습니다. 비밀번호 변경 실패");
    }
  };

  const handleChangePassword = async () => {
    const response = await LoginPageAxiosApi.modifyForgotPassword({
      email: email,
      password: password,
    });
    if (response.status === 200) {
      console.log("forgot-pw 리턴 값: ", response);
      console.log("signin으로 돌아갑니다.");
      navigate("/signin");
    }
  };

  const handlePrevButtonClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <AlignBox>
        <Logo
          src="/wob-logo-green.png"
          alt="main logo"
          onClick={() => navigate("/")}
        />
        <LoginBox>
          <AlignBox>
            <RowAlignBox>
              <AuthInputBar
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
              />
              <SmallGreenButton onClick={handleCheckEmail}>
                인증코드
              </SmallGreenButton>
            </RowAlignBox>
            <RowAlignBox>
              <AuthInputBar
                placeholder="인증 코드"
                value={code}
                onChange={handleCodeChange}
              />
              <SmallGreenButton onClick={handleCheckCode}>
                인증확인
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
          <BlackButton
            disabled={!email || !code || !password || !passwordCheck}
            onClick={handleChangePasswordClick}
          >
            비밀번호 변경하기
          </BlackButton>
        </LoginBox>
        <PrevNavigateBox onClick={handlePrevButtonClick}>
          이전으로
        </PrevNavigateBox>
      </AlignBox>
    </Container>
  );
};

export default ForgotPassword;
