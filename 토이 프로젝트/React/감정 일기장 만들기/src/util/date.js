// 새 일기쓰기 현재 날짜 자동 설정

// const getStringDate = (date) => {
//   // toISOString()은 YYYY-MM-DDTHH:mmss.sssZ 형태로 반환한다.
//   // YYYY-MM-DD 까지 슬라이스로 잘라준다.
//   return date.toISOString().slice(0, 10);
// };

export const getStringDate = (date) => {

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};