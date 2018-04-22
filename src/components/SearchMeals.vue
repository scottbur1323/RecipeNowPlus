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
      mealToAdd: {}
    }
  },
  methods: {
    passItUp: function() {
      this.$emit('goHome')
    },
    searchForRecipes: function() {
      fetch('http://localhost:3000/f2f', {
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
      console.log(mealID)
      console.log(this.searchedMealData.length)
      for (let i=0;i<this.searchedMealData.length;i++) {
        if (this.searchedMealData[i].recipe_id == mealID) {
          fetch('http://localhost:3000/f2fi', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({'id': mealID})
          })
          .then(function(response) {
            return response.json()
          })
          .then(ingredients => {
              console.log(ingredients)
              this.ingredientsToAddString = ''
              for (let j=0;j<ingredients.length;j++) {
                if (j==0) {
                  this.ingredientsToAddString = ingredients[0]
                } else this.ingredientsToAddString = this.ingredientsToAddString + ", " + ingredients[j]
              }
              this.mealToAdd = {
                mealName: this.searchedMealData[i].title,
                picURL: this.searchedMealData[i].image_url,
                instructionsURL: this.searchedMealData[i].source_url,
                ingredients: this.ingredientsToAddString
              }
              fetch('http://localhost:3000/', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(this.mealToAdd)
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
          })
          .catch(function(error) {
            console.log(error)
          })

        }
      }
    }
  }
}
</script>

<style scoped>
/* .transition, #form button, #form .question label, #form .question input[type="text"] {
  -moz-transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);
  -o-transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);
  -webkit-transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);
  transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);
} */
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
  background-color: rgba(255,255,255,0.8);
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
  min-height: 65px;
  max-height: 65px;
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
.mealName {
  text-align: center;
  font-size: 11px;
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
