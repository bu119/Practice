<template>
  <div>
    <div class="container d-flex justify-content-center">
      <div class="card text-center mb-5">
        <div class="circle-image">
          <img src="@/assets/profile.jpg" width="30px">
        </div>
          <span class="dot"></span>
        <span class="name mb-1 fw-500" style="font-size: 20px; color: white;">{{ username }}</span>

        <form @submit.prevent="createComment">
          <input class="writereview" @click="checkLogin" type="text" v-model.trim="comment_content" placeholder="리뷰를 작성해주세요.">
          <div class="rate mt-3">
            <div class="rating"><star-rating :increment="0.5" v-model="comment_score" style="font-size: 10px"></star-rating></div>
            <div class="buttons px-0">
            <button class="btn btn-primary btn-block rating-submit">작성하기</button>
          </div>
        </div>          
        </form>
      </div>
    </div>

    <!-- 여기가 찐 -->
    <!-- <h2>평점</h2> -->
    <!-- <star-rating :increment="0.5" v-model="comment_score"></star-rating>
    <form @submit.prevent="createComment">
      <input @click="checkLogin" type="text" v-model.trim="comment_content" placeholder="리뷰를 작성해주세요.">
      <button>작성하기</button>
    </form> -->
  </div>
</template>

<script>
import axios from 'axios'
import StarRating from 'vue-star-rating'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name:'CommentForm',
  components: {
    StarRating
  },
  computed: {
    username() {
      return this.$store.state.username
    },
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  data() {
    return {
      comment_content: null,
      comment_score: 0,
    }
  },
  methods: {
    checkLogin() {
      if (this.isLogin === false) { 
        alert('로그인이 필요한 서비스 입니다.')
        this.$router.push({ name: 'LogInView'})
      }
    },

    createComment() {
      const content = this.comment_content
      const score = this.comment_score

      if (!content) {
        alert('내용을 입력해주세요.')
      } else {
        axios({
          method: 'post',
          url: `${API_URL}/movies/${this.$route.params.id}/comments/`,
          data: {
            content,
            score
          },
          headers: {
            Authorization: `Token ${this.$store.state.token}`
          },
        })
          .then(() => {
            // this.$store.commit('CREATE_COMMENT')
            // console.log('폼에 코멘트 잘들어옴')
            // console.log(this.$route.params.id)
            // console.log(res)
            const movieId = this.$route.params.id
            // this.$store.dispatch('getMovieDetail', movieId)
            // // 무비의 코멘트만 가져오기 (질문)--------------------------------------------------------
            this.$store.dispatch('getComments', movieId)
            // // 주석 해제 -----------------------------------------------------------------------------
          })
          .catch((err) => {
            console.log(err)
            alert('이미 작성된 리뷰가 존재합니다.')
          })
        this.comment_content = null
      }
    },    
  }
}
</script>

<style scoped>

.card{
	width: 350px;
	border: 3px solid rgb(62, 61, 61);
	/* box-shadow: 5px 6px 6px 2px #e9ecef; */
	border-radius: 12px;
  background-color: transparent;
}

.circle-image img{
  border: 6px solid #fff;
  border-radius: 100%;
  padding: 0px;
  top: -28px;
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  z-index: 1;
  background: #e7d184;
  cursor: pointer;
}

.dot {
  height: 18px;
  width: 18px;
  background-color: blue;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid #fff;
  top: -48px;
  left: 186px;
  z-index: 1000;
}

.name{
	margin-top: -21px;
	font-size: 18px;
}

.fw-500{
	font-weight: 500 !important;
}

.writereview{
  width: 300px;
  height: 100px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgba(233, 233, 233, 0.679);
}

.rate{
	border-bottom-right-radius: 12px;
	border-bottom-left-radius: 12px;
}

.rating {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center
}

.rating>input {
  display: none
}

.rating>input:checked~label:before {
  opacity: 1
}

.rating:hover>input:checked~label:before {
  opacity: 0.4
}

.buttons{
	top: 26px;
  position: relative;
}

.rating-submit{
	border-radius: 15px;
  border-color: transparent;
	color: #fff;
  height: 35px;
  background-color: rgba(0, 47, 255, 0.863);
}

.rating-submit:hover{
	color: #fff;
}
</style>