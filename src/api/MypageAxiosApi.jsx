import axios from "axios";
import { KH_DOMAIN } from "../utils/Common";

const MyPageAxiosApi = {
  //회원 전체 조회
  userGet: async () => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/users/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // Member Get One - 회원정보 상세 조회
  userGetOne: async (email) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("회원조회 토큰 : ", accessToken);
    console.log("사용자 이메일 :", email);
    return await axios.get(KH_DOMAIN + `/users/detail/${email}`, {
      headers: {
        "Content-Type": "application/jason",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  //회원 정보 수정
  userUpdate: async (email, nickName, image) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("회원 정보 수정: ", email, nickName, image);
    const member = {
      email: email,
      nickName: nickName,
      image: image,
    };
    return await axios.put(KH_DOMAIN + `/users/modify`, member, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
};

export default MyPageAxiosApi;
