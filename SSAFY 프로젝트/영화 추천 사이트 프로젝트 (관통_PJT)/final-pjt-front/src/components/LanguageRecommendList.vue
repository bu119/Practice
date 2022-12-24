<template>
  <div>
    <LanguageRecommendListItem
      :movie="languagerecommend"
    />
  </div>
</template>

<script>
import LanguageRecommendListItem from '@/components/LanguageRecommendListItem'

export default {
  name: 'LanguageRecommendList',
  components: {
    LanguageRecommendListItem,
  },
  computed: {
    languagerecommend() {
      return this.$store.state.languagerecommend
    }
  },
}
</script>

<style>

</style>