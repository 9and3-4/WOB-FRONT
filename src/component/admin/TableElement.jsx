import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Button from "../Button";
import Modal from "../../utils/Modal";

const TrComp = styled.tr`
  max-width: 768px;
  min-width: 300px;

  td {
    outline: 1px solid #04bf8a;
    padding: 15px;
    text-align: center;
    width: 50px;

    &.center {
      text-align: center;
    }
    &.image {
      width: 768px;
      .imgBox {
        width: 30%;
        padding-bottom: 30%;
        img {
          width: 80px;
          height: 70px;
        }
      }
    }
  }

  &.selectBox {
    select {
      &:disabled {
        opacity: 1;
      }
      outline: none;
      border: none;
      padding: 6px;
      font-weight: 600;
      option {
      }
    }
  }
`;

const Tr = ({ data, index }) => {
  const [categoryContent, setCategoryContent] = useState("active");
  const [categoryActive, setCategoryActive] = useState(false);
  const [typeSel, setTypeSel] = useState("sel");
  const [gatherActive, setGatherActive] = useState(true);
  const [confirmRevise, setConfirmRevise] = useState(false);

  //Modal
  const [openModal, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalType, setModalType] = useState(null);
  const [modalConfirm, setModalConfirm] = useState(null);

  // 모달 닫기
  const closeModal = (num) => {
    setModalOpen(false);
  };
  const handleModal = (header, msg, type, num) => {
    setModalOpen(true);
    setModalHeader(header);
    setModalMsg(msg);
    setModalType(type);
    setModalConfirm(num);
  };

  const clickRevise = () => {
    setCategoryActive(false);
    if (categoryContent !== "active") setGatherActive(false);
    setConfirmRevise(true);
  };

  const ClickOk = () => {
    handleModal("확인", "수정하시겠습니까?", true, 0);
  };

  return (
    <TrComp>
      {/* 숫자 자동증가 */}
      <td className="center">{index + 1}</td>
      <td className="image">
        <span className="imgBox">
          <img src={data.logo} alt="logo" />
        </span>
      </td>
      <td>{data.name}</td>
      <td className="image">
        <span className="imgBox">
          <img src={data.image} alt="image" />
        </span>
      </td>
      {/* 셀렉트 들어갈 예정 */}
      <td className="selectBox">
        <select
          name="category"
          disabled={categoryActive}
          dafaultValue={categoryContent}>
          <option value="active" hidden>
            선택
          </option>
          <option value="활동게시글">활동게시글</option>
          <option value="비활동게시글">비활동게시글</option>
        </select>
      </td>
      <td>
        {confirmRevise ? (
          <Button
            children={"확인"}
            back="var(--MINT)"
            fontSize=".8em"
            width="80px"
            height="30px"
            active={true}
            clickEvt={ClickOk}
          />
        ) : (
          <Button
            children={"수정"}
            back="var(--MINT)"
            fontSize=".8em"
            width="80px"
            height="30px"
            active={true}
            clickEvt={clickRevise}
          />
        )}
      </td>
      <td>
        <Button
          children={"삭제"}
          back="var(--MINT)"
          fontSize=".8em"
          width="80px"
          height="30px"
          active={true}
          clickEvt={() => {}}
        />
      </td>
    </TrComp>
  );
};
export default Tr;
