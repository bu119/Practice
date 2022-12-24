<template>
  <div>
    <CommentListItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<script>
import CommentListItem from '@/components/CommentListItem'

export default {
  name: 'CommentList',
  components: {
    CommentListItem,
  },
  computed: {
    comments() {
      return this.$store.getters.comments

      // return this.$store.getters.movie_detail.comments
      // return this.$store.state.comments
    }
  },
  created() {
    this.getComments()
  },

  methods: {
    // comments
    getComments() {
      // console.log('디테일 겟코맨츠')
      const movieId = this.$route.params.id
      this.$store.dispatch('getComments', movieId)
    }
  }
}
</script>

<style>

</style>
