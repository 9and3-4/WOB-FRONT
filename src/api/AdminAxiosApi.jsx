// 관리자 페이지 axiosApi
import axios from "axios";
import { KH_DOMAIN } from "../utils/Common";
import Common from "../utils/Common";

const AdminAxiosApi =  {
  
  //회원 조회
  memberGet: async (id) => {
    return await axios.get(KH_DOMAIN + `/users/member?id=${id}`);
  },

   // (카테고리)게시글 등록
   categorySave: async (name, img, logo) => {
    const accessToken = Common.getAccessToken();
    console.log("access : " + accessToken);
    console.log("name : " + name);
    console.log("img : " + img);
    console.log("logo : " + logo);

    const category = {
      name: name,
      image: img,
      logo: logo,
    };
    return await axios.post(KH_DOMAIN + "/category/add", category, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 게시글 조회
  boardList: async () => {
    const accessToken = Common.getAccessToken();
    return await axios.get(KH_DOMAIN + "/category/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });             
  },
  // 게시글 상세 조회
  boardDetail: async (categoryId) => {
    const accessToken = Common.getAccessToken();
    return await axios.get(KH_DOMAIN + `/category/detail/${categoryId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 게시글 페이지네이션 조회
  boardPageList: async (page, size) => {
    const accessToken = Common.getAccessToken();
    return await axios.get(
      KH_DOMAIN + `/category/list/page?page=${page}&size=${size}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
  // 게시글 삭제
  boardDelete: async (categoryId) => {
    const accessToken = Common.getAccessToken();
    return await axios.delete(
      KH_DOMAIN + `/category/delete/${categoryId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  // 게시판 활성화 바활성화 처리(get)
    managerCategoryInfoGet : async () => {
      const accessToken = Common.getAccessToken();
      return await axios.get(
        KH_DOMAIN + `/active/category/state`,
        {
          headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
      );
    },

    // 게시판 활성화 비활성화(post)
    manageCategoryListState: async (state, id) => {
      const accessToken = Common.getAccessToken();
      console.log('활성화 비활성화, id : ', state, id);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      const data = {
        isActive: state,
        id: id,
      };

      try {
        const response = await axios.post(KH_DOMAIN + `/active/category/state`, data, config);
        return response.data;

      } catch (error) {
        console.error('Error in manageCategoryListState:', error);
        throw error;
      } 
    },

  // 회원 활성화 바활성화 처리(get)
  managerUserInfoGet : async () => {
    const accessToken = Common.getAccessToken();
    return await axios.get(
      KH_DOMAIN + `/active/user/state`,
      {
        headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }
    );
  },

   // 회원 활성화 비활성화(post)
    // 게시판 활성화 비활성화(post)
    manageUserListState: async (state, id) => {
      const accessToken = Common.getAccessToken();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      const data = {
        isActive: state,
        id: id,
      };

      try {
        const response = await axios.post(KH_DOMAIN + `/active/user/state`, data, config);
        return response.data;

      } catch (error) {
        console.error('Error in manageUserListState:', error);
        throw error;
      } 
    },


  // 채팅 활성화 바활성화 처리
  // managerChatInfoGet : async () => {
  //   const accessToken = Common.getAccessToken();
  //   return await AdminAxiosApi.get(
  //     KH_DOMAIN + `/active/chat/state`,
  //     {
  //       headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   }
  //   );
  // },

   // 채팅 활성화 비활성화(post)
  //  manageChatListState: async (isActive, id) => {
  //   const state = {
  //     isActive: isActive,
  //     id: id,
  //   };
  //   return await AdminAxiosApi.post(KH_DOMAIN + "/active/ChatListState", state);
  // },

  // 광고 활성화 바활성화 처리
  // managerAdInfoGet : async () => {
  //   const accessToken = Common.getAccessToken();
  //   return await AdminAxiosApi.get(
  //     KH_DOMAIN + `/active/ad/state`,
  //     {
  //       headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   }
  //   );
  // },

   // 광고 활성화 비활성화(post)
  //  manageAdListState: async (isActive, id) => {
  //   const state = {
  //     isActive: isActive,
  //     id: id,
  //   };
  //   return await AdminAxiosApi.post(KH_DOMAIN + "/active/AdListState", state);
  // },

};

export default AdminAxiosApi;