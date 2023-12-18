import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SubHeader from "../layout/SubHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PostAxiosApi from "../api/PostSubmitAxiosApi";

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

const InputContainer = styled.div`
  position: relative;
`;

const FixedText = styled.span`
  position: absolute;
  right: 20px; /* 오른쪽에 위치시킬 거리 조절 */
  top: 50%; /* 세로 중앙 정렬을 위해 50%로 설정 */
  transform: translateY(-50%); /* 세로 중앙 정렬을 위한 보정 */
  color: var(--BLACK); /* 텍스트 색상 설정 */
  opacity: ${(props) => (props.show ? 1 : 1)}; /* 항상 투명도를 1로 유지 */
  transition: opacity 0.2s ease; /* 부드러운 투명도 변화를 위한 트랜지션 설정 */
`;

const PostSubmit = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("normal");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [cost, setCost] = useState("");
  const [people, setPeople] = useState("");
  const [detail, setDetail] = useState("");
  // 레슨 일정 등록에 필요한 state 변수들
  const [image, setImage] = useState(null);
  const [advertisement, setAdvertisement] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const CustomInput = ({ value, placeholder, onChange }) => {
    const [isInputEmpty, setIsInputEmpty] = useState(!value);

    const handleInputChange = (e) => {
      onChange(e);
      setIsInputEmpty(!e.target.value);
    };

    return (
      <InputContainer>
        <Input
          type="text"
          value={value}
          placeholder={isInputEmpty ? "" : placeholder}
          onChange={handleInputChange}
        />
        <FixedText show={isInputEmpty}>명</FixedText>
      </InputContainer>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. date 와 time을 Date 객체로 변환
    const koreaDate = new Date(date);
    const koreaTime = new Date(time);

    // 2. 현재 시간을 UTC(협정 시계) 시간으로 계산(DB 저장시 UTC 기준으로 저장 되기 때문) = 현재 로컬 시간대와 UTC와의 차이를 밀리초로 표현한 값.
    // getTimezoneOffset() : 현재 실행 중인 시스템의 로컬 시간과 UTC(협정 시계)와의 시간 차이를 분단위로 반환. 한국은 UTC보다 9시간 빠르므로 -540이 반환.
    // * 60 은 분을 초로 변환, 1000 곱하면 밀리초로 변환. (-540 * 60 * 1000 = -32400000 밀리초)
    const utcDate = new Date(
      koreaDate.getTime() - koreaDate.getTimezoneOffset() * 60 * 1000
    );
    const utcTime = new Date(
      koreaTime.getTime() - koreaTime.getTimezoneOffset() * 60 * 1000
    );
    // 3. UTC to KST (UTC + 9시간 = 한국 시간) = 한국 시간이 UTC보다 9시간 빠르게 밀리초 단위로 설정한 값.
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

    const krDate = new Date(utcDate.getTime() + KR_TIME_DIFF); // 한국 날짜로 변환.
    const krTime = new Date(utcTime); // 한국 시간으로 변환(화면 입력 시간 그대로 저장)

    // 여기에서 등록된 일정을 서버에 보낼 수 있음 {} 객체 형태로 묶어서 전달
    const rsp = await PostAxiosApi.postSubmit({
      title,
      place,
      people,
      cost,
      detail,
      date: krDate,
      time: krTime,
    });

    console.log("Response:", rsp);
    if (rsp.status === 200) {
      alert("등록 요청 완료");
      navigate("/postlist"); // 등록 성공시 게시글 목록 페이지로 이동.
      // navigate("/postlist") 등록 완료 되면 게시글 목록으로 ?
    } else {
      alert("등록 실패");
    }
    console.log({
      title,
      category,
      date: krDate,
      time: krTime,
      place,
      cost,
      people,
      detail,
      image,
      advertisement,
      isModalOpen,
    });
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

            <Input
              type="text"
              value={category}
              placeholder="종목"
              onChange={(e) => setCategory(e.target.value)}
            />
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

            <Input
              type="text"
              value={place}
              placeholder="장소"
              onChange={(e) => setPlace(e.target.value)}
            />

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
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <br />
                <AdButton type="button" onClick={() => setIsModalOpen(true)}>
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
      </Container>
    </>
  );
};

export default PostSubmit;
