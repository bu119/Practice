<template>
  <div class="managecomment">

    <div>
      <img src="@/assets/profile.jpg" width="18">
      <span class="text2">{{ comment.username }}</span>
    </div>
    <div v-if="update_mode">
      <star-rating :increment="0.5" v-model="update_comment_score"></star-rating>
      <form>
        <input class="writereview" @click="checkLogin" type="text" v-model="update_comment_content" placeholder="리뷰를 수정해주세요.">
        <button class="writereview2" @click="updateComment" type="button">수정</button>
      </form>
    </div>
    <div v-else>
      <div class="second py-2 px-2">
        <span class="text1">{{ comment.content }}</span>
        <div id="star">
          <span v-if="comment.score === 5">
            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
          </span>

          <span v-else-if="comment.score === 4.5">
            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i>
          </span>

          <span v-else-if="comment.score === 4">
            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i>
          </span>

          <span v-else-if="comment.score === 3.5">
            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i><i class="bi bi-star"></i>
          </span>

          <span v-else-if="comment.score === 3">
            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
          </span>

          <span v-else-if="comment.score === 2.5">
            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
          </span>

          <span v-else-if="comment.score === 2">
            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
          </span>

          <span v-else-if="comment.score === 1.5">
            <i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
          </span>

          <span v-else-if="comment.score === 1">
            <i class="bi bi-star-fill"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
          </span>

          <span v-else-if="comment.score === 0.5">
            <i class="bi bi-star-half"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
          </span>

          <span v-else>
            <i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i>
          </span>
        </div>  
      </div>
    </div>
    <div v-if="comment.username===this.username">
      <img @click="deleteComment" src="@/assets/trash-bin.png" alt="" width="40px" height="40px">
      <img src="@/assets/pen.png" alt="" @click="updatToggleBtn" width="40px" height="40px">
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommentListItem',
  data() {
    return {
      update_comment_content: this.comment.content,
      update_comment_score: 0,
      update_mode: false
    }
  },
  computed: {
    username() {
      return this.$store.state.username
    },
    isLogin() {
      return this.$store.getters.isLogin
    },
  },
  components: {
    StarRating
  },
  props: {
    comment: Object,
  },
  methods: {
    updatToggleBtn() {
      this.update_mode = !this.update_mode
    },
    checkLogin() {
      if (this.isLogin === false) { 
        alert('로그인이 필요한 서비스 입니다.')
        this.$router.push({ name: 'LogInView'})
      }
    },
    deleteComment() {
      // console.log('삭제 메서드 호출!!')
      console.log(this.comment)
      this.$store.dispatch('deleteComment', this.comment)
    },
    updateComment() {
      console.log(this.comment)
      const content = this.update_comment_content
      // console./og(content)
      // const commentId = this.comment.id
      const score = this.update_comment_score
      // const payload = {
      //   content,
      //   commentId,
      //   score,
      // }
      // if (this.comment.username !== this.username) {
      //   alert('작성자가 아닙니다.')
      // } else 
      if (!content) {
        alert('내용을 입력해주세요.')
      } else {
        console.log(this.comment.id)
        // this.$store.dispatch('updateComment', payload)
        axios({
          method: "put",
          url: `${API_URL}/movies/comments/${this.comment.id}/`,
          data: {
            content,
            score
          },
          headers: {
            Authorization: `Token ${this.$store.state.token}`
          },
        })
          .then((res) => {
            // console.log(this.comment.id)
            // console.log(res)
            this.$store.commit('UPDATE_COMMENT', res.data)
            this.update_mode = !this.update_mode
            alert('리뷰가 수정되었습니다.')
          })
          .catch((err) => {
            alert('작성자가 아닙니다.')
            console.error(err);
          })
      }
    
    },
    updateToggleBtn() {
      // 토글 할 버튼 선택 (update_bnt)
      const update_bnt = document.getElementById('update_bnt');
      
      // update_bnt 숨기기 (display: none)
      if(update_bnt.style.display === 'none') {
        update_bnt.style.display = 'block';
      }
      // update_bnt` 보이기 (display: block)
      else {
        update_bnt.style.display = 'none';
      }
    }

  }
}
</script>

<style scoped>

/* #update_bnt {
  display: none;
} */

#start {
    color: rgb(253, 215, 0);
  }

.managecomment {
  display: flex;
  flex-wrap: wrap;
  
}

.second{
	width: 350px;
	background-color: transparent;
  border-bottom: 1px solid;
  border-bottom-color: 1px #56575b;
	border-radius: 4px;
  display: flex;
  justify-content: space-evenly;
  color: white;
	/* box-shadow: 10px 10px 5px #aaaaaa; */
}
.text1{
	font-size: 20;
  font-weight: 500;
  color: #cacaca;
}
.text2{
	font-size: 20px;
    font-weight: 500;
    margin-left: 6px;
    color: #cacaca;
}

.writereview{
  width: 300px;
  height: 40px;
  font-size: 15px;
  border: 0;
  border-radius: 9px;
  outline: none;
  padding-left: 10px;
  padding-top: 5px;
  background-color: rgba(233, 233, 233, 0.679);
}

.writereview2{
  width: 60px;
  height: 40px;
  font-size: 15px;
  border: 0;
  border-radius: 9px;
  outline: none;
  padding-top: 5px;
  background-color: #F7E600;
}

/* .btns {
  display: flex;
  justify-content: right;
} */
</style>
