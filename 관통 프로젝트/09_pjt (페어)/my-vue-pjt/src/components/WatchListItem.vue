<template>
  <div id="giveline" @click="watched">
    <p
      :class="[isSelected ? 'watched-line': 'notwatched-line']"
    >{{ movie }}</p>
  </div>
</template>

<script>
export default {
  name: 'WatchListItem',
  props: {
    movie: String
  },
  data() {
    return {
      isSelected: false
    }
  },
  methods: {
    watched() {
      this.isSelected = !this.isSelected
      console.log(this.isSelected)
    }
  }
}
</script>

<style scoped>
  .watched-line {
    text-decoration: line-through;
  }
  #giveline > p {
    
  }
</style>