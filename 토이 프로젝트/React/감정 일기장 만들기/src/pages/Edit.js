import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";


const Edit = () => {

  const [originData, setOriginData] = useState()

  // useNavigate는 페이지를 이동시킬 수 있는 함수를 반환해준다.
  // navigate의 인자로 경로를 작성한다. (ex. 로그인 안한 사람 강제로 로그인 페이지로 보내기)
  // link tag를 클릭안했을 때도 의도적으로 페이지를 바꿀 수 있다.
  const navigate = useNavigate()
  const { id } = useParams()
  // console.log(id)

  // 데이터 불러오기
  const diaryList = useContext(DiaryStateContext);
  // console.log(diaryList)

  // 페이지 title 변경
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  // id와 일치하는 일기 꺼내기
  useEffect(() => {
    // 일기 데이터 1개라도 있으면 찾아서 꺼내기
    if (diaryList.length >= 1) {
      // parseInt - 숫자로 형변환
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));
      // console.log(targetDiary)

      // 해당 일기가 있을 때, 없을 때
      if (targetDiary) {
        // originData 값으로 초기화
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate('/', { replace : true })
      }
    }
  // id, diaryList 변할때 꺼내오기
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
}

export default Edit