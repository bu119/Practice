import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";
import BarChart from "../components/BarChart";

const Home = () => {
  // 일기 리스트
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  // 마지막날 저장 // 추가
  const [CurLastDate, setCurLastDate] = useState('');

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = '감정 일기장';
  }, []);

  useEffect(() => {
    // 일기가 없을 때는 할 필요없다.
    if (diaryList.length >= 1) {
      // 달의 첫날 (1일) (년, 월, 일)
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      // 달의 마지막 날 (날, 시, 분, 초)
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      // 해당 달에 작성된 일기 데이터
      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );

      // 월의 마지막 날을 props로 차트에 넘기기 위해 // 추가
      const lastDate = new Date(lastDay)
      setCurLastDate(lastDate.getDate())

    }
  }, [diaryList, curDate]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  // 달력 선택 추가
  const selectMonth = (date) => {
    const year = date.slice(0, 4)
    const month = date.slice(5, 7)
    setCurDate(new Date(parseInt(year), parseInt(month) - 1, 1))
  }

  return (
    <div>
      <MyHeader
        headText={headText}
        headSelectMonth={
          <input
            onChange={(e) => selectMonth(e.target.value)}
            className="input_month"
            type="month"
          />
        }
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <BarChart diaryList={data} lastDay={CurLastDate}/>
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
