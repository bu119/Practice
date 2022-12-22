import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";


// 정렬 옵션
const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" }
];

// 감정 옵션
const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" }
];

// 옵션 생성
// React.memo로 감싸면 전달받는 props의 값이 바뀌지 않으면 렌더링이 일어나지 않게 메모이제이션 해준다.(최적화)
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  // 리렌더링 확인
  // useEffect(() => {
  //   console.log("ControlMenu")
  // })
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

// props로 다이어리 리스트를 받는다.
const DiaryList = ({ diaryList }) => {
  // 작성한 경로로 페이지 이동
  const navigate = useNavigate();
  // 현재 정렬상태 저장
  const [sortType, setSortType] = useState("latest");
  // 현재 감정상태 저장
  const [filter, setFilter] = useState("all");
  
  // 최신&오래 정렬된 리스트 반환
  const getProcessedDiaryList = () => {

    // 좋은감정, 안좋은 감정 필터링 함수
    const filterCallback = (item) => {
      if (filter === "good") {
        // parseInt: 문자열을 숫자로 형변환
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    // 날짜 값을 비교하여 정렬
    const compare = (a, b) => {
      if (sortType === "latest") {
        // parseInt: 문자열을 숫자로 형변환
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    // 배열을 문자열(제이슨)로 반환하고 다시 배열로 복호화
    // 원본 배열의 값을 변경없이 저장하기위해 수행
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 감정이 전부다 이면 / 아니면 - 감정 필터링 함수로 들어간다.(1,2,3 좋은감정, 4,5 안좋은 감정 보이기)
    // 아니면 - 감정 필터링 함수로 들어가서 true인 애들만 보인다.
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallback(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (
        // <div key={it.id}>
        //   {it.content} {it.emotion}
        // </div>
        <DiaryItem key={it.id} {...it} /> // <- 변경
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: []
};

export default DiaryList;
