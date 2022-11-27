// 이메일 형식 검사
function validateEmail(email) {
  // 이메일 형식 정규표현식
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export { validateEmail };

// 비밀번호 형식 검사
function validatePassword(password) {
  // 비밀번호 형식 정규표현식
    let re = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,}$/;
    return re.test(String(password).toLowerCase());
  }
export { validatePassword }

// function validatePassword(password) {
//   let re = /^(?=.*[a-zA-z](?=.*[0-9])(?=.*[$~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
//   return re.test(String(password).toLowerCase());
// }

// export { validatePassword };