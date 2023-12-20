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
  // 채팅방 목록 보기
  chatList: async () => {
    const accessToken = Common.getAccessToken();
    return await axios.get(Common.KH_DOMAIN + "/chat/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 채팅방 정보 보기
  chatDetail: async (roomId) => {
    const accessToken = Common.getAccessToken();
    return await axios.get(Common.KH_DOMAIN + `/chat/room/${roomId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 채팅방 생성
  chatCreate: async (name) => {
    const accessToken = Common.getAccessToken();
    const chat = {
      name: name,
    };
    return await axios.post(KH_DOMAIN + "/chat/new", chat, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 이전 채팅 가져오기
  recentChatLoad: async (roomId) => {
    const accessToken = Common.getAccessToken();
    return await axios.get(Common.KH_DOMAIN + `/chat/message/${roomId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // post에 roomId 추가
  postAddRoomId: async (postId, roomId) => {
    const token = Common.getAccessToken();
    const contents = {
      id: postId,
      roomId: roomId,
    };
    return await axios.put(KH_DOMAIN + "/chat/modify", contents, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  // postId로 게시글 상세 조회
  postListById: async (postId) => {
    console.log("호출됨!!");
    const accessToken = Common.getAccessToken();
    return await axios.get(KH_DOMAIN + `/chat/postListById/${postId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
};
export default SettingAxiosApi;
