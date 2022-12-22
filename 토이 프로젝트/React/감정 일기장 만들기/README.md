# 감정 일기장 만들기

한입 크기로 잘라 먹는 리액트(React.js) : 기초부터 실전까지

- react



## < 배포 >

[감정 일기장](https://bu-diary-project.web.app/)



## * 전체 구성

<img width="560" alt="홈 페이지" src="https://user-images.githubusercontent.com/109335452/209049739-93e35456-2a81-418c-a247-c85062fc07fd.png">

## * 일기 생성 페이지

<img width="554" alt="생성 페이지" src="https://user-images.githubusercontent.com/109335452/209049782-8cd430f3-b052-4792-b8b7-adfccfd2e762.png">

## * 일기 수정 페이지

<img width="558" alt="수정 페이지" src="https://user-images.githubusercontent.com/109335452/209049805-312ab146-1aa1-4e89-b605-90cc7b0706d3.png">

---

## 추가 기능

#### 1. 달력을 이용하여 `<`, `>` 버튼 사용 이외에 날짜 선택이 가능하다.

<img width="566" alt="달력으로 날짜 선택" src="https://user-images.githubusercontent.com/109335452/209049921-03a68208-2f0e-4922-b173-83d13bed14d3.png">

#### 2. 막대 그래프를 추가하여 해당 월의 기분 변화 파악할 수 있다.

<img width="558" alt="그래프" src="https://user-images.githubusercontent.com/109335452/209049950-808feb67-bdb7-43a9-acf4-4e6a40fe9d82.png">

## Code

```javascript
// BarChart.js

import React from "react";

import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";


const BarChart = ({ diaryList, month, lastDay }) => {
  // console.log(diaryList)
  
  // 1일부터 마지막 날까지 배열
  const alldayList = [];
  for (let i = 1; i <= parseInt(lastDay); ++i) {
    alldayList.push(`${i}일`);
  }

  // 감정별로 배열만들기
  const emotionBest = diaryList.filter((e)=>e.emotion === 1)
  const emotionGood = diaryList.filter((e)=>e.emotion === 2)
  const emotionSoso = diaryList.filter((e)=>e.emotion === 3)
  const emotionBad = diaryList.filter((e)=>e.emotion === 4)
  const emotionWorst = diaryList.filter((e)=>e.emotion === 5)

  // 감정별로 그래프에 적용할 x,y 배열 만들기
  const emotionBestList = emotionBest.map((e) => {
    const day = new Date(e.date)
    return {'x':`${day.getDate()}일`,'y':6-e.emotion}
  })
  const emotionGoodList = emotionGood.map((e) => {
    const day = new Date(e.date)
    return {'x':`${day.getDate()}일`,'y':6-e.emotion}
  })
  const emotionSosoList = emotionSoso.map((e) => {
    const day = new Date(e.date)
    return {'x':`${day.getDate()}일`,'y':6-e.emotion}
  })
  const emotionBadList = emotionBad.map((e) => {
    const day = new Date(e.date)
    return {'x':`${day.getDate()}일`,'y':6-e.emotion}
  })
  const emotionWorstList = emotionWorst.map((e) => {
    const day = new Date(e.date)
    return {'x':`${day.getDate()}일`,'y':6-e.emotion}
  })

  const options = {
    legend: {
        display: false, // label 숨기기
    },
    title: {
      display: true,		// 타이틀 
      text: "Total",
      fontSize: 25,
    },
    scales: {
      // x축값 누적
      x:{
        stacked:true
      },
      y: {
        suggestedMin: 0,
        suggestedMax: 5
    }
    },
    maintainAspectRatio: false // false로 설정 시 사용자 정의 크기에 따라 그래프 크기가 결정됨.
  }

  const emotioBackColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
  ]
  const emotioBorderColor = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
  ]

  const chartData = {
    labels: alldayList,
    datasets: [
      {
        label: '완전 좋음',
        backgroundColor: emotioBackColor[4],
        borderColor: emotioBorderColor[4],
        borderWidth: 1,
        hoverBackgroundColor: emotioBackColor[4],
        hoverBorderColor: emotioBorderColor[4],
        data: emotionBestList
      },
      {
        label: '좋음',
        backgroundColor: emotioBackColor[3],
        borderColor: emotioBorderColor[3],
        borderWidth: 1,
        hoverBackgroundColor: emotioBackColor[3],
        hoverBorderColor: emotioBorderColor[3],
        data: emotionGoodList
      },
      {
        label: '그럭저럭',
        backgroundColor: emotioBackColor[2],
        borderColor: emotioBorderColor[2],
        borderWidth: 1,
        hoverBackgroundColor: emotioBackColor[2],
        hoverBorderColor: emotioBorderColor[2],
        data: emotionSosoList
      },
      {
        label: '나쁨',
        backgroundColor: emotioBackColor[1],
        borderColor: emotioBorderColor[1],
        borderWidth: 1,
        hoverBackgroundColor: emotioBackColor[1],
        hoverBorderColor: emotioBorderColor[1],
        data: emotionBadList
      },
      {
        label: '끔찍함',
        backgroundColor: emotioBackColor[0],
        borderColor: emotioBorderColor[0],
        borderWidth: 1,
        hoverBackgroundColor: emotioBackColor[0],
        hoverBorderColor: emotioBorderColor[0],
        data: emotionWorstList
      },

    ]
  }; 

	return (
    <div className="bar_chart">
      <Bar 
        data={chartData}
        height={200}
        options={options}
      />
    </div>
  );
}

export default React.memo(BarChart);
```

