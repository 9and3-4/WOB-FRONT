import styled from "styled-components";
import {
  InputBar,
  GreenButton,
  BlackButton,
} from "../../component/login/LoginCommon";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { KH_DOMAIN } from "../../utils/Common";
import Common from "../../utils/Common";
import LoginPageAxiosApi from "../../api/LoginPageAxiosApi";

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
  text-align: center; /* Center the content */
`;

const AlignBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center; /* Center the content */
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  gap: 5px;
`;

const RowAlignBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
const OauthLogo = styled.img`
  width: 40px;
  margin: 10px 20px;
  background-color: white;
  padding: 5px;
  border-radius: 50%;
`;

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedRememberMe === "true" && storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleForgotPasswordClick = () => {
    navigate("/forgot-pw");
  };

  const handleSignUpClick = () => {
    navigate("/condition");
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  // Your logic to send API request when the button is clicked
  const handleSignInClick = async () => {
    if (!isSignInDisabled) {
      try {
        const response = await LoginPageAxiosApi.userLogin({
          email: email,
          password: password,
        });

        if (response.status === 200) {
          const accessToken = response.headers.get("authorization");
          const refreshToken = response.headers.get("authorization-refresh");
          console.log("accessToken return = ", accessToken);
          console.log("refreshToken return = ", refreshToken);
          Common.setEmail(email);
          Common.setAccessToken(accessToken);
          Common.setRefreshToken(refreshToken);
          console.log("login email : ", Common.getEmail());
          navigate("/");

          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
            localStorage.setItem("rememberedPassword", password);
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
            localStorage.removeItem("rememberMe");
          }
        } else {
          console.error("Login failed. Status code: ", response.status);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  const isSignInDisabled = !email || !password;
  return (
    <Container>
      <AlignBox>
        <Logo
          src="/wob-logo.png"
          alt="main logo"
          onClick={() => navigate("/")}
        />
        <LoginBox>
          <AlignBox>
            <InputBar
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputBar
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </AlignBox>
          <RememberMe>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <span>이메일/비밀번호 기억</span>
          </RememberMe>
          <GreenButton disabled={isSignInDisabled} onClick={handleSignInClick}>
            로그인
          </GreenButton>
          <RowAlignBox>
            <BlackButton onClick={handleForgotPasswordClick}>
              Forgot Password?
            </BlackButton>
            <BlackButton onClick={handleSignUpClick}>회원가입</BlackButton>
          </RowAlignBox>
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
    </Container>
  );
};

export default SignIn;
