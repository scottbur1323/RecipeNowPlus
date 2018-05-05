<template>
  <div>
    <section class="wholeMealsSection">
      <div id="homeButtons">
        <button @click="passItUp">Back to Home</button>
      </div>
      <section id="form">
        <h2>Search For Meals</h2>
        <div class="question">
          <input v-model="userSearchData" @keyup.enter="searchForRecipes" type="text" required/>
        </div>
        <button @click="searchForRecipes">Search</button>
        <h3>Click Meals to add to Add to Saved Meals</h3>
        <div id="mealCardBox">
          <div v-for="meal in searchedMealData">
              <section id="meal.recipe_id" class="myMealCard" @click="addToMyMeals(meal.recipe_id)">
                <img class="cardImage" :src="meal.image_url">
                <p class="mealName">{{ meal.title }}</p>
              </section>
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
  name: 'SearchMeals',
  data () {
    return {
      msg: false,
      userSearchData: '',
      searchedMealData: [],
      ingredientsToAddArray: [],
      ingredientsToAddString: '',
      mealIdToAdd: 0,
      mealToAdd: {}
    }
  },
  props: ['mealsAPIdata', 'currentUser'],
  methods: {
    passItUp: function() {
      this.$emit('goHome')
    },
    mealWasAdded: function() {
      for (let i=0;i<this.searchedMealData.length;i++) {
        if (this.searchedMealData[i].recipe_id == this.mealIdToAdd) {
          this.searchedMealData.splice(i, 1)
        }
      }
      let self = this;
      setTimeout(function(){
        self.$emit('addedAMeal')
      }, 5000)
      this.$emit('addedAMeal')
    },
    searchForRecipes: function() {
      // fetch('http://localhost:3000/f2f', {
      fetch('https://recipe-now-server-heroku.herokuapp.com/f2f', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({'items': this.userSearchData})
      })
      .then(function(response) {
        return response.json()
      })
      .then(response => {
        return this.searchedMealData = response
      })
      .catch(function(error) {
        console.log(error)
      })
    },
    addToMyMeals: function(mealID) {
      this.mealIdToAdd = mealID
      console.log(this.searchedMealData)
      for (let i=0;i<this.searchedMealData.length;i++) {
        if (this.searchedMealData[i].recipe_id == mealID) {
          // fetch('http://localhost:3000/f2fi', {
          fetch('https://recipe-now-server-heroku.herokuapp.com/f2fi', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({'id': mealID})
          })
          .then(response => {
            return response.json()
          })
          .then(ingredients => {
              this.ingredientsToAddString = ''
              for (let j=0;j<ingredients.length;j++) {
                let cleanIngredient = ''
                if (j==0) {
                  if (ingredients[0].includes('&') && ingredients[0].includes('&')) {
                    cleanIngredient = ingredients[0].splice(ingredients[0].indexOf('&'), ingredients[0].indexOf('&') - ingredients[0].indexOf(';'))
                    this.ingredientsToAddString = cleanIngredient
                  } else this.ingredientsToAddString = ingredients[0]
                } else {
                  if (ingredients[j].includes('&') && ingredients[j].includes(';')) {
                    cleanIngredient = ingredients[j].splice(ingredients[j].indexOf('&'), ingredients[j].indexOf('&') - ingredients[j].indexOf(';'))
                    this.ingredientsToAddString = cleanIngredient
                  } else this.ingredientsToAddString = this.ingredientsToAddString + "$" + ingredients[j]
                }
              }
              this.mealToAdd = {
                mealName: this.searchedMealData[i].title,
                picURL: this.searchedMealData[i].image_url,
                instructionsURL: this.searchedMealData[i].source_url,
                ingredients: this.ingredientsToAddString
              }
              let yesDelete = confirm(`Are you sure you want to add ${this.searchedMealData[i].title} to your meals?`)
              if (yesDelete) {
                // return fetch('http://localhost:3000/meals-table', {
                return fetch('https://recipe-now-server-heroku.herokuapp.com/meals-table', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(this.mealToAdd)
                  })
                  .then(response => {
                    return response.json()
                  })
                  .then(response => {
                    let theMealId = response.meals.id.toString()
                    // let fetchURL = 'http://localhost:3000/users-table/' + this.currentUser.id
                    let fetchURL = 'https://recipe-now-server-heroku.herokuapp.com/users-table/' + this.currentUser.id
                    this.putMealsToUser(fetchURL, theMealId)
                  })
                  .catch(function(error) {
                    console.log(error)
                  })
              } else alert(`${this.searchedMealData[i].title} was not added to your meals.`)
          })
          .catch(function(error) {
            console.log(error)
          })
        }
      }
    },
    putMealsToUser: function(fetchURL, theMealId) {
      fetch(fetchURL)
      .then(res => {
          return res.json()
      })
      .then(res => {
          let addMealToUser = this.currentUser.mealIDs + ',' + theMealId
          let putThis = {'mealIDs': addMealToUser}
          fetch(fetchURL, {
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              method: 'PUT',
              body: JSON.stringify(putThis)
          })
          .then(function(response) {
            return response.json()
          })
          .then(response => {
            this.mealWasAdded()
            return response
          })
          .catch(function(error) {
            console.log(error)
          })
      })
    }
  }
}
</script>

<style scoped>
/* DESKTOP */
@media screen and (min-width: 701px) {
  #form .question input[type="text"] {
    appearance: none;
    background-color: none;
    border: 1px solid #ff4a56;
    line-height: 0;
    font-size: 17px;
    max-width: 110px;
    max-height: 10px;
    padding: 10px 15px;
    border-radius: 60px;
    color: #ff4a56;
    font-weight: 100;
    letter-spacing: 0.01em;
    z-index: 1;
  }
  #form .question input[type="text"]:focus {
    outline: none;
    background: #ff4a56;
    color: white;
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
    align-items:center;
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

  .mealName {
    text-align: center;
    font-size: 11px;
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
}
/* MOBILE */
@media screen and (max-width: 700px) {
  #form .question input[type="text"] {
    appearance: none;
    background-color: none;
    border: 1px solid #ff4a56;
    line-height: 0;
    font-size: 17px;
    max-width: 110px;
    max-height: 10px;
    padding: 10px 15px;
    border-radius: 60px;
    color: #ff4a56;
    font-weight: 100;
    letter-spacing: 0.01em;
    z-index: 1;
  }
  #form .question input[type="text"]:focus {
    outline: none;
    background: #ff4a56;
    color: white;
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
    color: #ff4a56;
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

  .mealName {
    text-align: center;
    font-size: 11px;
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
}
</style>
