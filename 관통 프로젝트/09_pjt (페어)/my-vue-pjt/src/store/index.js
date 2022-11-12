import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topRatedList: [],
    movieList: [],
    weather: null,
    movieListByWeather: [],
    randomMovie: null,
  },
  getters: {
    topRatedList(state){
      return state.topRatedList
    },
  },
  mutations: {
    CREATE_TOP_RATED_MOVIE_LIST(state, payload) {
      state.topRatedList = payload
    },
    MOVIE_RANDOM_PICK(state) {
      state.randomMovie = _.sample(state.topRatedList)
    },
    ADD_WATCH_MOVIE(state, watchMovieTitle) {
      state.movieList.push(watchMovieTitle)
    }
  },
  actions: {
    getTopRatedMovie(context) {
      const API_KEY = 'd2422a10ba4aec134c0376da798acbb6'
      const URL = 'https://api.themoviedb.org/3/movie/top_rated'
      const language = 'ko-kr'

      axios({
        method: 'GET',
        url: URL,
        params: {
          api_key: API_KEY,
          language: language,
        }
      })
      .then(response => {
        const payload = response.data.results
        context.commit('CREATE_TOP_RATED_MOVIE_LIST', payload)
      }).catch(error => {
        console.log('getTopRatedMovie error =>', error)
      })
    },
    // getRandomMovie() {
    //   this.dispatch('getTopRatedMovie')
    //   // this.state.randomMovie = _.sample(this.state.topRatedList)
    // }
  },
  modules: {
  }
})
