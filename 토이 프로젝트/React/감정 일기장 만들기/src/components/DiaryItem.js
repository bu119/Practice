import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {

  // 작성한 경로로 페이지 이동
  const navigate = useNavigate();

  // 시간 데이터를 알아보기 쉬운 년, 월, 일로 변경
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  // 일기 조회 페이지로 이동
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  // 일기 수정 페이지로 이동
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };


  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";
  return (
    <div className={"DiaryItem"}>
  
      <div
        onClick={goDetail}
        // 스타일링 위해 감정에 따라 동적으로 클래스 네임 지정
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `/assets/emotion${emotion}.png`} />
      </div>

      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
