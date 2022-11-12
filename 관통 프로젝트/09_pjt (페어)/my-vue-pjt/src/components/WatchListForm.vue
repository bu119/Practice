<template>
  <div>
    <form @submit.prevent>
      <input type="text" v-model="watchMovieTitle">
      <!-- <button @click="addWatchMovie">Add</button> -->
      <button @click="addWatchMovie" type="button" class="btn btn-success">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'WatchListForm',
  data() {
    return{
      watchMovieTitle: null,
    }
  },
  methods: {
    addWatchMovie() {
      this.$store.commit('ADD_WATCH_MOVIE', this.watchMovieTitle)
      this.watchMovieTitle = null
    }
  }
}
</script>

<style>

</style>