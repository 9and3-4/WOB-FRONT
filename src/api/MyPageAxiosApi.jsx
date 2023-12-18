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
  //관심종목 가져오기
  userInterest: async (email) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("관심종목 사용자 이메일 :", email);
      const response = await axios.get(KH_DOMAIN + `/users/sports/${email}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
      console.log("관심종목 조회 결과 : ", response.data);
      return response.data;
    } catch (error) {
      console.log("에러 아아아아아 : ", error);
      throw new Error("관심종목 가져오기 에러 발생!!!!!아ㅓ래젇랴ㅐ절ㄷ");
    }
  },

  //회원 정보 수정
  userUpdate: async (email, nickname, image, mbti) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(
      "axios 수정 email,nick,image,mbti : ",
      email,
      nickname,
      image,
      mbti
    );
    const user = {
      email: email,
      nickname: nickname,
      image: image,
      mbti: mbti,
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
