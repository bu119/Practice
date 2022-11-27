<template>
  <div>
    <UserCommentListItem
      :comment="user_comments"
    />
  </div>
</template>

<script>
import UserCommentListItem from '@/components/UserCommentListItem'

export default {
  name:'UserCommentList',
  components: {
    UserCommentListItem,
  },
  computed: {
    user_comments() {
      return this.$store.state.user_comments
    }
  },
  created() {
    this.getAllComments()
  },
  methods: {
    getAllComments() {
      this.$store.dispatch('getAllComments')
    }
  }
} 
</script>

<style>

</style>