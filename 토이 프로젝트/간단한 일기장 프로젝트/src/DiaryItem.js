import React, { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";


const DiaryItem = ({
  id,
  author,
  content,
  emotion,
  password,
  created_date
}) => {

  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  // true/flase 값을 가지며 현재 수정 중 인지 아닌지 표시
  const [isEdit, setIsEdit] = useState(false);
  // isEdit의 값을 반전 시키는 함수 (true -> false, false -> true)
  const toggleIsEdit = () => setIsEdit(!isEdit)

  // 수정하기 ------ 비밀번호 추가 --------------------------
  const checkPassword = () => {

    if (localPassword === password) {
      toggleIsEdit()
      setLocalPassword("")
    } else {
      localPasswordInput.current.focus()
    }
  }
  //----------------------------------------------------------


  // 수정 폼의 데이터
  const [localContent, setLocalContent] = useState(content);
  const [localPassword, setLocalPassword] = useState("");

  const localContentInput = useRef();
  const localPasswordInput = useRef();

  // 일기 삭제 --------------------------------- 추가 -----------
  const handleRemove = () => {
    if (localPassword === password) {
      // window.confirm : 대화상자 - 확인/취소
      if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
        onRemove(id);
      }
    } else {
      localPasswordInput.current.focus()
    }
  };
  
  // -------------------------------------------------------------

  // 수정 취소
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };
  // 수정 완료
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };


  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author_info">
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit? (
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          ) : (
            content
          )}
      </div>
      {isEdit? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={checkPassword}>수정하기</button>

          <input
            type='password'
            name="checkPassword"
            placeholder="비밀번호를 입력하세요."
            ref={localPasswordInput}
            value={localPassword}
            onChange={(e) => setLocalPassword(e.target.value)}
          />
          
        </>
      )}
    </div>
    // created_date를 인간이 알아볼 수 있는 시간으로 바꾸기 -> new Date(created_date).toLocaleString()
  );
};

export default React.memo(DiaryItem);
