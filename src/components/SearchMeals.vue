<template>
  <div>
    <p>{{ msg }}</p>
    <div id="homeButtons">
      <button @click="">Grocery List</button>
      <button>Search for Meals</button>
      <button>Delete Meal</button>
      <button>Update Meal</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchMeals',
  data () {
    return {
      msg: 'poop'
    }
  }
}
</script>

<style scoped>
</style>
