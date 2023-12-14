// 관리자 페이지 axiosApi
import axios from "axios";
import Commom, {KH_DOMAIN} from "../utils/Common";

const AdminAxiosApi =  {
  
  //회원 조회
  memberGet: async (id) => {
    return await axios.get(KH_DOMAIN + `/users/member?id=${id}`);
  },


    
   // 게시글 쓰기
  categorySave: async (name, img,logo) => {
    const category = {
      name: name,
      img: img,
      logo:logo,
    };
    return await axios.post(KH_DOMAIN + "/category/add", category);
  },
   // 게시글 조회
   boardList: async () => {
    return await axios.get(KH_DOMAIN + "/api/board");
  },
  // 게시글 상세 조회
  boardDetail: async (boardId) => {
    return await axios.get(KH_DOMAIN + `/api/board/detail/${boardId}`);
  },


};

export default AdminAxiosApi;