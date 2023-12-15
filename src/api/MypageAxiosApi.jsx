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
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  //회원 정보 수정
  userUpdate: async (email, nickname, image) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("회원정보 수정 accessToken: ", accessToken);
    console.log("회원 정보 수정 이멜,닉넴,이미지 : ", email, nickname, image);
    const user = {
      email: email,
      nickname: nickname,
      image: image,
    };
    return await axios.put(KH_DOMAIN + `/users/modify`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
};

export default MyPageAxiosApi;
