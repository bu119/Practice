import React, { useMemo, useEffect, useRef, useCallback, useReducer } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
      // 새로운 state
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ?
        { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {

  // 전체 일기 데이터 관리 State
  // 일기가 없는 상태로 시작 (빈 배열 [])
  // const [data, setData] = useState([])

  // useReducer
  const [data, dispatch] = useReducer(reducer, []);


  // id는 0번 부터 시작
  const dataId = useRef(0)

  // API 호출 (async - 비동기 함수로 바꿈)
  const getData = async() => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json())
    
    // console.log(res)
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        // API 데이터에 없으므로 1~5 랜덤으로 넣기
        emotion: Math.floor(Math.random() * 5) + 1,
        password: "0000",
        created_date: new Date().getTime() + 1,
        id: dataId.current++
      };
    });

    dispatch({ type: "INIT", data: initData });
  }

  // 마운트 되자마자 API 호출
  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion, password) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, password, id: dataId.current }
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({
      type: "EDIT",
      targetId,
      newContent
    });
  }, []);

  // 기분 개수 표시
  // Memoization 하고 싶은 함수 useMemo로 감싸기
  // useMemo로 감싸면 getDiaryAnalysis 함수가 함수에서 값으로 변한다.
  // [data.length]가 변화할 때만 리렌더한다.
  const getDiaryAnalysis = useMemo(() => {
    // console.log("일기 분석 시작");
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수 : {goodCount}</div>
          <div>기분 나쁜 일기 개수 : {badCount}</div>
          <div>기분 좋은 일기 비율 : {goodRatio}%</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
