import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import MyPageAxiosApi from "../api/MyPageAxiosApi";
import { storage } from "../api/firebase";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import Edit from "../images/Edit.png";
import Setting from "../images/Setting.png";
import { Link } from "react-router-dom";
import SelectSports from "../component/interest/SelectSportsClon";
import SelectArea from "../component/interest/SelectAreaClon";
import {
  OptionBoardCom,
  SelectOptionBoardFooterCom,
  SelectOptionBoardCom,
  SelectOptionBoardHeaderComp,
} from "../component/interest/SelectAreaClon";
import SelectMBTI from "../component/MBTI/MBTI";
import LoginPageAxiosApi from "../api/LoginPageAxiosApi";

const Container = styled.div`
  border-radius: 8px;
  width: 768px;
  margin: 0px auto;
`;
const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;
const EditBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15%;
`;
const FooterBox = styled.div`
  height: 90px;
  background-color: white;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0px;
`;

const LogoImage = styled.img`
  cursor: pointer;
  width: 100px;
  margin: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 10px; */
`;

const UserInformation = styled.h2`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  font-size: 2em;
  color: #353535;
`;
const InterestCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Selected = styled.div`
  flex-direction: column;
  align-items: center;
  padding: 15px 40px;
  justify-content: center;
  font-size: 3em;
  color: #04bf8a;
  border: #04bf8a;
  border-radius: 30px;
`;

const UserImage = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  border-radius: 20px;
`;
const FieldEditTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IMGField = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
const EditNick = styled.div`
  color: #04bf8a;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  width: 100%;
  text-align: center;
  padding: 20px;
  font-size: 1.4em;
  border: 1px solid #f7f7f7;
  transition: height 0.5s ease; // 트랜지션 추가
`;
const InputIntroduce = styled.input`
  width: 100%;
  text-align: center;
  padding: 20px;
  font-size: 1.4em;
  border: 1px solid #f7f7f7;
  transition: height 0.5s ease; // 트랜지션 추가
`;
const Label = styled.label`
  color: #353535;
  display: block;
  /* margin: 20px 10px; */
  padding: 10px;
  width: 100%;
  background-color: #dfede9;
  font-weight: bold;
  font-size: 1.5em;
`;
const SubmitButton = styled.button`
  padding: 5px;
  background-color: #dfede9;
  width: 3em;
  margin-left: 1em;
  color: #353535;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2em;
  &:hover {
    background-color: #04bf8a;
  }
`;
const EX = styled.div`
  display: flex;
  flex-direction: column;
`;
const EditLogo = styled.img`
  width: 30px;
  height: 30px;
  justify-content: left;
  align-items: end;
`;
const EditLogoCon = styled.div`
  display: flex;
  justify-content: right;
`;
const EditBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
`;

const StyledLink = styled(Link)`
  margin: 0 30px;
`;
const Text = styled.div`
  color: white;
`;

const MyPageEdit = () => {
  const { email } = useParams();
  const [user, setUser] = useState("");
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editNickname, setEditNickname] = useState("");
  const [editIntroduce, setEditIntroduce] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [interest, setInterest] = useState([]);
  const [area, setArea] = useState([]);
  const [nickname, setNickname] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [isOpen, setIsOpen] = useState([]);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const userInfo = async () => {
      const rsp = await MyPageAxiosApi.userGetOne(localStorage.email);
      console.log("useEffect의 rsp data 확인 :", rsp.data);
      if (rsp.status === 200) {
        setUser(rsp.data);
        setUrl(rsp.data.image);
        setInterest(rsp.data.interestSports);
        setArea(rsp.data.interestArea);
      }
    };
    userInfo();

    // 로컬 스토리지에서 로그인한 사용자 정보를 가져옵니다.
    const loginUserEmail = localStorage.getItem("email");
    // 로그인한 사용자와 글쓴이가 같은지 비교
    if (loginUserEmail === email) {
      setIsCurrentUser(true);
    }
  }, [email]);

  const logoImage =
    "https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/logosmall.png?alt=media&token=5f1756d7-08ab-4930-a834-1c2d82e2c34d";
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };
  //입력 필드 변경 처리
  const handleChange = (e) => {
    setEditNickname(e.target.value);
  };
  const handleChangeIntro = (e) => {
    setEditIntroduce(e.target.value);
  };
  //MBTI 선택 부분
  const [selectedItem, setSelectedItem] = useState("");
  // MBTI 선택됐을 때 실행될 함수
  const handleSelectedItem = (item) => {
    console.log("부모 컴포넌트에서 선택된 mbti아이템:", item);
    // 선택된 아이템을 부모 컴포넌트의 상태로 설정
    setSelectedItem(item);
  };

  //선택 종목
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  //선택종목 실행함수
  const handleSelected = (selectedSports) => {
    console.log("부모 컴포넌트에서 선택된 스포츠 아이템 : ", selectedSports);

    //선택 아이템 부모 컴포넌트 상태로 설정
    setSelectedSports(selectedSports);
  };
  const handleSelectedArea = (selectedItems) => {
    console.log("부모 컴포넌트에서 선택된 지역 아이템 : ", selectedItems);
    setSelectedItems(selectedItems);
  };

  //회원정보 업데이트 Axios호출 . 회원정보 수정 '수정' 버튼
  const handleSubmit = async (e) => {
    const rsp = await MyPageAxiosApi.userUpdate(
      localStorage.email,
      editNickname,
      editIntroduce,
      url,
      selectedItem,
      selectedSports,
      selectedItems
    );
    if (rsp.status === 200) {
      setEditMode(false);
      setNickname(editNickname);
      setIntroduce(editIntroduce);
      const rsp = await MyPageAxiosApi.userGetOne(localStorage.email);
      console.log("회원정보 업데이트 rsp 확인 : ", rsp.data);
      if (rsp.status === 200) {
        setUser(rsp.data);
        setUrl(rsp.data.image);
        setInterest(rsp.data.interestSports);
        setArea(rsp.data.interestArea);
      }
    }
  };
  //handle clike 파일 업로드
  const handleUploadChange = async (e) => {
    try {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
      } else {
        console.log("파일 선택 취소");
      }
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file); //파일 업로드 후 기다리기
      console.log("파일 업로드 성공!!");
      // 업로드 후 이미지 URL 가져오기
      const uploadedUrl = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : ", uploadedUrl);
      setUrl(uploadedUrl); //미리보기 URL업데이트 (상태 업데이트)
    } catch (error) {
      console.error("Upload failed 파일 업로드 에러 :", error);
    }
  };
  const activityList = [
    "🏋️‍♀️헬스",
    "🏌️‍♂️골프",
    "🚲자전거",
    "⛰️등산",
    "⚽축구",
    "🏀농구",
    "⚾야구",
    "🏓탁구",
    "🎾테니스",
    "🏸배드민턴",
    "🏃‍♂️런닝",
    "🎳볼링",
  ];

  const mbtiList = [
    "ISTJ",
    "ISFJ",
    "INFJ",
    "INTJ",
    "ISTP",
    "ISFP",
    "INFP",
    "INTP",
    "ESTP",
    "ESFP",
    "ENFP",
    "ENTP",
    "ESTJ",
    "ESFJ",
    "ENFJ",
    "ENTJ",
  ];

  const activityAreaList = [
    "강남구",
    "강북구",
    "강동구",
    "강서구",
    "양천구",
    "구로구",
    "영등포구",
    "금천구",
    "동작구",
    "관악구",
    "서초구",
    "송파구",
    "마포구",
    "서대문구",
    "은평구",
    "종로구",
    "중구",
    "성동구",
    "용산구",
    "광진구",
    "중랑구",
    "동대문구",
    "성북구",
    "도봉구",
    "노원구",
  ];
  const mbtiValue = 1;
  const minValue = 1;
  const maxValue = 3;

  return (
    <Container>
      <HeaderBox>
        <LogoImage src={logoImage} alt="logo" onClick={goToHome} />
        <EditLogoCon>
          {!editMode && (
            <EditLogo
              onClick={() => {
                setEditMode(true);
                setIsOpen(!isOpen);
              }}
              src={Edit}
              alt="edit"
            />
          )}
          <StyledLink to="/Setting">
            <EditLogo src={Setting} alt="Setting" />
          </StyledLink>
        </EditLogoCon>
      </HeaderBox>

      <EditBox>
        <SelectOptionBoardHeaderComp isOpen={isOpen}>
          <Text>프로필 사진</Text>
        </SelectOptionBoardHeaderComp>
        <UserInfo>
          <Text>
            <UserInformation>
              <UserImage
                src={url || "http://via.placeholder.com/160"}
                alt="User"
              />
            </UserInformation>
          </Text>
        </UserInfo>
        <SelectOptionBoardCom>
          {!editMode ? (
            <>
              <SelectOptionBoardFooterCom
                onClick={handleToggle}
              ></SelectOptionBoardFooterCom>
            </>
          ) : (
            <>
              <IMGField>
                <input type="file" name="file" onChange={handleUploadChange} />
                {/* <SendSubmitButton>전송</SendSubmitButton> */}
              </IMGField>
              <SelectOptionBoardFooterCom
                onClick={handleToggle}
              ></SelectOptionBoardFooterCom>
            </>
          )}
        </SelectOptionBoardCom>
        <EX>
          <SelectOptionBoardHeaderComp isOpen={isOpen}>
            <Text>닉네임</Text>
          </SelectOptionBoardHeaderComp>
          <SelectOptionBoardCom>
            <EditNick>
              {!editMode ? (
                <Text>
                  <UserInformation>{user.nickname}</UserInformation>
                  <SelectOptionBoardFooterCom
                    onClick={handleToggle}
                  ></SelectOptionBoardFooterCom>
                </Text>
              ) : (
                <OptionBoardCom isOpen={isOpen}>
                  <Input
                    type="text"
                    name="Nickname"
                    placeholder="닉네임을 입력하세요."
                    value={editNickname}
                    onChange={handleChange}
                  />
                  <SelectOptionBoardFooterCom onClick={handleToggle}>
                    {/* <UserNickname>{user.nickname}</UserNickname> */}
                  </SelectOptionBoardFooterCom>
                </OptionBoardCom>
              )}
            </EditNick>
          </SelectOptionBoardCom>
        </EX>
        <EX>
          <SelectOptionBoardHeaderComp isOpen={isOpen}>
            <Text>소개</Text>
          </SelectOptionBoardHeaderComp>
          <SelectOptionBoardCom>
            <EditNick>
              {!editMode ? (
                <Text>
                  <UserInformation>{user.introduce}</UserInformation>
                  <SelectOptionBoardFooterCom
                    onClick={handleToggle}
                  ></SelectOptionBoardFooterCom>
                </Text>
              ) : (
                <OptionBoardCom isOpen={isOpen}>
                  <InputIntroduce
                    type="text"
                    name="Introduce"
                    placeholder="소개글을 입력하세요."
                    value={editIntroduce}
                    onChange={handleChangeIntro}
                  />
                  <SelectOptionBoardFooterCom onClick={handleToggle}>
                    {/* <UserNickname>{user.nickname}</UserNickname> */}
                  </SelectOptionBoardFooterCom>
                </OptionBoardCom>
              )}
            </EditNick>
          </SelectOptionBoardCom>
        </EX>
        <EX>
          <SelectOptionBoardHeaderComp isOpen={isOpen}>
            <Text>관심 지역</Text>
          </SelectOptionBoardHeaderComp>
          <FieldEditTitle>
            <UserContainer>
              <InterestCon>
                {!editMode ? (
                  <>
                    {area &&
                      area.map((areaItem, index) => (
                        <Text>
                          <Selected key={index} value={areaItem}>
                            {areaItem}
                          </Selected>
                        </Text>
                      ))}
                    <SelectOptionBoardFooterCom
                      onClick={handleToggle}
                    ></SelectOptionBoardFooterCom>
                  </>
                ) : (
                  <OptionBoardCom>
                    <SelectArea
                      options={activityAreaList}
                      min={minValue}
                      max={maxValue}
                      text={`최소 ${minValue}개 최대 ${maxValue}개 선택해주세요.`}
                      handleSelected={handleSelectedArea}
                    />
                    <SelectOptionBoardFooterCom
                      onClick={handleToggle}
                    ></SelectOptionBoardFooterCom>
                  </OptionBoardCom>
                )}
              </InterestCon>
            </UserContainer>
          </FieldEditTitle>
        </EX>
        <FieldEditTitle>
          <SelectOptionBoardHeaderComp isOpen={isOpen}>
            <Text>관심 운동</Text>
          </SelectOptionBoardHeaderComp>
        </FieldEditTitle>
        <UserContainer>
          <InterestCon>
            {!editMode ? (
              <>
                {interest &&
                  interest.map((interestItem, index) => (
                    <Text>
                      <Selected key={index} value={interestItem}>
                        {interestItem}
                      </Selected>
                    </Text>
                  ))}
                <SelectOptionBoardFooterCom
                  onClick={handleToggle}
                ></SelectOptionBoardFooterCom>
              </>
            ) : (
              <SelectSports
                options={activityList}
                min={minValue}
                max={maxValue}
                text={`최소 ${minValue}개 최대 ${maxValue}개 선택해주세요.`}
                handleSelected={handleSelected}
              />
            )}
          </InterestCon>
        </UserContainer>
        <FieldEditTitle>
          <SelectOptionBoardHeaderComp isOpen={isOpen}>
            <Text>MBTI</Text>
          </SelectOptionBoardHeaderComp>
        </FieldEditTitle>
        <UserContainer>
          <>
            {!editMode ? (
              <Selected>{user.mbti}</Selected>
            ) : (
              <SelectMBTI
                options={mbtiList}
                max={mbtiValue}
                text={`MBTI를 선택해주세요.`}
                handleSelectedItem={handleSelectedItem} // 함수 전달
              />
            )}
          </>
        </UserContainer>
        {!editMode ? (
          <SelectOptionBoardFooterCom
            onClick={handleToggle}
          ></SelectOptionBoardFooterCom>
        ) : (
          <OptionBoardCom isOpen={isOpen}>
            <SelectOptionBoardFooterCom
              onClick={handleToggle}
            ></SelectOptionBoardFooterCom>
            <EditBtn>
              <SubmitButton onClick={handleSubmit}>수정</SubmitButton>
              <SubmitButton onClick={() => setEditMode(false)}>
                취소
              </SubmitButton>
            </EditBtn>
          </OptionBoardCom>
        )}
      </EditBox>
      <FooterBox>
        <Footer />
      </FooterBox>
    </Container>
  );
};

export default MyPageEdit;
