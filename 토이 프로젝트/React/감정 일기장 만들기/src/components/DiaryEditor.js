import { useContext, useRef, useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { DiaryDispatchContext } from "../App"

import MyButton from "./MyButton"
import MyHeader from "./MyHeader"
import EmotionItem from "./EmotionItem"

import { getStringDate } from "../util/date"
import { emotionList } from "../util/emotion"
// 일기작성 & 수정 페이지에 공통으로 들어간다.


const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const DiaryEditor = ({ isEdit, originData }) => {
  // console.log(getStringDate(new Date()))
  
  const contentRef = useRef(null)
  const [content, setContent] = useState("");
  // 선택한 감정 저장 - 기본값 3 (그럭저럭)
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState("");

  // const history = useHistory();
  // onCreate, onEdit, onRemove 함수 불러오기
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  // 클릭하면 감정 상태 변화
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  },[]);

  const navigate = useNavigate()

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      // 삭제되면 홈으로 이동
      navigate('/', { replace : true })
    }
  };

  // 작성 완료 버튼
  const handleSubmit = () => {
    // 글 안썼으면 포커스
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        // 작성하기면
        onCreate(date, content, emotion);
      } else {
        // 수정하기면
        onEdit(originData.id, date, content, emotion);
      }
      navigate('/', { replace : true })
    }
  };

  // isEdit, originData 값이 바뀌면 수행하는데 isEdit = true일 때만 수행 
  useEffect(() => {
    if (isEdit) {
      // 입력되어 있던 값들이 들어온다.
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setContent(originData.content);
      setEmotion(originData.emotion);
    } else {
      setDate(getStringDate(new Date()));
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        // isEdit = true 이면 일기 수정하기
        headText={isEdit ? "일기 수정하기" : "새로운 일기 쓰기"}
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            onClick={() => navigate(-1)}
          />
        }
        rightChild={
          // isEdit = true 이면 일기 수정하기
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        {/* 날짜 */}
        <section>
          <h4>오늘은 언제인가요?</h4>

          <div className="input_box">
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input_date"
              type="date"
            />
          </div>
        </section>

        {/* 감정 */}
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                // 선택된 값과 같다면 true
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>

        {/* 오늘의 일기 */}
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_warpper">
            <textarea
              placeholder={"오늘은 어땠나요?"}
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>

        {/* 취소, 작성 버튼 */}
        <section>
          <div className="control_box">
            <MyButton
              text={"취소하기"}
              onClick={() => navigate(-1)}
            />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
export default DiaryEditor;