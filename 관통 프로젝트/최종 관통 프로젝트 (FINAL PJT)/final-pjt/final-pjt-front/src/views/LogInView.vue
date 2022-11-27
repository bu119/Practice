<template>
  <div class="form-signin">
    <form @submit.prevent="logIn" class="margin-top: 40%; text-center">
      <!-- <img class="mb-4" src="" alt="" width="72" height="57"> -->
      <h1 class="h3 mb-3 fw-normal">로그인</h1>
      
    <div class="form-floating">
        <input type="text" class="form-control" id="username" v-model="username" placeholder="user-name">
        <label for="username" style="color: black; margin: 3px;">아이디</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="password" v-model="password" placeholder="password">
        <label for="password" style="color: black;">비밀번호</label>
      </div>
      <input class="w-100 btn btn-lg btn-primary" style="margin-bottom:5px;" type="submit" value="로그인">
  
      <span style="padding-right: 10px;">아직 회원이 아니시라면 </span>
      <router-link :to="{ name: 'SignUpView' }">회원가입</router-link>

      <p class="mt-5 mb-3 text-muted">&copy; CNM 2022</p>
    </form>
    <!-- <h1 class="text-center">LogIn Page</h1>
    <form @submit.prevent="logIn">
      <input type="text" id="username" v-model="username" placeholder="user-name"><br>
      <input type="password" id="password" v-model="password" placeholder="password"><br>
      <input type="submit" value="logIn">
    </form> -->
  </div>
</template>

<script>

export default {
  name: 'LogInView',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    logIn() {
      const username = this.username
      const password = this.password

      const payload = {
        username: username,
        password: password,
      }
      this.$store.dispatch('logIn', payload)
    }
  }
}
</script>

<style scoped>
  .form-signin {
    position: absolute;
    width: 400px;
    height: 400px;
    /* background-color: gray; */
    text-align: center;
    margin-left: -200px;
    margin-top: -200px;
    left: 50%;
    top: 50%;
  }
  
  #username {
    margin-bottom: 7px;
  }
  
  #password {
    margin-bottom: 30px;
  }

  .form-signin .form-floating:focus-within {
    z-index: 2;
    color: black;
  }
  
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
</style>