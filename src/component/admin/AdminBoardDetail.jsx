// 관리자 게시판 관리 - 게시판 상세 페이지(보기)
import { useState, useEffect } from "react";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// 여기에 스타일드 컴포넌트를 정의합니다.
const Container = styled.div`
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2em;
  margin-bottom: 10px;
`;

const Content = styled.p`
  color: #666;
  line-height: 1.5;
`;

const CommentForm = styled.form`
  margin-top: 20px;
  clear: left;
`;

const BoardImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  margin-right: 15px;
  margin-bottom: 10px;
  float: left;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;
const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const CommentContent = styled.p`
  color: #444;
  font-size: 1em;
  margin: 0;
  padding: 0;
  font-size: 13px;
  float: left;
`;
const CommentUser = styled.p`
  color: #555;
  font-style: italic;
  font-size: 13px;
  margin: 0;
  padding: 0;
  text-align: right;
`;

const BoardDate = styled.p`
  color: #777;
  font-size: 0.8em;
  text-align: right;
`;

const AdminBoardDetail = () => {
  const { id } = useParams();
  const [board, setBoard] = useState("");
  const [comments, setComments] = useState("");
  const [inputComment, setInputComment] = useState("");
  const [comAddFlag, setComAddFlag] = useState(false); // 댓글 추가 성공 여부
  const userId = localStorage.getItem("userId");
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    const getBoardDetail = async () => {
      try {
        const response = await AdminAxiosApi.boardDetail(id);
        setBoard(response.data);
        const response2 = await AdminAxiosApi.commentList(id);
        setComments(response2.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBoardDetail();
  }, [comAddFlag, id]);

  const handleCommentChange = (e) => {
    setInputComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminAxiosApi.commentWrite(userId, id, inputComment);
      console.log(response);
      setInputComment("");
      setComAddFlag(!comAddFlag);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <BoardImage
        src={board.img ? board.img : "http://via.placeholder.com/160"}
        alt="Board image"
      />
      <Title>{board.title}</Title>
      <Content>{board.content}</Content>
      <BoardDate>{board.regDate}</BoardDate>

      <button onClick={toggleComments}>
        {showComments ? "댓글 숨기기" : `댓글 ${comments.length}개 보기`}
      </button>

      <CommentForm onSubmit={handleSubmitComment}>
        <label>
          <CommentInput
            type="text"
            value={inputComment}
            onChange={handleCommentChange}
          />
        </label>
        <SubmitButton type="submit">댓글 추가</SubmitButton>
      </CommentForm>
      {showComments && (
        <CommentList>
          {comments &&
            comments.map((comment) => (
              <CommentItem key={comment.commentId}>
                <CommentContent>{comment.content}</CommentContent>
                <CommentUser>{comment.userId}</CommentUser>
              </CommentItem>
            ))}
        </CommentList>
      )}
    </Container>
  );
};

export default AdminBoardDetail;
