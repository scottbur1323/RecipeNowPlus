<template>
  <div>
    <section id="entireGroceryList">
      <div id="homeButtons">
        <button @click="passItUp">Back to Home</button>
      </div>
      <section id="form">
        <h2>Grocery List</h2>
        <div id="column" class="eachMeal" v-for="meal in mealsToListIngredients">
          <div id="row" class="picAndName">
            <aside id="asidePicAndName">
              <img class="cardImage" :src="meal.picURL">
              <h4>{{ meal.mealName }}</h4>
            </aside>
          </div>
          <div id="eachIngredient">
            <div id="ingredientWrapper" v-for="ingredient in meal.ingredients.split('$')">
              <p>{{ ingredient }}</p>
            </div>
          </div>
        </div>
      </section>
      <div id="homeButtons">
        <button @click="passItUp">Back To Home</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'GroceryList',
  data () {
    return {
      finalListOfingredients: []
    }
  },
  props: ['selectedIngredients', 'mealsToListIngredients'],
  methods: {
    passItUp: function() {
      this.$emit('goHome')
    },
  }
}
</script>

<style scoped>
#row {
  display: flex;
  flex-direction: column;
}
#column {
  display: flex;
  flex-direction: row;
}
* {
  font-family: Helvetica, sans-serif;
  font-weight: light;
  -webkit-font-smoothing: antialiased;
}
h4 {
  height: 30px;
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: center;
}
h2 {
  height: 30px;
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: center;
}
section #form {
  position: relative;
  min-width: 100vw;
  box-sizing: border-box;
  padding: 5px 20px;
  background-color: rgba(255,255,255,0.8);
  border-width: thin;
  border-color: rgba(255,255,255,1);
  border-style: solid;
  margin-bottom: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  margin-top: 0px;
  background-color: white;
  border: 1px solid #ff4a56;
  line-height: 0;
  font-size: 14px;
  font-weight: bold;
  font-weight: 600;
  display: inline-block;
  box-sizing: border-box;
  padding: 15px 5px;
  border-radius: 60px;
  color: #ff4a56;
  font-weight: 100;
  letter-spacing: 0.01em;
  position: relative;
  z-index: 1;
  margin-left: 2px;
  margin-right: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 120px;

}
button:hover, button:focus {
  color: white;
  background-color: #ff4a56;
}
.cardImage {
  min-width: 25vw;
  width: 25vw;
  min-height: 50px;
  border-radius: 6px;
  border-style: solid;
  border-width: thin;
  border-color: #BD292C;
  margin-top: -2px;
}
#homeButtons {
  max-width: 100vw;
  min-width: 310px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
}
#homeButtons2 {
  width: 100vw;
  min-width: 310px;
  margin-bottom: 130px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
}
#entireGroceryList {
  margin-bottom: 120px;
}
.picAndName {
  max-width: 25vw;
  width: 25vw;
  margin-right: 2vw;
  margin-left: 2vw;
}
#eachIngredient {
  max-width: 55vw;
  width: 55vw;
  margin-right: 2vw;
  margin-left: 2vw;
  display: flex;
  flex-direction: column;
}
#ingredientWrapper:hover {
  background-color: #ED585C;
}

#ingredientWrapper {
  border-style:solid;
  border-width: thin;
  border-radius: 10px;
  max-width: 60vw;
  overflow-x: scroll;
  overflow-y: hidden;
  background-color: white;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: bolder;
  font-size: 15px;
  background-color: white;

}
.eachMeal {
  border-style:solid;
  border-width: thin;
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 5px;

}
</style>
