// import axios from "axios";
import customAxios from "./Interceptors";
import { KH_DOMAIN } from "../utils/Common";

const SettingAxiosApi = {
  // 비밀번호 변경
  passwordChange: async (email, pw) => {
    const contents = {
      email: email,
      password: pw,
    };
    return await customAxios.put(KH_DOMAIN + "/users/modify", contents);
  },

  // 회원 탈퇴 이유 DB에 추가
  withdrawal: async (email, withdrawal) => {
    const contents = {
      email: email,
      withdrawal: withdrawal,
    };
    return await customAxios.put(KH_DOMAIN + "/users/modify", contents);
  },

  // 회원 활성화 비활성화
  withdrawalInactive: async (email) => {
    const data = {
      email: email,
    };
    return await customAxios.put(KH_DOMAIN + `/setting/state`, data);
  },

  // 제 3자 로그인 정보 가져오기
  socialType: async (email) => {
    const contents = {
      email: email,
    };
    return await customAxios.get(
      KH_DOMAIN + `/users/detail/${email}`,
      contents
    );
  },

  // 자유 채팅방 목록 보기 (postId 없음)
  freeChatList: async () => {
    return await customAxios.get(KH_DOMAIN + "/chat/freeList");
  },

  // 해당 채팅방 정보 보기
  chatDetail: async (roomId) => {
    return await customAxios.get(KH_DOMAIN + `/chat/room/${roomId}`);
  },

  // 게시글과 조인된 채팅방 생성 (postId 있음)
  chatCreate: async (name, postId) => {
    const chat = {
      name: name,
      postId: postId,
    };
    return await customAxios.post(KH_DOMAIN + "/chat/new", chat);
  },

  // 자유 채팅방 생성 (postId 없음)
  freeChatCreate: async (name) => {
    const chat = {
      name: name,
    };
    return await customAxios.post(KH_DOMAIN + "/chat/freeNew", chat);
  },

  // 해당 채팅방의 이전 채팅 내역 가져오기
  recentChatLoad: async (roomId) => {
    return await customAxios.get(KH_DOMAIN + `/chat/message/${roomId}`);
  },

  // post 테이블에 roomId 추가
  postAddRoomId: async (postId, roomId) => {
    const contents = {
      id: postId,
      roomId: roomId,
    };
    return await customAxios.put(KH_DOMAIN + "/chat/modify", contents);
  },

  // postId로 게시글 상세 조회
  postListById: async (postId) => {
    console.log("호출됨!!");
    return await customAxios.get(KH_DOMAIN + `/chat/postListById/${postId}`);
  },

  // 결제내역 페이지네이션 조회
  paymentPageList: async (email, page, size) => {
    return await customAxios.get(
      KH_DOMAIN + `/pay/detail/page?email=${email}&page=${page}&size=${size}`
    );
  },
  // 결제내역 페이지 수 조회
  paymentPage: async (email, page, size) => {
    return await customAxios.get(
      KH_DOMAIN + `/pay/detail/count?email=${email}&page=${page}&size=${size}`
    );
  },

  // 게시글 채팅방 목록 보기 (postId 있음)
  roomList: async () => {
    return await customAxios.get(KH_DOMAIN + "/chat/list");
  },

  // 채팅 내역 전체 조회
  chatList: async () => {
    return await customAxios.get(KH_DOMAIN + "/chat/chatList");
  },

  // 채팅 내역 삭제
  chatDelete: async (id) => {
    return await customAxios.delete(KH_DOMAIN + `/chat/delChat/${id}`);
  },

  // 채팅방 삭제
  roomDelete: async (roomId) => {
    return await customAxios.delete(KH_DOMAIN + `/chat/delRoom/${roomId}`);
  },

  // 채팅 내역 활성화 / 비활성화
  stateChat: async (id, active) => {
    const data = {
      id: id,
      active: active,
    };
    return await customAxios.put(KH_DOMAIN + `/chat/stateChat`, data);
  },
  // 채팅방 활성화 / 비활성화
  stateRoom: async (roomId, active) => {
    const data = {
      roomId: roomId,
      active: active,
    };
    return await customAxios.put(KH_DOMAIN + `/chat/stateRoom`, data);
  },
  // 전체 결제 내역 페이지네이션 조회
  paymentPageAllList: async (page, size) => {
    return await customAxios.get(
      KH_DOMAIN + `/pay/all/page?page=${page}&size=${size}`
    );
  },
  // 전체 결제 내역 페이지 수 조회
  paymentAllPage: async (page, size) => {
    return await customAxios.get(
      KH_DOMAIN + `/pay/all/count?page=${page}&size=${size}`
    );
  },
  // 전체 채팅 내역 페이지네이션 조회
  chatPageAllList: async (page, size) => {
    return await customAxios.get(
      KH_DOMAIN + `/chat/all/page?page=${page}&size=${size}`
    );
  },
  // 전체 채팅 내역 페이지 수 조회
  chatAllPage: async (page, size) => {
    return await customAxios.get(
      KH_DOMAIN + `/chat/all/count?page=${page}&size=${size}`
    );
  },
};
export default SettingAxiosApi;
