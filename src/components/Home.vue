<template>
  <div id="home">
    <section class="wholeMealsSection">
      <div id="homeButtons">
        <button>Grocery List</button>
        <button>Search for Meals</button>
        <br/>
        <button>Delete Meal</button>
        <button>Update Meal</button>
      </div>
      <section id="form">
        <h2>{{ currentUser.userName }}'s  Meals</h2>
        <button @click="userLogout">Logout</button>
        <h3>Click Meals to add to Grocery List</h3>
        <div id="mealCardBox">
          <div v-for="meal in mealsAPIdata">
              <section class="myMealCard">
                <img class="cardImage":src="meal.picURL" alt="">
                <p>{{ meal.mealName }}</p>
              </section>
          </div>
        </div>
      </section>
      <div id="homeButtons2">
        <button>Grocery List</button>
        <button>Search for Meals</button>
        <br/>
        <button>Delete Meal</button>
        <button>Update Meal</button>
      </div>
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
  props: ['mealsAPIdata', 'currentUser'],
  methods: {
    userLogout: function() {
      location.reload()
    }
  }
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
  min-width: 100vw;
  min-width: 310px;
  box-sizing: border-box;
  padding: 5px 20px;
  background-color: rgba(255,255,255,0.6);
  border-radius: 30px;
  border-width: thin;
  border-color: grey;
  border-style: solid;
  margin-bottom: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#mealCardBox {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
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
</style>
