<template>
  <div id="home">
    <section class="wholeMealsSection">
      <section id="form">
        <h2>My Meals</h2>
        <h3>Click Meals to add to Grocery List</h3>
        <div id="mealCardBox">
          <div v-for="meal in mealsAPIdata">
              <section class="myMealCard">
                <img class="cardImage":src="meal.picURL" alt="">
                <p>{{ meal.mealName }}</p>
              </section>
          </div>
        </div>
        <footer>
          <div id="loginButtons">
            <button @click="logIt">Test It</button>
            <!-- <button >Submit</button> -->
            <!-- <button >Submit</button> -->
            <!-- <router-link :to="{ name: 'SearchMeals' }">
              <button>Search For More Meals</button>
            </router-link> -->
          </div>
        </footer>
      </section>
    </section>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'YOU ARE HOME'
    }
  },
  methods: {
    logIt: function() {
      console.log(this.mealsAPIdata)
    }
  },
  props: ['mealsAPIdata'],
}
</script>

<style scoped>
* {
  font-family: Helvetica, sans-serif;
  font-weight: light;
  -webkit-font-smoothing: antialiased;
}
h2 {
  height: 30px;
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: center;
}
#home {
  display: flex;
  justify-content: center;
}
section #form {
  position: relative;
  width: 80vw;
  min-width: 310px;
  max-height: 83vh;
  box-sizing: border-box;
  padding: 5px 25px;
  background-color: white;
  border-radius: 30px;
  border-width: thin;
  border-color: grey;
  border-style: solid;
  margin-bottom: 3vh;
  padding-bottom: 100px;
  overflow-y: scroll;
}
#mealCardBox {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}
button {
  margin-top: 35px;
  background-color: white;
  border: 1px solid #ff4a56;
  line-height: 0;
  font-size: 17px;
  display: inline-block;
  box-sizing: border-box;
  padding: 20px 15px;
  border-radius: 60px;
  color: #ff4a56;
  font-weight: 100;
  letter-spacing: 0.01em;
  position: relative;
  z-index: 1;
}
button:hover, button:focus {
  color: white;
  background-color: #ff4a56;
}
.cardImage {
  width: 105px;
  height: 65px;
  border-radius: 15px;
  border-style: solid;
  border-width: thin;
  border-color: #BD292C;
  margin-top: -2px;
}
.myMealCard {
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: center;
  border-radius: 15px;
  background-color: #FBFBFB;
  border-style: solid;
  border-width: thin;
  border-color: #BD292C;
  width: 105px;
  height: 130px;
  overflow-y: hidden;
  overflow-x: hidden;
  margin: 10px;
  box-shadow: 0 0 15px white, 0 0 10px grey, 3px 0 3px grey;
}
p {
  text-align: center;
}
h3 {
  font-size: 12px;
  display: flex;
  justify-content: center;
}
#loginButtons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
}
</style>
