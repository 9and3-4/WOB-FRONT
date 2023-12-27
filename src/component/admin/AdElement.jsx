// 카테고리 목록
import styled from "styled-components";
import { useState } from "react";
import Button from "../Button";
import AdminAxiosApi from "../../api/AdminAxiosApi";

const TrComp = styled.tr`
  td {
    outline: 1px solid #dce0df;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    width: 50px;
    vertical-align: middle;

    &.center {
      text-align: center;
    }
    &.image {
      .imgBox {
        width: 30%;
        padding-bottom: 30%;
        img {
          width: 80px;
          height: 70px;
        }
      }
    }
    &.selectBox {
      select {
        outline: none;
        padding: 6px;
        &:disabled {
          opacity: 1;
        }
      }
    }
  }
`;

const Tr3 = ({ data, index }) => {
  //   const [boardList, setBoardList] = useState([]);
  const [categoryContent, setCategoryContent] = useState(data.id);
  const [categoryActive, setCategoryActive] = useState(true);
  const [confirmRevise, setConfirmRevise] = useState(false);
  const [num, setNum] = useState(0); // 인덱스 번호
  const [isTrue, setIsTrue] = useState(true);

  const [selete, setSelete] = useState("활성화");

  // 버튼 누르면 바뀜(수정 -> 확인)
  const clickRevise = (e) => {
    setCategoryActive(false);
    setConfirmRevise(true);
    setSelete(e.target.value);
  };

  // const handleSeleteChange = (e) => {
  //   setSelete(e.target.value);
  // };

  // 게시글 활성화 또는 비활성화 요청 보내기
  const clickOn = (e) => {
    setSelete(e.target.value);
  };

  // 카테고리 삭제
  const clickDelete = () => {
    const boardDelete = async () => {
      try {
        const rsp = await AdminAxiosApi.boardDelete();
        console.log(rsp);
        if (rsp.status === 200) {
          alert("카테고리가 삭제 되었습니다.");
        }
      } catch (e) {
        console.log("카테고리 삭제에 실패했습니다.");
      }
    };
    boardDelete();
  };

  //   const onRemove = (id) => {
  //     const clickDelete = boardList.filter((id) => data.id !== id);
  //     setBoardList(clickDelete);
  //   };

  return (
    <TrComp>
      {/* 숫자 자동증가 */}
      <td className="center">{index + num}</td>
      <td className="image">
        <span className="imgBox">
          <img src={data.logo} alt="logo" />
        </span>
      </td>
      <td>{data.name}</td>
      <td className="image">
        <span className="imgBox">
          <img src={data.image} alt="img" />
        </span>
      </td>
      {/* 셀렉트 */}
      <td className="selectBox">
        <select
          name="category"
          disabled={categoryActive}
          value={categoryContent}>
          <option value="활동게시글">활동게시글</option>
          <option value="비활동게시글">비활동게시글</option>
        </select>
      </td>
      <td>
        {confirmRevise ? (
          <Button
            type="button"
            label="확인"
            size="normal"
            checked={selete === "비활성화"}
            onClick={clickOn}
          />
        ) : (
          <Button
            type="button"
            label="수정"
            size="normal"
            checked={selete === "활성화"}
            onClick={clickRevise}
          />
        )}
      </td>
      <td>
        <Button
          type="button"
          label="삭제"
          size="normal"
          value={data.id}
          onClick={clickDelete}
        />
      </td>
    </TrComp>
  );
};
export default Tr3;
