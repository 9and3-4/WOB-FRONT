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
  // boardDetail: async (boardId) => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(Common.KH_DOMAIN + `/category/detail/${boardId}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   });
  // },
  // // 게시글 페이지네이션 조회
  // boardPageList: async (page, size) => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.get(
  //     Common.KH_DOMAIN + `/category/list/page?page=${page}&size=${size}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + accessToken,
  //       },
  //     }
  //   );
  // },
  // // 게시글 삭제
  // boardDelete: async (boardId) => {
  //   const accessToken = Common.getAccessToken();
  //   return await axios.delete(
  //     Common.KH_DOMAIN + `/category/delete/${boardId}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + accessToken,
  //       },
  //     }
  //   );
  // },

};

export default AdminAxiosApi;