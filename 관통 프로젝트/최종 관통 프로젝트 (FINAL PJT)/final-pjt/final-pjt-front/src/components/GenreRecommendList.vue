<template>
  <div>
    <GenreRecommendListItem
      :movie="genrerecommend"
    />
  </div>
</template>

<script>
import GenreRecommendListItem from '@/components/GenreRecommendListItem'

export default {
  name: 'GenreRecommendList',
  components: {
    GenreRecommendListItem,
  },
  computed: {
    genrerecommend() {
      return this.$store.state.genrerecommend
    }
  },
}
</script>

<style>

</style>