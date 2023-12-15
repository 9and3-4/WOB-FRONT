import axios from "axios";
import Common, { KH_DOMAIN } from "../utils/Common";

// http://localhost:3000/oauth2/authorization/google

const LoginPageAxiosApi = {
  // 회원가입
  userSignUp: async (props) => {
    const params = {
      email: props.email,
      password: props.password,
      nickname: props.nickname,
    };
    // console.log(params);
    return await axios.post(KH_DOMAIN + "/sign-up", params);
  },

  userLogin: async (props) => {
    const params = {
      email: props.email,
      password: props.password,
    };
    // console.log(params);
    return await axios.post(KH_DOMAIN + "/login", params);
  },

  googleLogin: async () => {
    return await axios.get(KH_DOMAIN + "/oauth-login/google", {
      withCredentials: true,
    });
  },

  naverLogin: async () => {
    return await axios.get(KH_DOMAIN + "/oauth-login/naver", {
      withCredentials: true,
    });
  },

  kakaoLogin: async () => {
    return await axios.get(KH_DOMAIN + "/oauth-login/kakao", {
      withCredentials: true,
    });
  },

  loginTest: async () => {
    const accessToken = Common.getAccessToken();
    return await axios.get(KH_DOMAIN + "/jwt-test", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  interestSprots: async (props) => {
    const accessToken = Common.getAccessToken();
    const email = Common.getEmail();
    return await axios.post(
      KH_DOMAIN + `/interest/sports?email=${email}`,
      props,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
};
export default LoginPageAxiosApi;
