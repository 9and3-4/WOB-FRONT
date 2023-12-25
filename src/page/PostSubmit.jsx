import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SubHeader from "../layout/SubHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PostAxiosApi from "../api/PostAxiosApi";
import Modal from "../utils/Modal";
import { storage } from "../api/firebase";
import Address from "../component/Address";

const Container = styled.div`
  max-width: 768px;
  min-width: 300px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  color: var(--GREEN);
`;

const TitleBox = styled.div`
  width: 100%;
  height: 50px;
  font-size: 25px;
  font-weight: bold;
  color: var(--GREEN);
  text-align: center;
  padding-top: 20px;
`;

const RadioButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const RadioButton = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin: 30px;
  color: var(--BLACK);
`;

const InputBox = styled.div`
  width: 300px;
  margin: 20px;
  margin: 0 auto;
`;

const Input = styled.input`
  margin: 0 50px;
  width: 100%;
  height: auto;
  line-height: normal;
  padding: 1em;
  border: 1px solid gray;
  border-radius: 18px;
  outline-style: none;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: auto;
  line-height: normal;
  padding: 1em;
  border: 1px solid gray;
  border-radius: 18px;
  outline-style: none;
`;

const StyledTextArea = styled.textarea`
  margin: 10px;
  width: 100%;
  height: 150px;
  line-height: normal;
  padding: 1em;
  border: 1px solid gray;
  border-radius: 18px;
  outline-style: none;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: space-between;
`;

const SubmitButton = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: bold;
  color: var(--BLACK);
  background-color: var(--MINT);
  border: none;
  border-radius: 18px;
  cursor: pointer;

  &:hover {
    background-color: var(--GREEN);
  }
`;

const CancleButton = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: bold;
  color: var(--BLACK);
  background-color: var(--MINT);
  border: none;
  border-radius: 18px;
  cursor: pointer;

  &:hover {
    background-color: var(--GREEN);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AdButton = styled.button`
  padding: 10px 20px;
  font-size: 13px;
  font-weight: bold;
  color: var(--BLACK);
  background-color: var(--MINT);
  border: none;
  border-radius: 18px;
  cursor: pointer;

  &:hover {
    background-color: var(--GREEN);
  }
`;

const DateBox = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .react-datepicker-wrapper {
    width: 100%;
  }
`;

const TimeBox = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .react-datepicker-wrapper {
    width: 100%;
  }
`;

const AddressBox = styled.div`
  width: 100%;
`;

const StyledSelect = styled.select`
  margin: 0 50px;
  width: 100%;
  height: auto;
  line-height: normal;
  padding: 1em;
  border: 1px solid gray;
  border-radius: 18px;
  outline-style: none;
  margin-bottom: 20px;

  &:hover {
    border-color: var(--GREEN); // 호버 시 테두리 색상 변경
  }

  &:focus {
    outline: none;
    border-color: #4caf50; // 포커스 시 테두리 색상 변경
  }

  option {
    background-color: var(--MINT); /* 옵션 배경 색상 */
    font-size: 14px; /* 옵션 글꼴 크기 */
    color: #333; /* 옵션 텍스트 색상 */
  }
`;

const ModalBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 15px;
`;

const SectionTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--GREEN); // 원하는 색상으로 변경
`;

const AdBox = styled.div`
  border: 1px solid var(--GREEN);
  width: 95%;
  margin-bottom: 15px;
`;

const UserBox = styled.div`
  border: 1px solid var(--GREEN);
  width: 95%;
`;
const Labelbox = styled.div`
  padding: 10px;

  label {
    padding: 15px;
  }
`;

const PaymentBox = styled.div`
  width: 95%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const PaymentButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: var(--MINT);
  border-radius: 13px;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const PostSubmit = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("normal"); // 일반, 레슨 등록 선택
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState([]); // 카테고리 목록
  const [seletedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리 추가
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [local, setLocal] = useState("");
  const [address, setAddresss] = useState("");
  const [place, setPlace] = useState("");
  const [cost, setCost] = useState("");
  const [people, setPeople] = useState("");
  const [detail, setDetail] = useState("");
  // 레슨 일정 등록에 필요한 state 변수들
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [advertisement, setAdvertisement] = useState({
    image: "",
    period: "",
    fee: "",
    userName: "",
    phoneNumber: "",
  });

  const resetForm = () => {
    setTitle("");
    setSelectedCategory("");
    setDate("");
    setTime("");
    setLocal("");
    setPlace("");
    setCost("");
    setPeople("");
    setDetail("");
    setUrl(null);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    resetForm(); // 라디오 버튼 옵션이 변경될 때 폼을 초기화
  };

  // 카테고리 목록 가져오기
  useEffect(() => {
    // 카테고리 목록 가져오는 API 호출
    const categoryList = async () => {
      try {
        const rsp = await PostAxiosApi.categoryList();
        console.log(rsp.data);
        setCategory(rsp.data);
      } catch (error) {
        console.error("error : ", error);
      }
    };
    // 비동기 함수 호출
    categoryList();
  }, []);

  // 서울에 있는 모든 구를 선택할 수 있는 맵
  const seoulArea = [
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. date 와 time을 Date 객체로 변환
    const koreaDate = new Date(date);
    const koreaTime = new Date(time);

    // 2. 현재 시간을 UTC(협정 시계) 시간으로 계산(DB 저장시 UTC 기준으로 저장 되기 때문) = 현재 로컬 시간대와 UTC와의 차이를 밀리초로 표현한 값.
    // getTimezoneOffset() : 현재 실행 중인 시스템의 로컬 시간과 UTC(협정 시계)와의 시간 차이를 분단위로 반환. 한국은 UTC보다 9시간 빠르므로 -540이 반환.
    // * 60 은 분을 초로 변환, 1000 곱하면 밀리초로 변환. (-540 * 60 * 1000 = -32400000 밀리초)
    // 날짜를 UTC로 변환할 때 9시간 더하기
    const utcDate = new Date(
      koreaDate.getTime() - koreaDate.getTimezoneOffset() + 540 * 60 * 1000
    );
    // 시간을 UTC로 변환할 때 9시간 빼기
    const utcTime = new Date(
      koreaTime.getTime() - koreaTime.getTimezoneOffset() - 540 * 60 * 1000
    );

    // 3. UTC to KST (UTC + 9시간 = 한국 시간) = 한국 시간이 UTC보다 9시간 빠르게 밀리초 단위로 설정한 값.
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

    const krDate = new Date(utcDate.getTime() + KR_TIME_DIFF); // 한국 날짜로 변환.
    const krTime = new Date(utcTime.getTime() + KR_TIME_DIFF);

    // 4. 날짜, 시간 string으로 변환
    const krDateString = krDate.toISOString().split("T")[0];
    const krTimeString = krTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // 여기에서 등록된 일정을 서버에 보낼 수 있음 props로 받아 {} 객체 형태로 묶어서 전달
    const rsp = await PostAxiosApi.postSubmit({
      title,
      seletedCategory,
      local,
      address,
      place,
      people,
      cost,
      detail,
      date: krDateString,
      time: krTimeString,
      type: selectedOption,
      url: url,
    });
    console.log("type : ", selectedOption);
    console.log("Response:", rsp.data);

    console.log({
      title,
      seletedCategory,
      date: krDateString,
      time: krTimeString,
      local,
      address,
      place,
      cost,
      people,
      detail,
      url: url,
      selectedOption,
    });
    if (rsp.data) {
      alert("등록 요청 완료");
      navigate("/postlist"); // 등록 성공시 게시글 목록 페이지로 이동.
    } else {
      alert("등록 실패");
    }
  };

  // 상세 주소
  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };

  // 이미지 업로드
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // 파일 업로드 처리
      handleUpload(selectedFile);
    } else {
      console.log("파일 선택 취소");
    }
  };

  const handleUpload = async (file) => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      // 파일 업로드하고 기다림
      await fileRef.put(file);
      console.log("!!!파일 업로드 성공!!!");
      // 다운로드 url을 가져옴
      const url = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : " + url);

      // 상태를 업데이트
      setUrl(url);
    } catch (error) {
      console.error("업데이트 실패", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const confirmModal = () => {
    // Ad 데이터 전송하는 axios
  };

  // 모달 내 입력 필드 값이 변경될 때 호출되는 이벤트
  const inputModal = (e) => {
    const { name, value, type } = e.target;

    // 파일 업로드인 경우
    if (type === "file") {
      const file = e.target.files[0];
      setAdvertisement((preData) => ({
        ...preData,
        [name]: file,
      }));
    } else {
      // 일반 입력 필드인 경우
      setAdvertisement((preData) => ({
        ...preData,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <SubHeader />
      <Container>
        <TitleBox>일정 등록</TitleBox>
        <RadioButtonBox>
          <RadioButton>
            <input
              type="radio"
              value="normal"
              checked={selectedOption === "normal"}
              onChange={handleOptionChange}
            />
            일반 일정
          </RadioButton>
          <RadioButton>
            <input
              type="radio"
              value="lesson"
              checked={selectedOption === "lesson"}
              onChange={handleOptionChange}
            />
            레슨 등록
          </RadioButton>
        </RadioButtonBox>
        <InputBox>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={title}
              placeholder="제목"
              onChange={(e) => setTitle(e.target.value)}
            />
            <StyledSelect
              value={seletedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled>
                종목 선택
              </option>
              {category.map((cate) => (
                <option key={cate.categoryId} value={cate.name}>
                  {cate.name}
                </option>
              ))}
            </StyledSelect>
            <DateBox>
              <DatePicker
                className="datedate"
                selected={date}
                placeholderText="날짜"
                onChange={(newDate) => {
                  console.log(typeof newDate);
                  setDate(newDate);
                }}
                dateFormat="yyyy년 MM월 dd일"
                customInput={<StyledInput />}
              />
            </DateBox>

            <TimeBox>
              <DatePicker
                selected={time}
                onChange={(date) => setTime(date)}
                placeholderText="시간"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
                customInput={<StyledInput />}
              />
            </TimeBox>

            <StyledSelect
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            >
              <option value="" disabled>
                지역구
              </option>
              {seoulArea.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </StyledSelect>
            <AddressBox>
              <Address
                type="text"
                value={place}
                placeholder="상세 주소"
                onChange={handlePlaceChange}
                setPlace={setPlace}
              />
            </AddressBox>
            <Input
              type="text"
              value={cost}
              placeholder="비용(숫자만 입력)"
              onChange={(e) => setCost(e.target.value)}
            />

            <Input
              type="text"
              value={people}
              placeholder="참여 인원(최대 30명)"
              onChange={(e) => setPeople(e.target.value)}
            />

            <StyledTextArea
              value={detail}
              placeholder="상세 내용"
              onChange={(e) => setDetail(e.target.value)}
            />

            {selectedOption === "lesson" && (
              <>
                {/* 이미지 업로드 필드 (선택) */}
                <Input
                  type="file"
                  name="file"
                  onChange={handleFileInputChange}
                />
                <br />
                <AdButton type="button" onClick={() => setModalOpen(true)}>
                  광고 등록 (선택 사항)
                </AdButton>
                <br />
              </>
            )}
            <ButtonBox>
              <SubmitButton onClick={handleSubmit}>등록 요청</SubmitButton>
              <CancleButton type="submit">취소</CancleButton>
            </ButtonBox>
          </Form>
        </InputBox>
        <Modal
          open={modalOpen}
          close={closeModal}
          confirm={confirmModal}
          type={true}
          header="광고 등록"
        >
          {/* 내용 작성 부분 - 이미지, 기간, 금액, 이름, 전화번호*/}
          <ModalBox>
            <SectionTitle>광고 정보 기재</SectionTitle>
            <AdBox>
              <Labelbox>
                <label htmlFor="image">이미지</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={inputModal}
                />
              </Labelbox>
              <Labelbox>
                <label htmlFor="period">게시 기간</label>
                <select
                  id="period"
                  name="period"
                  value={advertisement.period}
                  onChange={inputModal}
                >
                  <option value="">게시 기간 선택</option>
                  <option value="1일">1일</option>
                  <option value="7일">7일</option>
                  <option value="30일">30일</option>
                </select>
              </Labelbox>
              <Labelbox>
                <label htmlFor="fee"> 광고 금액</label>
                <select
                  id="fee"
                  name="fee"
                  value={advertisement.fee}
                  onChange={inputModal}
                >
                  <option value="">광고 금액 선택</option>
                  <option value="50000">5만원(1일)</option>
                  <option value="200000">20만원(7일)</option>
                  <option value="300000">30만원(30일)</option>
                </select>
              </Labelbox>
            </AdBox>
            <SectionTitle>사용자 정보 기재</SectionTitle>
            <UserBox>
              <Labelbox>
                <label htmlFor="userName">사용자 이름</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={advertisement.userName}
                  onChange={inputModal}
                />
              </Labelbox>
              <Labelbox>
                <label htmlFor="phoneNumber">전화 번호</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={advertisement.phoneNumber}
                  onChange={inputModal}
                />
              </Labelbox>
            </UserBox>
            <PaymentBox>
              <PaymentButton>결제하기</PaymentButton>
            </PaymentBox>
          </ModalBox>
        </Modal>
      </Container>
    </>
  );
};

export default PostSubmit;
