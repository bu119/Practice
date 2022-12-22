<template>
  <div class="form-signup">
    <form @submit.prevent="signUp" class="margin-top: 40%; text-center">
      <h1 class="h3 mb-3 fw-normal">회원가입</h1>

      <div class="form-floating">
        <input type="text" class="form-control" id="username" v-model="username" placeholder="ID">
        <label for="username" style="color: black;">아이디</label>
      </div>

      <div class="form-floating">
        <input type="email" class="form-control" id="email" v-model="email" placeholder="ssafy@example.com">
        <label for="email" style="color: black;">이메일</label>
        <!-- <p class="warning" v-if="!isEmailValid && email">
          이메일 형식 및 입력란 공백 확인
          이메일 주소를 정확히 입력해주세요.
        </p> -->
      </div>  

      <div class="form-floating">
        <input type="password" class="form-control" id="password1" v-model="password1" placeholder="password">
        <label for="password1" style="color: black;">비밀번호</label>
        <!-- 비밀번호 형식 및 입력란 공백 확인 -->
        <!-- <p class="warning" v-if="!isPasswordValid && password1">
          영문, 숫자, 특수문자를 조합하여 8자 이상 입력해주세요.
        </p> -->
      </div>
      <p>영문, 숫자, 특수문자를 조합하여 8자 이상 입력해주세요.</p>
      
      <div class="form-floating">
        <input type="password" class="form-control" id="password2" v-model="password2" placeholder="password confirmation">
        <label for="password2" style="color: black;">비밀번호 확인</label>
      </div>

      <br>
      <h4>관심장르를 골라주세요</h4>
      <div class="interested-genre-rank">
        <span>1순위</span>
        <span>2순위</span>
        <span>3순위</span>
      </div>
      <div class="pick-genre">
        <form>
          <select v-model="interested_genre1" id="disabledSelect" class="form-select" style="">
            <option value="Action">Action</option>
            <option value="Animation">Animation</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Documentary">Documentary</option>
            <option value="Family">Family</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="SF">SF</option>
            <option value="Thriller">Thriller</option>
            <option value="War">War</option>
          </select>
        </form>
        <form>
          <select v-model="interested_genre2" id="disabledSelect" class="form-select">
            <option value="Action">Action</option>
            <option value="Animation">Animation</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Documentary">Documentary</option>
            <option value="Family">Family</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="SF">SF</option>
            <option value="Thriller">Thriller</option>
            <option value="War">War</option>
          </select>
        </form>
        <form>
          <select v-model="interested_genre3" id="disabledSelect" class="form-select">
            <option value="Action">Action</option>
            <option value="Animation">Animation</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Documentary">Documentary</option>
            <option value="Family">Family</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="SF">SF</option>
            <option value="Thriller">Thriller</option>
            <option value="War">War</option>
          </select>
        </form>
        </div>
      <br>
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="aggrement" required>
        <label class="custom-control-label" for="aggrement">개인정보 수집 및 이용에 동의합니다.</label>
        <!-- <p class="warning" v-if="!isPasswordValid && password1">
          영문, 숫자, 특수문자를 조합하여 8자 이상 입력해주세요.
        </p> -->
      </div>
      <br>
      <input class="w-100 btn btn-lg btn-primary" type="submit" value="회원가입">
      <p class="mt-5 mb-3 text-muted">&copy; CNM 2022</p>
    </form>
  </div>
</template>

<script>
// import { validateEmail } from '@/utils/validation'
// import { validatePassword } from '@/utils/validation'

export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      email: null,
      password1: null,
      password2: null,
      interested_genre1: null,
      interested_genre2: null,
      interested_genre3: null,
      logMessage: '',
    }
  },
  computed: {
    // isEmailValid() {
    //   return validateEmail(this.email) 
    // },
    // isPasswordValid() {
    //   return validatePassword(this.password1) 
    // },
    
  },
  methods: {
    signUp() {
      const username = this.username
      const email = this.email
      const password1 = this.password1
      const password2 = this.password2
      const interested_genre1 = this.interested_genre1
      const interested_genre2 = this.interested_genre2
      const interested_genre3 = this.interested_genre3

      const payload = {
        // username,
        // password1,
        // password2,
        username: username,
        email: email,
        password1: password1,
        password2: password2,
        interested_genre1: interested_genre1,
        interested_genre2: interested_genre2,
        interested_genre3: interested_genre3,
      }

      this.$store.dispatch('signUp', payload)

    }
  }
}
</script>

<style>
  .form-signup {
    height: 100%;
    display: flex;
    margin: auto;
    width: 100%;
    max-width: 450px;
    padding: 8px;
    height: 100%;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;

  }

  p {
    border-radius: 0;
  }

  .form-signup .form-floating:focus-within {
    z-index: 2;
    color: black;
  }

  #username {
    margin-bottom: 7px;
  }

  #email {
    margin-bottom: 7px;
  }

  #password1 {
    margin-bottom: 7px;
  }

  #password2 {
    margin-bottom: 7px;
  }

  .interested-genre-rank {
    display: flex;
    padding-right: 50px;
    padding-left: 50px;
    text-decoration-color: black;
    justify-content: space-between;
  }

  .pick-genre {
    display: flex;
    text-decoration-color: black;
    justify-content: space-between;
  }

  .form-signup input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .form-signup input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
</style>