// 전체 게시판 상세페이지
import { useState, useEffect } from "react";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Common from "../../utils/Common";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/admin/Layout";
import AdminBoardModify from "../admin/AdminBoardModify";

// 여기에 스타일드 컴포넌트를 정의합니다.
const Container = styled.div`
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2em;
`;

const Content = styled.p`
  color: #666;
  line-height: 1.5;
  white-space: pre-wrap;
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
  width: 82%;
  padding: 10px;
  margin: 10px;
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

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const CommentContent = styled.p`
  color: #444;
  font-size: 1em;
  margin: 0;
  padding: 0;
`;
const CommentEmail = styled.p`
  display: flex;
  justify-content: space-between;
  color: #555;
  font-style: italic;
  font-size: 13px;
  margin: 0;
  padding: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const BoardDate = styled.p`
  color: #777;
  font-size: 0.8em;
  text-align: right;
`;

// 게시글 상세 보기와 댓글 목록을 보여주는 컴포넌트

const AdminBoardDetail = () => {
  const { categoryId } = useParams();
  const [board, setBoard] = useState("");
  const [comments, setComments] = useState("");
  const [inputComment, setInputComment] = useState("");
  const [comAddFlag, setComAddFlag] = useState(false); // 댓글 추가 성공 여부
  const [loginUserEmail, setLoginUserEmail] = useState(""); // 현재 로그인 유저의 이메일
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleModifyClick = () => {
    navigate("/modify/{id}");
  };

  const handleDeleteClick = () => {
    navigate("/delete");
  };

    // 게시판 상세 내용
  useEffect(() => {
    const token = Common.getAccessToken();
    const getBoardDetail = async () => {
      console.log("getBoardDetail : " + categoryId);
      try {
        const response = await AdminAxiosApi.boardDetail(categoryId); // 게시글 상세
        setBoard(response.data);
        const response2 = await AdminAxiosApi.boardList(categoryId); // 게시판 목록
        setComments(response2.data);
        const response3 = await AdminAxiosApi.memberGetInfo(); // 현재 로그인 관리자의 이메일
        setLoginUserEmail(response3.data.email);
      } catch (e) {
        if (e.response.status === 401) {
          await Common.handleUnauthorized();
          const newToken = Common.getAccessToken();
          if (newToken !== token) {
            const response = await AdminAxiosApi.boardDetail(categoryId);
            setBoard(response.data);
            const response2 = await AdminAxiosApi.boardList(categoryId);
            setComments(response2.data);
          }
        }
      }
    };
    getBoardDetail();
  }, [comAddFlag, categoryId]);

  const deleteBoard = () => {
    console.log("deleteBoard : " + categoryId);

    // 삭제 확인을 위한 팝업 띄우기
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const token = Common.getAccessToken();
      const deleteBoard = async () => {
        try {
          const response = await AdminAxiosApi.boardDelete(categoryId);
          console.log(response);
          window.alert("삭제되었습니다.");
          navigate("/boards");
        } catch (e) {
          if (e.response.status === 401) {
            await Common.handleUnauthorized();
            const newToken = Common.getAccessToken();
            if (newToken !== token) {
              const response = await AdminAxiosApi.boardDelete(categoryId);
              console.log(response);
              window.alert("삭제되었습니다.");
              window.location.href = "/boardList";
            }
          }
        }
      };
      deleteBoard();
    }
  };



  const handleCommentChange = (e) => {
    setInputComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminAxiosApi.commentWrite(categoryId, inputComment);
      console.log(response);
      setInputComment("");
      setComAddFlag(!comAddFlag);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <FieldContainer>
        <BoardImage
          src={board.img ? board.img : "http://via.placeholder.com/160"}
          alt="Board image"
        />
        <TextContainer>
          <Title>{board.title}</Title>
          <Content>{board.content}</Content>
          <BoardDate>{Common.timeFromNow(board.regDate)}</BoardDate>
        </TextContainer>
      </FieldContainer>

      <ButtonContainer>
        <Button onClick={toggleComments}>
          {showComments ? "댓글 숨기기" : `댓글 ${comments.length}개 보기`}
        </Button>
        {loginUserEmail === board.email && (
          <>
            <Button onClick={handleModifyClick}>수정</Button>
            <Button onClick={handleDeleteClick}>삭제</Button>
          </>
        )}
      </ButtonContainer>

      <CommentForm onSubmit={handleSubmitComment}>
        <CommentInput
          type="text"
          value={inputComment}
          onChange={handleCommentChange}
        />
        <SubmitButton type="submit">댓글 추가</SubmitButton>
      </CommentForm>
      {showComments && (
        <CommentList>
          {comments &&
            comments.map((comment) => (
              <CommentItem key={comment.commentId}>
                <CommentEmail>
                  <p>{comment.email}</p>
                  <p>{Common.timeFromNow(comment.regDate)}</p>
                </CommentEmail>
                <CommentContent>{comment.content}</CommentContent>
              </CommentItem>
            ))}
        </CommentList>
      )}
      <Layout />
    </Container>
  );
};

export default AdminBoardDetail;