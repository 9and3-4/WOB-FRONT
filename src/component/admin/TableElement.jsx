import styled from "styled-components";
import { useState } from "react";
import Button from "../Button";

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
  const [categoryContent, setCategoryContent] = useState("활동게시글");
  const [categoryActive, setCategoryActive] = useState(true);
  const [confirmRevise, setConfirmRevise] = useState(false);
  const [num, setNum] = useState(0); // 인덱스 번호

  // 버튼 누르면 바뀜(수정 -> 확인)
  const clickRevise = () => {
    setCategoryActive(false);
    setConfirmRevise(true);
    setConfirmRevise(false); // 수정 버튼을 다시 보이도록 설정
  };

  // 누르면 확인이 나옴
  const clickOk = () => {};

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
          <img src={data.image} alt="imae" />
        </span>
      </td>
      {/* 셀렉트 들어갈 예정 */}
      <td className="selectBox">
        <select
          name="category"
          disabled={categoryActive}
          defaultValue={categoryContent}>
          <option value="활동게시글">활동게시글</option>
          <option value="비활동게시글">비활동게시글</option>
        </select>
      </td>
      <td>
        {confirmRevise ? (
          <Button label="확인" size="normal" onClick={clickOk} />
        ) : (
          <Button label="수정" size="normal" onClick={clickRevise} />
        )}
      </td>
      <td>
        <Button label="삭제" size="normal" />
      </td>
    </TrComp>
  );
};

export default Tr;
