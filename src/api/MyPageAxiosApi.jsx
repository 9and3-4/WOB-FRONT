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
    console.log("회원정보 사용자 이메일 :", email);
    return await axios.get(KH_DOMAIN + `/users/detail/${email}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  //회원 정보 수정
  userUpdate: async (
    email,
    nickname,
    introduce,
    image,
    mbti,
    interestSports,
    interestArea
  ) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(
      "axios 회원정보 수정 업데이트 하기 : ",
      email,
      nickname,
      introduce,
      image,
      mbti,
      interestSports,
      interestArea
    );
    const user = {
      email: email,
      nickname: nickname,
      introduce: introduce,
      image: image,
      mbti: mbti,
      interestSports: interestSports,
      interestArea: interestArea,
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
