import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { DiaryStateContext } from "../App";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Diary = () => {

  // use 키워드 react hooks 에서 많이 쓰임
  // react 가 제공하는 react hooks는 아니지만
  // 라이브러리의 기능을 더 편하게 해주는 사용자 정의 Hook을 커스텀 hooks라고 부른다.
  // useParams를 이용하면 전달받은 Path Variable들을 모아서 객체로 받을 수 있다.
  const {id} = useParams()
  // console.log(id)
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate()

  // 찾은 데이터 저장
  const [data, setData] = useState();
  
  // 페이지 title 변경
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  }, []);

  useEffect(() => {
    // 일기가 1개이상 있을 때 실행
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

      if (targetDiary) {
        // 일기가 존재할 때 data에 저장
        setData(targetDiary);
      } else {
        // 일기가 없을 때
        alert("없는 일기입니다.");
        navigate('/', {replace: true})
      }
    }
  }, [id, diaryList]);


  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    // const date = getStringDate(new Date(data.date));

    const curEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion));

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton
              text={"< 뒤로가기"}
              onClick={() => {navigate(-1)}}
            />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => {navigate(`/edit/${data.id}`)}}
            />
          }
        />
        {/* contents */}
        <article>
          {/* 감정 */}
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img
                alt={`emotion${data.emotion}`}
                src={
                  process.env.PUBLIC_URL + `/assets/emotion${data.emotion}.png`
                }
              />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          {/* 일기 */}
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary