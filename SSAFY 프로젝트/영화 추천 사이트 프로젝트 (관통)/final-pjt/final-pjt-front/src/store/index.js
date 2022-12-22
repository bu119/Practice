import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage // store를 session storage 에 유지
    }),
  ],

  state: {
    recentpopularmovies: [],
    recentmovies: [],
    steadysellers: [],
    genrerecommend: [],
    languagerecommend: [],
    feelingmovies: [],
    interestedmovies: [],
    interested_genre1: null,
    interested_genre2: null,
    interested_genre3: null,
    token: null,
    username: null,
    comments: [],
    // movie_detail: [],
    // all_comments: [],
    user_comments: [],
    top_other_comments: []
  },

  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    // 영화 추천--------------------------------
    recentpopularmovies(state) {
      return state.recentpopularmovies
    },
    recentmovies(state) {
      return state.recentmovies
    },
    steadysellers(state) {
      return state.steadysellers
    },
    genrerecommend(state) {
      // console.log(state)
      return state.genrerecommend
    },
    languagerecommend(state) {
      return state.languagerecommend
    },
    feelingmovies(state) {
      return state.feelingmovies
    },
    interestedmovies(state) {
      return state.interestedmovies
    },
    

    // 리뷰---------------------------------------
    // movie_detail(state) {
    //   return state.movie_detail
    // },

    comments(state) {
      return state.comments
    },

    // 프로필 -----------------------------------
    top_other_comments(state) {
      return state.top_other_comments
    },

    user_comments(state) {
      return state.user_comments
      // state.user_comments = state.all_comments.filter((comment) => {
      //   if (comment.username === state.username) {
      //     return comment
      //   }
      // })
    },
  },

  mutations: {
    // 슬라이드 카드(최신 인기 영화 추천)
    GET_RECENT_POPULAR_MOVIES(state, recentpopularmovies) {
      state.recentpopularmovies = recentpopularmovies
    },

    // 기분별 추천
    GET_FEELING_MOVIES(state, feelingmovies) {
      state.feelingmovies = feelingmovies
    },

    // 장르별 추천
    GET_GENRE_RECOMMEND(state, genrerecommend) {
      state.genrerecommend = genrerecommend
    },

    // 언어별 추천
    GET_LANGUAGE_RECOMMEND(state, languagerecommend) {
      state.languagerecommend = languagerecommend
    },

    // 관심장르별 추천
    GET_INTERESTED_RECOMMEND(state, interestedmovies) {
      state.interestedmovies = interestedmovies
    },

    // 최신영화 추천
    GET_RECENT_MOVIES(state, recentmovies) {
      state.recentmovies = recentmovies
    },

    // 스테디셀러 추천
    GET_STEADY_SELLERS(state, steadysellers) {
      state.steadysellers = steadysellers
    },

    // 회원가입 && 로그인
    SAVE_TOKEN(state, name_token) {
      state.token = name_token.token
      state.username = name_token.username
      router.push({ name: 'MovieView' })
      console.log()
    },
    LOGOUT(state) {
      state.token = !state.token
      router.push({name: 'LogInView'})
    },

    // 관심장르 저장
    SAVE_INTERESTED_GENRE(state, interested_genres) {
      state.interested_genre1 = interested_genres.interested_genre1
      state.interested_genre2 = interested_genres.interested_genre2
      state.interested_genre3 = interested_genres.interested_genre3
    },

    // 프로필 -------------------------------------------------------
    GET_All_COMMENTS(state, comments) {
      // state.all_comments = comments,
      state.user_comments = comments.filter((comment) => {
        if (comment.username === state.username) {
          return comment
        }
      })
    },

    GET_OTHER_COMMENTS(state, comments) {
      // state.all_comments = comments,
      const other_comments = comments.filter((comment) => {
        if (comment.username != state.username) {
          return comment
        }
      })
      console.log(other_comments)
      state.top_other_comments = other_comments.filter((comment) => {
        if (comment.score > 4) {
          return comment
        }
      }) 
    },


    // 리뷰 -------------------------------------------------------
    // // 디테일 페이지 전체 가져오기------------------------------------------------
    // GET_MOVIE_DETAIL(state, movie) {
    //   state.movie_detail = movie
    // },
    // CREATE_COMMENT(state, comment) {
      //   state.movie_detail.comments.push(comment)
      // },
      
    // DELETE_COMMENT(state, comment) {
    //   const index = state.movie_detail.comments.indexOf(comment)
    //   state.movie_detail.comments.splice(index, 1)
    // },
  
    // UPDATE_COMMENT(state, newComment) {
    //   state.movie_detail.comments = state.movie_detail.comments.map((comment) =>{
    //     if (comment.username === newComment.username) {
    //       return {
    //         ...comment,
    //         content: newComment.content,
    //         score: newComment.score,
    //       }
    //     }
    //     return comment
    //   })
    // },

    // // 무비코멘트만 가져오기 ------------------------------------------------------
    GET_COMMENTS(state, comments) {
      state.comments = comments
    },
    
    DELETE_COMMENT(state, comment) {
      const index = state.comments.indexOf(comment)
      state.comments.splice(index, 1)
    },
  
    UPDATE_COMMENT(state, newComment) {
      state.comments = state.comments.map((comment) =>{
        if (comment.username === newComment.username) {
          return {
            ...comment,
            content: newComment.content,
            score: newComment.score,
          }
        }
        return comment
      })
    },
  },

  actions: {
    // 장르별 추천
    getGenreRecommend(context) {
      axios({
        method: 'get', 
        url: `${API_URL}/movies/genre_ver/`,
      })
        .then(res => {
          console.log(res)
          context.commit('GET_GENRE_RECOMMEND', res.data)
        })
        .catch(err => console.log(err))
    },

    // 기분별 추천
    getFeelingMovies(context) {
      axios({
        method: 'get', 
        url: `${API_URL}/movies/feelings/`,
      })
        .then(res => {
          context.commit('GET_FEELING_MOVIES', res.data)
        })
        .catch(err => console.log(err))
    },

    // 언어별 추천
    getLanguageRecommend(context) {
      axios({
        method: 'get', 
        url: `${API_URL}/movies/language_ver/`,
      })
        .then(res => {
          context.commit('GET_LANGUAGE_RECOMMEND', res.data)
        })
        .catch(err => console.log(err))
    },

    // 관심장르별 추천
    getInterestedRecommend(context) {
      axios({
        method: 'get', 
        url: `${API_URL}/movies/interested/${this.state.username}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then(res => {
          // console.log(this.state.username)
          // console.log(res)
          context.commit('GET_INTERESTED_RECOMMEND', res.data)
        })
        .catch(err => console.log(err))
    },

    // 최신 인기 영화
    getRecentPopularMovies(context) {
      axios({
        method: 'get', 
        url: `${API_URL}/movies/recent_popular/`,
      })
        .then(res => {
          context.commit('GET_RECENT_POPULAR_MOVIES', res.data)
        })
        .catch(err => console.log(err))
    },

    // 최신 영화
    getRecentMovies(context) {
      axios({
        method: 'get', 
        url: `${API_URL}/movies/recent/`,
      })
        .then(res => {
          context.commit('GET_RECENT_MOVIES', res.data)
        })
        .catch(err => console.log(err))
    },

    // 스테디셀러
    getSteadySellers(context) {
      axios({
        method: 'get', 
        url: `${API_URL}/movies/steady_seller/`,
      })
        .then(res => {
          context.commit('GET_STEADY_SELLERS', res.data)
        })
        .catch(err => console.log(err))
    },

    // 회원가입 && 로그인
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          email: payload.email,
          password1: payload.password1,
          password2: payload.password2,
          interested_genre1: payload.interested_genre1,
          interested_genre2: payload.interested_genre2,
          interested_genre3: payload.interested_genre3,
        }
      })
        .then((res) => {
          // console.log(res)
          const name_token = {
            username: payload.username,
            token: res.data.key
          }
          const interested_genres = {
            username: payload.username,
            token: res.data.key,
            interested_genre1: payload.interested_genre1,
            interested_genre2: payload.interested_genre2,
            interested_genre3: payload.interested_genre3,
          }
          context.commit('SAVE_TOKEN', name_token)
          context.commit('SAVE_INTERESTED_GENRE', interested_genres)
          alert('CNM에 가입해주셔서 감사합니다.')
        })
        .catch((err) => {
          console.log(err)
          alert('개인정보를 확인해주세요.')
        })
    },
  
    logIn(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
        .then((res) => {
          // console.log(res)
          const name_token = {
            username: payload.username,
            token: res.data.key
          }
          context.commit('SAVE_TOKEN', name_token)
          alert('CNM에 오신 것을 환영합니다.')
        })
        .catch((err) => {
          console.log(err)
          alert('다시 입력해주세요.')
        })
    },

    // 리뷰 -------------------
    // // 무비의 코멘트만 가져오기 (질문)--------------------------------------------------------
    getComments(context, movieId) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${movieId}/comments/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          // console.log('엑시오스 겟 코멘츠')
          // console.log(res)
          context.commit('GET_COMMENTS', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },


    // // 디테일 페이지 가져오기----------------------------------------------------------------------------------

    // getMovieDetail(context, movieId) {
    //   axios({
    //     method: 'get',
    //     url: `${API_URL}/movies/${movieId}/`,
    //     headers: {
    //       Authorization: `Token ${context.state.token}`
    //     }
    //   })
    //     .then((res) => {
    //       console.log('엑시오스 겟 무비디테일')
    //       // console.log(res)
    //       context.commit('GET_MOVIE_DETAIL', res.data)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
  

    deleteComment(context, comment) {
      axios({
        method: 'delete',
        url: `${API_URL}/movies/comments/${comment.id}`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then(()=>{
          context.commit('DELETE_COMMENT', comment)
          alert('리뷰가 삭제되었습니다.')
        })        
        .catch((err) => {
          console.error(err);
          alert('작성자가 아닙니다.')
        });
    },

    // updateComment(context, payload) {
    //   axios({
    //     method: "put",
    //     url: `${API_URL}/movies/comments/${payload.commentId}/`,
    //     data: {
    //       content: payload.content,
    //       score: payload.score,
    //     },
    //     headers: {
    //       Authorization: `Token ${context.state.token}`
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res)
    //       context.commit('UPDATE_COMMENT', res.data)
    //       alert('리뷰가 수정되었습니다.')
    //     })
    //     .catch((err) => {
    //       alert('작성자가 아닙니다.')
    //       console.error(err);
    //     });
    // },
    // 프로필 ----------------------------------------------------------
    getAllComments(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/comments/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          console.log('겟 all 프로필')
          // console.log(res)
          context.commit('GET_All_COMMENTS', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getOtherComments(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/comments/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          console.log('겟 another 프로필')
          // console.log(res)
          context.commit('GET_OTHER_COMMENTS', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  modules: {
  }
})