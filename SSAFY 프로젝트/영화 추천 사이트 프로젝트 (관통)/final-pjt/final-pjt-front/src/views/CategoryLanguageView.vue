<template>
  <div>
    <h1>영화로 떠나는 세계 여행</h1>
    <LanguageRecommendList/><br>
  </div>
</template>

<script>
import LanguageRecommendList from '@/components/LanguageRecommendList'

export default {
  name: 'CategoryLanguageView',
  components: {
    LanguageRecommendList,
  },
  created() {
    this.getLanguageRecommend()
  },
  methods: {
    getLanguageRecommend() {
      this.$store.dispatch('getLanguageRecommend')
    },
  }
}
</script>

<style>

</style>