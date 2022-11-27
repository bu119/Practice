<template>
  <div>
    <OtherUserCommentListItem
      :comment="top_other_comments"
    />
  </div>
</template>

<script>
import OtherUserCommentListItem from '@/components/OtherUserCommentListItem'


export default {
  name: 'OtherUserCommentList',
  components: {
    OtherUserCommentListItem,
  },
  computed: {
    top_other_comments() {
      return this.$store.getters.top_other_comments
    }
  },
  created() {
    this.getOtherComments()
  },
  methods: {
    getOtherComments() {
      this.$store.dispatch('getOtherComments')
    }
  }
}
</script>

<style>

</style>