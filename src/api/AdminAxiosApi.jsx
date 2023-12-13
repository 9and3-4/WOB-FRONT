import axios from "axios";
import Commom, {KH_DOMAIN} from "../utils/Common";

const AdminAxiosApi =  {
    
   // 게시글 쓰기
  boardWrite: async (title, img) => {
    const board = {
      title: title,
      img: img,
    };
    return await axios.post(KH_DOMAIN + "/api/board/new", board);
  },
};

export default AdminAxiosApi;