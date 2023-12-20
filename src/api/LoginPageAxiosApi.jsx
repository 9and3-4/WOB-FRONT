// import axios from "./Interceptors";
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

  userNickNameCheck: async (props) => {
    const { nickname } = props;
    return await axios.get(`${KH_DOMAIN}/check-nickname?nickName=${nickname}`);
  },

  userLogin: async (props) => {
    const params = {
      email: props.email,
      password: props.password,
    };
    // console.log(params);
    return await axios.post(KH_DOMAIN + "/login", params);
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

  mailConfirm: async (props) => {
    const params = {
      email: props.email,
    };
    return await axios.post(KH_DOMAIN + "/login/mailConfirm", params);
  },

  mailVerify: async (props) => {
    const params = {
      email: props.email,
      code: props.code,
    };
    return await axios.post(KH_DOMAIN + "/login/mailVerify", params);
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
  interestAreas: async (props) => {
    const accessToken = Common.getAccessToken();
    const email = Common.getEmail();
    return await axios.post(
      KH_DOMAIN + `/interest/areas?email=${email}`,
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
