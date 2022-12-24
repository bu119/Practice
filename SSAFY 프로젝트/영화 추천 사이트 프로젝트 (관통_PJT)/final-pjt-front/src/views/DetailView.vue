<template>
  <div>
    <div class="movie_card" id="bright">
      <!-- 제목 & 별점 -->
      <div class="info_section">
        <div class="movie_header">
          <h1>{{ movie?.title }}</h1>
          <!-- <h4>{{ movie?.released_date.year }}</h4> -->
          <span class="minutes"> ⭐{{ movie?.vote_avg }}</span>
          <p class="type">
            <span 
              v-for="(genre, idx) in movie.genres"
              :key="idx"
              >
              {{ genre['name'] }}
              <span
                v-if="movie.genres.length !== (idx + 1)">
                ,
              </span>
            </span>
          </p>
          <hr id="title_hr">
        </div>
        
        <!-- 포스터 & 줄거리 -->
        <div class="movie_desc">
          <img class="locandina" :src="poster_path"/>
          <p class="text">
            {{ movie?.overview }}
          </p>
        </div>
        
        <span class="movie_date">🗓️ {{ movie?.released_date }}</span>

        <div class="movie_social">
          <ul>
            <!-- <li><i @click="btnShareTw" type="button" id="twitter" class="material-icons"><img src="./images/icon-twitter.png" alt=""></i></li> -->
            <li><i @click="btnShareFb" type="button" id="facebook" class="material-icons"><img src="./images/icon-facebook.png" alt=""></i></li>
            <li><i @click="btnShareKt" type="button" id="kakao" class="material-icons"><img src="./images/icon-kakao.png" alt=""></i></li>
        </ul>
      </div>
    </div>
    <!-- <div class="blur_back bright_back" :style="`background-image: linear-gradient(0deg, rgba(15,15,15,1), rgba(100, 100, 100, 0.2)),url(${backdrop_path}); background-size: cover; background-position: center;`" ></div> -->
    <div class="blur_back" :style="`background-image: url(${backdrop_path}); background-size: cover; background-position: center;`" ></div>
  </div>

    <div class="secondpart">
      <!-- 유투브 비디오 -->
      <div v-if="YouTubeUrl">
        <iframe width="370" height="310" :src='YouTubeUrl' title="YouTube video player" 
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
        ></iframe>
      </div>
      <div>
        <CommentForm/>
      </div>
      <div>
        <CommentList/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/CommentList'

const API_URL = 'http://127.0.0.1:8000'
const BU_API_KEY = 'f954b5a3cfb8f0d9431c8d55eff3873c'
// const JI_API_KEY = '0653b8b0e7a512864a2e86623f5d59bd'

export default {
  name: 'DetailView',
  components: {
    CommentForm,
    CommentList,
  },
  data() {
    return {
      movie: null,
      poster_path: null,
      backdrop_path: null,
      YouTubeUrl: null,
    }
  },
  created() {
    this.getMovieDetail()
    this.getYouTubeAPI()
    // this.getComments()
    },
  methods: {
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${this.$route.params.id}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((res) => {
          this.movie = res.data
          this.poster_path = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${res.data.poster_path}`
          this.backdrop_path = `https://image.tmdb.org/t/p/original${res.data.backdrop_path}`
          // this.$store.commit('GET_MOVIE_DETAIL', res.data)

          //  일단 무비 디테일 페이지 들고오는걸루---------------------------------------------------- 리스트에서 들고옴
          // const movieId = this.$route.params.id
          // this.$store.dispatch('getMovieDetail', movieId)

          // //  무비의 코멘트만 가져오기 (질문)--------------------------------------------------------
          // console.log('디테일 겟코맨츠')
          // const movieId = this.$route.params.id
          // this.$store.dispatch('getComments', movieId)
          
          })
        .catch(err => console.log(err))
    },

    //  유투브 영상 가져오기
    getYouTubeAPI() {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos?api_key=${BU_API_KEY}&language=ko-KR`,
      })
        .then((res) => {
          // console.log(res)
          const Video = res.data.results.find((video) => {
            if (video.type === 'Trailer') {
              return video
            }
          })
          // console.log(Video.key)
          this.YouTubeUrl = `https://www.youtube.com/embed/${Video.key}`
        })
    },
    
    // // comments
    // getComments() {
    //   console.log('디테일 겟코맨츠')
    //   const movieId = this.$route.params.id
    //   this.$store.dispatch('getComments', movieId)
    // }

    // SNS 공유
    btnShareTw() {
      const sendText = this.movie.title
      const pageUrl = `${API_URL}/movies/${this.$route.params.id}/`;
      window.open(`https://twitter.com/intent/tweet?text=${sendText}&url=${pageUrl}`);
    },

    btnShareFb() {
      const pageUrl = `${API_URL}/movies/${this.$route.params.id}/`;
      window.open(`http://www.facebook.com/sharer/sharer.php?u=${pageUrl}`);
    },

    btnShareKt() {
      const sendText = this.movie.title
      const pageUrl = `${API_URL}/movies/${this.$route.params.id}/`

      window.Kakao.Link.sendDefault({
        objectType: 'text',
        text: sendText, 
        link: {
          webUrl: pageUrl
        }
      })
    }

  },
}
</script>

<style scoped>
.twitter { background-image: url(./images/icon-twitter.png); background-repeat: no-repeat; }
.facebook { background-image: url(./images/icon-facebook.png); background-repeat: no-repeat; } 
.kakao { background-image: url(./images/icon-kakao.png); background-repeat: no-repeat; }


*{
  box-sizing: border-box;
  margin: 0;
}

#title_hr {
  margin-top: 15px;
}
/* body{
  margin: 0;
  background: black;
  font-family: 'Montserrat', helvetica, arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
} */

.movie_date {
  text-align: left;
  margin-right: 920px;
  display: inline-block;
  /* margin-top: 10px; */
  color: #fff;
  padding: 5px 15px 5px 15px;
  /* padding-left: 10px;
  padding-right: 10px; */
  border-radius: 5px;
  border: 1px solid rgba(255,255,255,0.13);
}

.movie_card{
  position: relative;
  display: block;
  width: 1200px;
  height: 600px;
  margin: 100px auto; 
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.4s;
  /* &:hover{
    transform: scale(1.02);
    transition: all 0.4s;
  } */
}
.info_section{
  position: relative;
  width: 100%;
  height: 100%;
  background-blend-mode: multiply;
  z-index: 2;
  border-radius: 10px;
}
.movie_header{
  position: relative;
  padding: 25px;
  height: 25%;
}
h1{
  color: #fff;
  font-weight: 400;
}
h4{
  color: #9ac7fa;
  font-weight: 400;
}
.minutes{
  display: inline-block;
  margin-top: 10px;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgba(255,255,255,0.13);
}
.type{
  display: inline-block;
  color: #cee4fd;
  margin-left: 10px;
}
.locandina{
  position: relative;
  float: left;
  /* margin-left: 10px; */
  margin-right:40px;
  height: 300px;
  box-shadow: 0 0 20px -10px rgba(0,0,0,0.5);
}

.movie_desc{
  margin-left: 15px;
  padding: 25px;
  height: 56%;
}
.text{
  text-align: left;
  color: #cfd6e1;
}

.movie_social{
  height: 10%;
  padding-left: 15px;
  margin-left: 100px ;
  padding-bottom: 20px;
}

ul{
  list-style: none;
  padding: 0;
  margin-left: 208px;
  display: flex;
  justify-content: start;
}

li{
  display: inline-block;
  color: rgba(255, 255, 255, 0.791);
  transition: color 0.3s;
  transition-delay: 0.15s;
  margin: 0 5px;
  /* &:hover{
    transition: color 0.3s;
    color: rgba(255,255,255,0.8);
  } */
}

i{
  font-size: 19px;
  cursor: pointer;
}

.blur_back{
  position: absolute;
  top: 0;
  z-index: 1;
  height: 100%; right: 0;
  background-size: cover;
  border-radius: 11px;
}

.secondpart {
  display: flex;
  text-align: center;
  justify-content: space-between;
  float: center;
  padding-left: 20px;
}

@media screen and (min-width: 768px) {
  .movie_header{
    width: 60%;
  }
  
  .movie_desc{
    width: 55%;
  }
  
  .info_section{
    background: linear-gradient(to right, #0d0d0c 50%, transparent 100%);
  }
  
  .blur_back{
    width: 80%;
    background-position: -100% 10% !important;  
  }
}

@media screen and (max-width: 768px) {
  .movie_card{
    width: 95%;
    margin: 70px auto; 
    min-height: 350px;
    height: auto;
  }
  
  .blur_back{
    width: 100%;
    background-position: 50% 50% !important;  
  }
  
  .movie_header{
    width: 100%;
    margin-top: 85px;
  }
  
  .movie_desc{
    width: 100%;
  }
  
  .info_section{
    background: linear-gradient(to top, rgb(20, 20, 19) 50%, transparent 100%);
    display: inline-grid;
  }
}


#bright{
  box-shadow: 0px 0px 100px -45px rgba(255, 51, 0, 0.5);
  /* &:hover{
    box-shadow: 0px 0px 120px -55px rgba(255, 51, 0, 0.5); */
}


/* .bright_back{
  background: url("https://occ-0-2433-448.1.nflxso.net/art/cd5c9/3e192edf2027c536e25bb5d3b6ac93ced77cd5c9.jpg");
} */

#tomb{
  box-shadow: 0px 0px 150px -45px rgba(19, 160, 134, 0.6);
  /* &:hover{
    box-shadow: 0px 0px 120px -55px rgba(19, 160, 134, 0.6);
  } */
}

.tomb_back{
  background: url("https://fsmedia.imgix.net/cd/c9/5e/ba/4817/4d9a/93f0/c776ec32ecbc/lara-crofts-neck-looks-unnatural-in-the-new-poster-for-tomb-raider.png");
}

#ave{
  box-shadow: 0px 0px 150px -45px rgba(199,147,75, 0.7);
  margin-bottom: 200px;
  /* &:hover{
    box-shadow: 0px 0px 120px -55px rgba(199,147,75, 0.7);
  } */
}

.ave_back{
    background: url("https://www.gannett-cdn.com/-mm-/c03fd140debe8ad4c05cf81a5cad7ad61a12ce52/c=0-1580-2985-3266&r=x803&c=1600x800/local/-/media/2017/06/09/USATODAY/USATODAY/636326272873599176-Black-Panther-Teaser.jpg");
}
</style>