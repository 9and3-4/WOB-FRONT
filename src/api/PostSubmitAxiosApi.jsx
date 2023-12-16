import axios from "axios";
import { KH_DOMAIN } from "../utils/Common";
import Common from "../utils/Common";

const PostAxiosApi = {
  // 일정 등록
  postSubmit: async (props) => {
    const token = Common.getAccessToken();
    const post = {
      title: props.title,
      place: props.place,
      people: props.people,
      expectationCost: props.cost,
      introduction: props.detail,
      date: props.date,
      time: props.time,
    };
    console.log(
      "일정 등록 : ",
      post.title,
      post.place,
      post.people,
      post.cost,
      post.detail,
      post.date,
      post.time
    );
    return await axios.post(KH_DOMAIN + "/post/new", post, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
};

export default PostAxiosApi;
