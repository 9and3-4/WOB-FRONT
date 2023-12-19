import axios from "./Interceptors";
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

  loginTest: async () => {
    return await axios.get(KH_DOMAIN + "/jwt-test");
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
