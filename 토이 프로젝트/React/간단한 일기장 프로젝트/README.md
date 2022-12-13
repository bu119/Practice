# 간단한 일기장 프로젝트

한입 크기로 잘라 먹는 리액트(React.js) : 기초부터 실전까지



##  전체 구성

<img width="677" alt="화면 캡처 2022-12-13 180109" src="https://user-images.githubusercontent.com/109335452/207273545-1f0c9221-7593-4546-9cb9-c305913a7537.png">



## 일기 생성

<img width="590" alt="1  일기 생성" src="https://user-images.githubusercontent.com/109335452/207281462-231bd5e4-f714-4725-900d-debb3cbb483d.png">



## 일기 수정 & 삭제

<img width="669" alt="2  일기 수정 시도" src="https://user-images.githubusercontent.com/109335452/207281468-be5982b2-3953-4882-9101-c89a53fc45a2.png">



## 추가 기능

1. 일기를 생성할 때 4자리 이상의 비밀번호를 입력받는다.

   - API로 호출 받은 데이터는 비밀번호 `0000`를 가진다.

2. 수정, 삭제 시 비밀번호를 입력해야 변경가능하다.

   - 비밀번호가 틀릴 경우 비밀번호 입력창에 focus 된다.
   - 비밀번호가 일치할 경우 원하는 작업이 시행된다.

   

## Code

```react
// DiaryEditor.js

import React, { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {

  const { onCreate } = useContext(DiaryDispatchContext);

  const authorInput = useRef();
  const contentInput = useRef();
  const passwordInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
    password:"",
    
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
      
    ...

    if (state.password.length < 4) {
      passwordInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion, state.password)

    alert("저장 성공!");

    setState({
      author: "",
      content: "",
      emotion: 1,
      password:'',
    });
  };


  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      
          ...
          
      <div>
        <span>비밀번호 : </span>
        <input
          id='password'
          ref={passwordInput}
          type='password'
          name="password"
          value={state.password}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};
export default React.memo(DiaryEditor);

```

```react
// DiaryItem.js

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

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit)

  // 비밀번호 확인 함수 추가 -----------------------------------------
  const checkPassword = () => {

    if (localPassword === password) {
      toggleIsEdit()
      setLocalPassword("")
    } else {
      localPasswordInput.current.focus()
    }
  }

  // 비밀번호 데이터 추가 -------------------------------------------
  const [localContent, setLocalContent] = useState(content);
  const [localPassword, setLocalPassword] = useState("");

  const localContentInput = useRef();
  const localPasswordInput = useRef();

  // 일기 삭제시 비밀번호 확인 추가 ----------------------------------
  const handleRemove = () => {
    if (localPassword === password) {
   
      if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
        onRemove(id);
      }
    } else {
      localPasswordInput.current.focus()
    }
  };
	
    ...

  return (
    <div className="DiaryItem">
      <div className="info">
          
        ... 
          
      </div>
      <div className="content">
          
        ...
          
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
  );
};

export default React.memo(DiaryItem);
```

