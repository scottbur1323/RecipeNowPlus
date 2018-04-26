<template>
  <div id="home">
    <button id="logoutButton" @click="userLogout">Logout</button>
    <app-search-meals :mealsAPIdata="mealsAPIdata" :currentUser="currentUser" id="searchPage" v-show="showSearch" @goHome="leaveSearchPage($event)" @addedAMeal="refreshMeals($event)"></app-search-meals>
    <app-grocery-list v-show="showGroceryList" @goHome="leaveSearchPage($event)" :selectedIngredients="selectedIngredients" :mealsToListIngredients="mealsToListIngredients"></app-grocery-list>
    <section v-show="showHome" class="wholeMealsSection">
      <div id="homeButtons">
        <button v-show="showMeals" @click="clickGroceryList">Grocery List</button>
        <button v-show="showMeals" @click="showTheSearch">Search for Meals</button>
        <button v-show="showMeals" @click="showTheDeletes">Delete Meal</button>
        <!-- <button v-show="showMeals" @click="showTheUpdates">Update Meal</button> -->
        <button v-show="showUpdates" @click="goHome">Go Back</button>
        <button v-show="showDeletes" @click="goHome">Go Back</button>
      </div>
      <section id="form" v-show="showMeals">
        <h1 id="selectedCounter">{{ selectedMeals.length }}</h1>
        <h2>{{ currentUser.userName }}'s Meals</h2>
        <h3>Click a meal to add to List</h3>
        <div id="mealCardBox">
          <div v-for="(meal, index) in usersMealsArray">
              <section id="meal.id" class="myMealCard" @click="clickMeal(meal.id, $event)">
                <img class="cardImage":src="meal.picURL">
                <p class="mealName">{{ meal.mealName }}</p>
              </section>
          </div>
        </div>
        <!-- <h4 v-show="amountSelected">Meals Selected: {{ selectedMeals.length }}</h4> -->
      </section>
      <section id="form" v-show="showDeletes">
        <h2>{{ currentUser.userName }}'s Meals</h2>
        <h3>Click a meal to delete it</h3>
        <div id="mealCardBox">
          <div v-for="(meal,index) in usersMealsArray">
            <h1>{{ index }}</h1>
              <section id="meal.id" class="myMealCard" @click="clickDelete(meal.id)" style="background-color: #DA9A98;">
                <img class="cardImage":src="meal.picURL">
                <p class="mealName">{{ meal.mealName }}</p>
              </section>
          </div>
        </div>
      </section>
      <section id="form" v-show="showUpdates">
        <h2>{{ currentUser.userName }}'s Meals</h2>
        <h3>Click Meals to add to Grocery List</h3>
        <div id="mealCardBox">
          <div v-for="meal in usersMealsArray">

              <section id="meal.id" class="myMealCard" @click="clickUpdate(meal.id)" style="background-color: #8CADE5;">
                <img class="cardImage":src="meal.picURL">
                <p class="mealName">{{ meal.mealName }}</p>
              </section>
          </div>
        </div>
      </section>
      <div id="homeButtons2">
        <button v-show="showMeals" @click="clickGroceryList">Grocery List</button>
        <button v-show="showMeals"  @click="showTheSearch">Search for Meals</button>
        <button v-show="showMeals" @click="showTheDeletes">Delete Meal</button>
        <!-- <button v-show="showMeals" @click="showTheUpdates">Update Meal</button> -->
        <button v-show="showUpdates" @click="goHome">Go Back</button>
        <button v-show="showDeletes" @click="goHome">Go Back</button>
      </div>
    </section>
  </div>
</template>

<script>
import SearchMeals from './SearchMeals'
import GroceryList from './GroceryList'

export default {
  name: 'Home',
  data () {
    return {
      selectedMeals: [],
      selectedIngredients: [],
      mealsToListIngredients: [],
      amountSelected: false,
      showHome: true,
      showMeals: true,
      showDeletes: false,
      showUpdates: false,
      showSearch: false,
      showGroceryList: false,
      shouldDelete: false,
      shouldUpdate: false,
      usersMealsArray: [],
      putTheUserMeals: ''
    }
  },
  props: ['mealsAPIdata', 'currentUser'],
  watch: {
    currentUser: function() {
      this.selectUserMeals()
    }
  },
  methods: {
    selectUserMeals: function() {
      let usersMealIDs = this.currentUser.mealIDs.split(',')
      let usersMealsArray = []
      for (let i=0;i<this.mealsAPIdata.length;i++) {
        for (let j=0;j<usersMealIDs.length;j++) {
            if (this.mealsAPIdata[i].id == usersMealIDs[j]) {
              usersMealsArray.push(this.mealsAPIdata[i])
            }
        }
      }
      this.usersMealsArray = usersMealsArray
      return usersMealsArray
    },
    leaveSearchPage: function(event) {
      this.showTheHome()
    },
    refreshMeals: function() {
      this.$emit('refreshMeals')
      this.selectUserMeals()
    },
    userLogout: function() {
      location.reload()
    },
    clickMeal: function(mealID, event) {
      for (let i=0;i<this.selectedMeals.length;i++) {
        if (mealID == this.selectedMeals[i]) {
          this.selectedMeals.splice(i, 1)
          this.updateTotalSelected(event, mealID)

          //take away shade
          this.rollbackOpacity(event)
          // event.target.style.opacity = 1

          return
        }
      }
      this.selectedMeals.push(mealID)

      //add shade
      this.makeOpacity(event)
      // event.target.style.opacity = 0.2

      this.updateTotalSelected(event, mealID)
      return
    },
    makeOpacity: function(event) {
      if (event.target.localName == 'img' || event.target.localName == 'p') {
          event.target.parentElement.style.opacity = 0.2
      } else event.target.style.opacity = 0.2
    },
    rollbackOpacity: function(event) {
      if (event.target.localName == 'img' || event.target.localName == 'p') {
          event.target.parentElement.style.opacity = 1
      } else event.target.style.opacity = 1
    },
    clickDelete: function(mealID) {
      this.shouldDelete = confirm("Are you sure you want to delete this meal?")
      if (this.shouldDelete == true) {
        this.actuallyDeleteMeal(mealID)
      } else {
        alert("Meal NOT deleted.")
      }
    },
    clickUpdate: function(mealID) {
      this.shouldUpdate = confirm("Are you sure you want to update this meal?")
      if (this.shouldUpdate == true) {
        this.actuallyUpdateMeal(mealID)
      } else {
        alert("Meal NOT updated.")
      }
    },
    updateTotalSelected: function(event, mealID) {
      if (this.selectedMeals.length == 0) {
        this.amountSelected = false
      } else this.amountSelected = true
    },
    clickGroceryList: function() {
      if (this.selectedMeals.length < 1) {
        alert("Please select at least one meal to make a grocery list!")
        return
      }
      this.mealsToListIngredients = []
      for (let i=0;i<this.selectedMeals.length;i++) {
        for (let j=0;j<this.mealsAPIdata.length;j++) {
          if (this.mealsAPIdata[j].id == this.selectedMeals[i]) {
            this.mealsToListIngredients.push(this.mealsAPIdata[j])
          }
        }
      }
      this.showTheGroceryList()
    },
    actuallyDeleteMeal: function(mealID) {
      let newUserMealsArray = this.currentUser.mealIDs.split(',')
      let index = newUserMealsArray.indexOf(mealID)
      newUserMealsArray.splice(index, 1)
      let newUserMealsString = ''
      for (let i=0;i<newUserMealsArray.length;i++) {
          if (i===0) {
              newUserMealsString = newUserMealsArray[i]
          } else newUserMealsString = newUserMealsString + ',' + newUserMealsArray[i]
      }
      // let deleteUrl = 'http://localhost:3000/users-table/' + this.currentUser.id
      let deleteUrl = 'https://recipe-now-server-heroku.herokuapp.com/users-table/' + this.currentUser.id
      fetch(deleteUrl, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({'mealIDs': newUserMealsString})
      })
      .then(function(res) {
        return res.json()
      })
      .then(function(res) {
        return res
      })
      .catch(function(error) {
        console.log(error)
      })
      this.removeFromUserData(mealID)
    },
    removeFromUserData: function(mealID) {
      for (let i=0;i<this.usersMealsArray.length;i++) {
          if (mealID == this.usersMealsArray[i].id) {
              this.usersMealsArray.splice(i, 1)
          }
      }
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
      this.showHome = false
      this.showGroceryList = false
      this.showSearch = true
    },
    showTheHome: function() {
      this.showGroceryList = false
      this.showSearch = false
      this.showHome = true
    },
    showTheGroceryList: function() {
      this.showHome = false
      this.showSearch = false
      this.showGroceryList = true
    }
  },
  components: {
    appSearchMeals: SearchMeals,
    appGroceryList: GroceryList
  }
}
</script>

<style scoped>
/* DESKTOP */
@media screen and (min-width: 701px) {
  h1 {
    position: absolute;
    margin-top: 1px;
    margin-left: 20px;
    padding-top: 0px;
    color: white;
    font-size: 79px;
  }
  #selectedCounter {
    position: absolute;
    margin-top: 2px;
    padding-top: 0px;
    color: white;
    font-size: 79px;
    left: 4vw;
    top: 0;
  }
  #logoutButton {
    position: fixed;
    top: 12px;
    right: 5vw;
    width: 60px;
    font-variant: small-caps;
  }
  * {
    font-family: Helvetica, sans-serif;
    font-weight: light;
    -webkit-font-smoothing: antialiased;
  }
  h3 {
    font-size: 15px;
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: center;
    color: #B42B32;
    padding-bottom: 5px;
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
  #home {
    display: flex;
    justify-content: center;
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
  .myMealCard {
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items: center;
    border-radius: 15px;
    background-color: #FBFBFB;
    border-style: solid;
    border-width: thin;
    border-color: black;
    width: 105px;
    height: 130px;
    overflow-y: hidden;
    overflow-x: hidden;
    margin: 10px;
  }
  .myMealCard:hover {
    background-color: #ED585C;
    color:white;
    cursor: pointer;
  }
  p {
    text-align: center;
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
  .mealName {
    text-align: center;
    font-size: 14px;
  }
  .wholeMealsSection {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
}
/* MOBILE */
@media screen and (max-width: 700px) {
  #selectedCounter {
      visibility: hidden;
  }
  h1 {
    position: absolute;
    margin-top: 1px;
    margin-left: 20px;
    padding-top: 0px;
    color: white;
    font-size: 79px;
  }
  #logoutButton {
    position: fixed;
    top: 18px;
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
    color: #B42B32;
  }
  h2 {
    font-size: 30px;
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: center;
    color: white;
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
    border-width: medium;
    border-color: rgba(255,255,255,1);
    border-style: solid;
    margin-bottom: 2vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(125,125,125,.8);

    border-radius: 10px;
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
    border-color: black;
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
    border-color: black;
    width: 105px;
    height: 130px;
    overflow-y: hidden;
    overflow-x: hidden;
    margin: 10px;
  }
  .myMealCard:hover {
    background-color: #ED585C;
    color:white;
  }
  p {
    text-align: center;
  }
  h3 {
    font-size: 18px;
    display: flex;
    justify-content: center;
    color: #B42B32;
    margin-bottom: 1vh;
  }
  #homeButtons {
    max-width: 100vw;
    min-width: 310px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    margin-top: 2vh;
    margin-bottom: 2vh;
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
  .mealName {
    text-align: center;
    font-size: 14px;
  }
  .wholeMealsSection {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
}
</style>
