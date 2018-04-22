<template>
  <div id="home">
    <button id="logoutButton" @click="userLogout">Logout</button>
    <app-search-meals id="searchPage" v-show="showSearch" @goHome="leaveSearchPage($event)"></app-search-meals>
    <section v-show="showHome" class="wholeMealsSection">
      <div id="homeButtons">
        <button v-show="showMeals" @click="goToGroceryList">Grocery List</button>
        <button v-show="showMeals" @click="showTheSearch">Search for Meals</button>
        <button v-show="showMeals" @click="showTheDeletes">Delete Meal</button>
        <button v-show="showMeals" @click="showTheUpdates">Update Meal</button>
        <button v-show="showUpdates" @click="goHome">Go Back</button>
        <button v-show="showDeletes" @click="goHome">Go Back</button>
      </div>
      <section id="form" v-show="showMeals">
        <h2>{{ currentUser.userName }}'s  Meals</h2>
        <h3>Click Meals to add to Grocery List</h3>
        <div id="mealCardBox">
          <div v-for="meal in mealsAPIdata">
              <section id="meal.id" class="myMealCard" @click="clickMeal(meal.id)">
                <img class="cardImage":src="meal.picURL" alt="">
                <p>{{ meal.mealName }}</p>
              </section>
          </div>
        </div>
        <h4 v-show="amountSelected">Meals Selected: {{ selectedMeals.length }}</h4>
      </section>
      <section id="form" v-show="showDeletes">
        <h2>{{ currentUser.userName }}'s Meals</h2>
        <h3>Click Meals to add to Grocery List</h3>
        <div id="mealCardBox">
          <div v-for="meal in mealsAPIdata">
              <section id="meal.id" class="myMealCard" style="background-color: red;"@click="deleteMeal(meal.id)">
                <img class="cardImage":src="meal.picURL" alt="">
                <p>{{ meal.mealName }}</p>
              </section>
          </div>
        </div>
        <h4 v-show="amountSelected">Meals Selected: {{ selectedMeals.length }}</h4>
      </section>
      <section id="form" v-show="showUpdates">
        <h2>{{ currentUser.userName }}'s Meals</h2>
        <h3>Click Meals to add to Grocery List</h3>
        <div id="mealCardBox">
          <div v-for="meal in mealsAPIdata">
              <section id="meal.id" class="myMealCard" style="background-color: blue;"@click="updateMeal(meal.id)">
                <img class="cardImage":src="meal.picURL" alt="">
                <p>{{ meal.mealName }}</p>
              </section>
          </div>
        </div>
        <h4 v-show="amountSelected">Meals Selected: {{ selectedMeals.length }}</h4>
      </section>
      <div id="homeButtons2">
        <button v-show="showMeals" @click="goToGroceryList">Grocery List</button>
        <button v-show="showMeals"  @click="showTheSearch">Search for Meals</button>
        <button v-show="showMeals" @click="showTheDeletes">Delete Meal</button>
        <button v-show="showMeals" @click="showTheUpdates">Update Meal</button>
        <button v-show="showUpdates" @click="goHome">Go Back</button>
        <button v-show="showDeletes" @click="goHome">Go Back</button>
      </div>
    </section>
  </div>
</template>

<script>
import SearchMeals from './SearchMeals'

export default {
  name: 'Home',
  data () {
    return {
      selectedMeals: [],
      amountSelected: false,
      showHome: true,
      showMeals: true,
      showDeletes: false,
      showUpdates: false,
      showSearch: false,
      shouldDelete: false    }
  },
  props: ['mealsAPIdata', 'currentUser'],
  methods: {
    leaveSearchPage: function(event) {
        this.showTheHome()
    },
    userLogout: function() {
      location.reload()
    },
    clickMeal: function(mealID) {
      for (let i=0;i<this.selectedMeals.length;i++) {
        if (mealID == this.selectedMeals[i]) {
          this.selectedMeals.splice(i, 1)
          this.updateTotalSelected(event, mealID)
          event.target.style.opacity = 1
          console.log("Meal removed!")
          return
        }
      }
      this.selectedMeals.push(mealID)
      event.target.style.opacity = 0.2
      this.updateTotalSelected(event, mealID)
      console.log("Meal added!")
      return
    },
    updateTotalSelected: function(event, mealID) {
      if (this.selectedMeals.length == 0) {
        this.amountSelected = false
      } else this.amountSelected = true
    },
    goToGroceryList: function() {
      if (this.selectedMeals.length < 1) {
        alert("Select at least one meal to make a grocery list!")
        return
      }
    },
    deleteMeal: function(mealID) {
      this.shouldDelete = confirm("Are you sure you want to delete this meal?")
      if (this.shouldDelete == true) {
        this.actuallyDeleteMeal(mealID)
      } else {
        event.target.style.opacity = 1
        alert("Meal NOT deleted.")
      }
    },
    actuallyDeleteMeal: function(mealID) {
      alert("meal DELETED!")
    },
    showTheDeletes: function() {
      this.showMeals = false
      this.showUpdates = false
      this.showDeletes = true
    },
    showTheUpdates: function() {
      this.showMeals = false
      this.showDeletes = false
      this.showUpdates = true
    },
    goHome: function() {
      this.showMeals = true
      this.showUpdates = false
      this.showDeletes = false
    },
    showTheSearch: function () {
      this.showHome = false,
      this.showSearch = true
    },
    showTheHome: function() {
      this.showHome = true
      this.showSearch = false
    }
  },
  components: {
    appSearchMeals: SearchMeals,
  }
}
</script>

<style scoped>
#logoutButton {
  position: fixed;
  top: 20px;
  right: 5vw;
  width: 60px;
  font-variant: small-caps;
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
#home {
  display: flex;
  justify-content: center;
}
section #form {
  position: relative;
  min-width: 100vw;
  box-sizing: border-box;
  padding: 5px 20px;
  background-color: rgba(255,255,255,0.9);
  border-width: thin;
  border-color: rgba(255,255,255,1);
  border-style: solid;
  margin-bottom: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#mealCardBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  border-radius: 6px;
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
#searchPage {
  padding-bottom: 120px;
}
</style>
