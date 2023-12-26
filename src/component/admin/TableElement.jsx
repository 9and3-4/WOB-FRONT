import styled from "styled-components";
import { useState, useEffect } from "react";
import Button from "../Button";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import Common from "../../utils/Common";
import { KH_DOMAIN } from "../../utils/Common";

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

        option {
        }
      }
    }
  }
`;

const Tr = ({ data, index }) => {
  const [boardList, setBoardList] = useState([]);
  const [categoryContent, setCategoryContent] = useState(data.id);
  const [categoryActive, setCategoryActive] = useState(true);
  const [confirmRevise, setConfirmRevise] = useState(false);
  const [num, setNum] = useState(0); // 인덱스 번호
  const [isTrue, setIsTrue] = useState(true);

  // 버튼 누르면 바뀜(수정 -> 확인)
  const clickRevise = () => {
    setCategoryActive(false);
    setConfirmRevise(true);
  };

  // 게시글 활성화 또는 비활성화 요청 보내기
  const clickOn = () => {};

  // 리렌더링 용
  const reRender = () => {
    setIsTrue((prev) => !prev);
  };

  // 카테고리 삭제
  const clickDelete = () => {
    const boardDelete = async () => {
      try {
        const rsp = await AdminAxiosApi.boardDelete();
        console.log(data.id);
        if (rsp.status === 200) {
          alert("카테고리가 삭제 되었습니다.");
          reRender();
        }
      } catch (e) {
        console.log("카테고리 삭제에 실패했습니다.");
      }
    };
    boardDelete();
  };

  const onRemove = (id) => {
    const clickDelete = boardList.filter((id) => data.id !== id);
    setBoardList(clickDelete);
  };

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
          <Button type="button" label="확인" size="normal" onClick={clickOn} />
        ) : (
          <Button
            type="button"
            label="수정"
            size="normal"
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
export default Tr;
