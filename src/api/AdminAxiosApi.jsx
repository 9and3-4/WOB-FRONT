import axios from "axios";
import Commom, {KH_DOMAIN} from "../utils/Common";

const AdminAxiosApi =  {
    
   // 게시글 쓰기
  categorySave: async (name, img,logo) => {
    const category = {
      name: name,
      img: img,
      logo:logo,
    };
    return await axios.post(KH_DOMAIN + "/category/add", category);
  },
};

export default AdminAxiosApi;