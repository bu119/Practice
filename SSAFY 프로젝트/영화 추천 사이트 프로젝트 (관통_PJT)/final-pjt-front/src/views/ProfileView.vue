<template>
  <div class='pf'>
    <div class="row"> 
      <div class="mx-auto"> 
        <!-- Profile widget --> 
        <div class="bg-white shadow rounded overflow-hidden pb-4"> 
          <div class="px-4 pt-0 pb-4 cover" style="height: 380px"> 
            <div class="media align-items-end profile-head"> 
              <div class="profile mr-2 ml-5" style="d-flex justify-content-space-between">
                <img src="@/assets/chadoll.jpg" alt="..." width="250" class="rounded mb-0 img-thumbnail">
              </div> 
              <div class="media-body mb-5 text-white">
                <h5 class="pl-3 text-center" style="font-size: 30px">{{ username }}님의 프로필</h5> 
                <p class="small mb-4"> 
                  <i class="fas fa-map-marker-alt mr-2"></i>
                </p> 
              </div> 
          </div> 
        </div> 
        <div class="bg-light p-4 d-flex justify-content-end text-center" style="color: black;"> 
          {{ getEmail }}
        </div> 
        <div class="px-4 py-3" style="text-align: center; color: black; font-size: 20px;"> 
          <b class="mb-0" style="font-size: 25px">Favorite Genres</b> 
          <div class="p-4 rounded shadow-sm bg-light"> 
            <p class="font mb-0">{{ genre1 }}</p> 
            <p class="font mb-0">{{ genre2 }}</p> 
            <p class="font mb-0">{{ genre3 }}</p> 
          </div> 
        </div> 
        <div class="py-4 px-4"> 
          <div class="d-flex align-items-left justify-content-left mb-3"> 
            <h3 class="mb-0 text-center" style="float: left; color: black; width: 600px">My Review</h3>+
            <h4 class="mb-0 pl-3 text-center" style="float: left; color: black; width: 600px">다른 유저가 높이 평가한 영화</h4>+
          </div> 
          <UserCommentList/>
          <OtherUserCommentList/>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserCommentList from '@/components/UserCommentList'
import OtherUserCommentList from '@/components/OtherUserCommentList'

export default {
  name: 'ProfileView',
  components: {
    UserCommentList,
    OtherUserCommentList
  },
  computed: {
    username() {
      return this.$store.state.username
    },
    genre1() {
      return this.$store.state.interested_genre1
    },
    genre2() {
      return this.$store.state.interested_genre2
    },
    genre3() {
      return this.$store.state.interested_genre3
    },
    email() {
      return this.$store.state.email
    }
  },
}
</script>

<style scoped>
.pf {
  width: 1300px;
  text-align: left;
  background-color: #2e2e2e;
}

.profile-head {
    transform: translateY(5rem)
}

.cover {
    background-image: url(https://images.unsplash.com/photo-1530305408560-82d13781b33a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80);
    background-size: cover;
    background-repeat: no-repeat
}

body {
    background: #654ea3;
    background: linear-gradient(to right, #e96443, #904e95);
    min-height: 100vh;
    overflow-x:hidden;
}
</style>