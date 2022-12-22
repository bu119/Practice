import React, { useEffect, useReducer, useRef } from 'react';

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Diary from './pages/Diary'

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      // const newItem = {
      //   ...action.data
      // }
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(newState))
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {

  // LocalStorage 실습

  // 저장하기
  // useEffect(()=> {
  //   // LocalStorage에 아이템을 (key, value) 로 저장하기
  //   localStorage.setItem('item1', 10)
  //   localStorage.setItem('item2', "20")
  //   // JSON.stringify()를 이용하여 객체를 문자열 형태로 저장 가능
  //   localStorage.setItem('item3', JSON.stringify({value:30}))
  // }, [])

  // LocalStorage에 저장된 값 불러오기
  // LocalStorage에 문자열로 저장된다.
  // 문자열로 가져와진다.
  // useEffect(()=> {
  //   const item1 = localStorage.getItem("item1")
  //   const item2 = localStorage.getItem("item2")
  //   // 객체를 다시 객체로 변환시켜 나오기
  //   const item3 = JSON.parse(localStorage.getItem("item3"))
  //   console.log({item1, item2, item3})
  // }, [])

  const [data, dispatch] = useReducer(reducer, [])

  // LocalStorage 값 불러와 data에 저장하기
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    // 데이터가 있으면
    if (localData) {
      // JSON.parse - 데이터 복원
      // 내림차순으로 정렬
      const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));

      // 일기가 존재할 때만 수행 (없으면 id값이 없으므로 에러 발생)
      if (diaryList.length >= 1) {
        // 다음 인덱스 부터 저장하기위해 마지막 인덱스 찾기
        dataId.current = parseInt(diaryList[0].id) + 1;
        // 초기값으로 설정
        dispatch({ type: "INIT", data: diaryList });
      }

    }
  }, []);

  // 현재시간 데이터 값
  // console.log(new Date().getTime())
  
  const dataId = useRef(0)
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      }
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove
        }}
      >
        <BrowserRouter>
          <div className="App">
            
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/new' element={<New/>}/>
              <Route path='/edit/:id' element={<Edit/>}/>
              {/* <Route path='/diary/' element={<Diary/>}/> */}
              <Route path='/diary/:id' element={<Diary/>}/>
            </Routes>

          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>

  );
}

export default App;
