import axios from "axios";
import { KH_DOMAIN } from "../utils/Common";

const AxiosApi = {
  memberLogin: async (email, pw) => {
    console.log("로그인: ", email, pw);
    const login = {
      email: email,
      password: pw,
    };
    return await axios.post(KH_DOMAIN + "/auth/login", login);
  },

  // Member Get One - 회원정보 조회
  memberGetOne: async (email) => {
    const token = localStorage.getItem("token");
    console.log("회원조회 : ", token);
    return await axios.get(KH_DOMAIN + `/users/detail/${email}`, {
      headers: {
        "Content-Type": "application/jason",
        Authorization: "Bearer" + token,
      },
    });
  },

  //회원 정보 수정
  memberUpdate: async (email, nickName, image) => {
    const token = localStorage.getItem("token");
    console.log("회원 정보 수정: ", email, nickName, image);
    const member = {
      email: email,
      nickName: nickName,
      image: image,
    };
    return await axios.put(KH_DOMAIN + `/users/modify`, member, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
    });
  },
};

export default AxiosApi;
