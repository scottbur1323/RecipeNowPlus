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
/* DESKTOP */
@media screen and (min-width: 701px) {
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
    font-size: 40px;
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: center;
    color: white;
    padding-bottom: 10px;
  }
  section #form {
    position: relative;
    max-width: 80vw;
    min-width: 80vw;
    box-sizing: border-box;
    padding: 5px 20px;
    background-color: rgba(125,125,125,.8);
    border-width: thin;
    border-color: rgba(255,255,255,1);
    border-style: solid;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    justify-content: center;
    align-items:center;
    padding-bottom: 25px;
  }
  #mealCardBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
  button {
    margin-bottom: 2vh;
    margin-top: 2vh;
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
    color: #ED585C;
    font-weight: 100;
    letter-spacing: 0.01em;
    position: relative;
    z-index: 1;
    margin-left: 2px;
    margin-right: 2px;
    width: 120px;

  }
  button:hover, button:focus {
    color: white;
    background-color: #ff4a56;
  }
  .cardImage {
    width: 105px;
    height: 65px;
    border-radius: 6px;
    border-style: solid;
    border-width: thin;
    border-color: black;
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
    max-width: 90%;
    border-style:solid;
    border-width: thin;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-left: none;
    border-right: none;
  }
}
/* MOBILE */
@media screen and (max-width: 700px) {
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
    font-size: 40px;
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: center;
    color: white;
    padding-bottom: 10px;
  }
  section #form {
    position: relative;
    max-width: 100vw;
    min-width: 100vw;
    box-sizing: border-box;
    padding: 5px 20px;
    background-color: rgba(125,125,125,.8);
    border-width: thin;
    border-color: rgba(255,255,255,1);
    border-style: solid;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    justify-content: center;
    align-items:center;
    padding-bottom: 25px;
  }
  #mealCardBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
  button {
    margin-bottom: 2vh;
    margin-top: 2vh;
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
    color: #ED585C;
    font-weight: 100;
    letter-spacing: 0.01em;
    position: relative;
    z-index: 1;
    margin-left: 2px;
    margin-right: 2px;
    width: 120px;

  }
  button:hover, button:focus {
    color: white;
    background-color: #ff4a56;
  }
  .cardImage {
    width: 105px;
    height: 65px;
    border-radius: 6px;
    border-style: solid;
    border-width: thin;
    border-color: black;
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
    max-width: 90%;
    border-style:solid;
    border-width: thin;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-left: none;
    border-right: none;
  }
}
</style>
