import React, { useState } from "react";
import styled from "styled-components";
import SubHeader from "../layout/SubHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

const PostSubmit = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 등록된 일정을 서버에 보낼 수 있음
    console.log({
      title,
      category,
      date,
      time,
      place,
      cost,
      people,
      detail,
      image,
      advertisement,
      isModalOpen,
    });
    // TODO: 서버로 데이터 전송 및 저장 로직 작성
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
                onChange={(newDate) => setDate(newDate)}
                customInput={<StyledInput />}
              />
            </DateBox>

            <Input
              type="text"
              value={time}
              placeholder="시간"
              onChange={(e) => setTime(e.target.value)}
            />

            <Input
              type="text"
              value={place}
              placeholder="장소"
              onChange={(e) => setPlace(e.target.value)}
            />

            <Input
              type="text"
              value={cost}
              placeholder="비용"
              onChange={(e) => setCost(e.target.value)}
            />

            <Input
              type="text"
              value={people}
              placeholder="참여 인원"
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
              <SubmitButton type="submit">등록 요청</SubmitButton>
              <CancleButton type="submit">취소</CancleButton>
            </ButtonBox>
          </Form>
        </InputBox>
      </Container>
    </>
  );
};

export default PostSubmit;
