import axios from "axios";
import { KH_DOMAIN } from "../utils/Common";
import Common from "../utils/Common";

const SettingAxiosApi = {
  // 비밀번호 변경
  passwordChange: async (email, pw) => {
    const token = Common.getAccessToken();
    const contents = {
      email: email,
      password: pw,
    };
    console.log("email, pw : " + email, pw, token);
    return await axios.put(KH_DOMAIN + "/users/modify", contents, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },

  // 회원 탈퇴 이유 DB에 추가
  withdrawal: async (email, withdrawal) => {
    const token = Common.getAccessToken();
    const contents = {
      email: email,
      withdrawal: withdrawal,
    };
    return await axios.put(KH_DOMAIN + "/users/modify", contents, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },

  // 제 3자 로그인 정보 가져오기
  socialType: async (email) => {
    const token = Common.getAccessToken();
    const contents = {
      email: email,
    };
    return await axios.get(KH_DOMAIN + "/users/modify", contents, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
};

export default SettingAxiosApi;
