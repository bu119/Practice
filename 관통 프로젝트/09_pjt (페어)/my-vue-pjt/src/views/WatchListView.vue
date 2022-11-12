<template>
  <div class="mt-5">
    <h1><b>보고싶은 영화</b></h1>
    <hr>
    <WatchListForm/>
    <br>
    <WatchListItem
      v-for="(movie, index) in movieList"
      :key="index"
      :movie=movie
    />
  </div>
</template>

<script>
import WatchListForm from '@/components/WatchListForm.vue'
import WatchListItem from '@/components/WatchListItem.vue'


export default {
  name: 'WatchListView',
  computed: {
    movieList() {
      return this.$store.state.movieList
    }
  },
  components: {
    WatchListForm,
    WatchListItem,
  }
}
</script>

<style>

</style>