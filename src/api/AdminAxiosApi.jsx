// 관리자 페이지 axiosApi
import axios from "axios";
import { KH_DOMAIN } from "../utils/Common";
import Common from "../utils/Common";

const AdminAxiosApi =  {
  
  //회원 조회
  memberGet: async (id) => {
    return await axios.get(KH_DOMAIN + `/users/member?id=${id}`);
  },

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

     // 회원 페이지네이션 조회
     userPageList: async (page, size) => {
      const accessToken = Common.getAccessToken();
      return await axios.get(
        KH_DOMAIN + `/users/list/page?page=${page}&size=${size}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
    },
  
    // 회원 페이지 수 조회
    userPageCount: async (page,size) => {
      const accessToken = Common.getAccessToken();
      return await axios.get(
        KH_DOMAIN + `/users/count`, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
    },
  
    // 회원 활성화 바활성화 처리(get)-userController
      userInfoGet : async () => {
        const accessToken = Common.getAccessToken();
        return await axios.get(
          KH_DOMAIN + `/users/allList`,
          {
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
        );
      },
  
      // 회원 활성화 비활성화(post)-AdminActiveController
      userListState: async (id, state) => {
        const accessToken = Common.getAccessToken();
        console.log('활성화 비활성화, id : ', id, state);
        const data = {
          id: id,
          active: state,
        };
          return await axios.put(KH_DOMAIN + `/users/state`,data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          });
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

  // 페이지 수 조회
  boardPageCount: async (page,size) => {
    const accessToken = Common.getAccessToken();
    return await axios.get(
      KH_DOMAIN + `/category/count`, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  // 게시판 활성화 바활성화 처리(get)-categoryController
    categoryInfoGet : async () => {
      const accessToken = Common.getAccessToken();
      return await axios.get(
        KH_DOMAIN + `/category/allList`,
        {
          headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
      );
    },

    // 게시판 활성화 비활성화(post)-AdminActiveController
    categoryListState: async (id, state) => {
      const accessToken = Common.getAccessToken();
      console.log('활성화 비활성화, id : ', id, state);
      const data = {
        categoryId: id,
        active: state,
      };
        return await axios.put(KH_DOMAIN + `/category/state`,data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        });
    },

};

export default AdminAxiosApi;