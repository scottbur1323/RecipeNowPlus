<template>
  <div>
    <app-new-user v-show="showNewUser" @goHome="goToLoginPage" :usersAPIdata="usersAPIdata"></app-new-user>
    <app-home :mealsAPIdata="mealsAPIdata" :currentUser="currentUser" v-show="showHome" @refreshMeals="hitThatAPI"></app-home>
    <section v-show="showLogin">
      <section id="form" class="userNameInput">
        <h1>Login</h1>
        <button @click="goToHomePage" class="goHomeButton" type="button" v-show="loginCheck">Go To Home Page!</button>
        <div class="question">
          <input type="text" v-model="userNameInput" v-show="loginInfo" autofocus required/>
          <label v-show="loginInfo">Username</label>
        </div>
        <div class="question">
          <input type="text" @keyup.enter="checkTheUser" v-model="userPasswordInput"  v-show="loginInfo" required/>
          <label v-show="loginInfo">Password</label>
        </div>
        <div id="loginButtons">
          <button @click="checkTheUser" v-show="loginInfo">Login</button>
          <button v-show="loginInfo" @click="goToNewUserPage">Create Account</button>
        </div>
        <p v-show="loginCheck">You have successfully logged in!</p>
        <p v-show="imposter">IMPOSTER!  Username and/or password don't exist or don't match!</p>
      </section>
    </section>
  </div>
</template>

<script>
import Home from './Home'
import NewUser from './NewUser'

export default {
  name: 'Login',
  data () {
    return {
      // mealsAPI: 'http://localhost:3000/meals-table/',
      // usersAPI: 'http://localhost:3000/users-table/',
      mealsAPI: 'https://recipe-now-server-heroku.herokuapp.com/meals-table/',
      usersAPI: 'https://recipe-now-server-heroku.herokuapp.com/users-table/',
      mealsAPIdata: '',
      usersAPIdata: '',
      userNameInput: '',
      userPasswordInput: '',
      loginCheck: false,
      imposter: false,
      showLogin: true,
      showNewUser: false,
      showHome: false,
      loginInfo: true,
      currentUser: {},
      showNewUser: false
    }
  },
  watch: {
    usersAPIdata: function() {
      if (this.currentUser !== {}) {
        for (let i=0;i<this.usersAPIdata.length;i++) {
          if (this.currentUser.id == this.usersAPIdata[i].id) {
            this.currentUser = this.usersAPIdata[i]
          }
        }
      }
    }
  },
  methods: {
    hitThatAPI: function() {
      fetch(this.usersAPI)
      .then(res => {
          return res.json()
      })
      .then(res => {
        this.usersAPIdata = res.users
        this.hitThatAPI2()
      })
    },
    hitThatAPI2: function() {
      fetch(this.mealsAPI)
      .then(res => {
          return res.json()
      })
      .then(res => {
          this.mealsAPIdata = res.meals
          return res
      })
    },
    checkTheUser: function() {
      this.hitThatAPI()
      this.userNameInput = this.userNameInput.toLowerCase()
      this.userPasswordInput = this.userPasswordInput.toLowerCase()
      for (let i=0;i<this.usersAPIdata.length;i++) {
        if (this.userNameInput == this.usersAPIdata[i].userName) {
          if (this.userPasswordInput == this.usersAPIdata[i].password) {
            this.imposter = false
            this.loginCheck = true
            this.loginInfo = false
            this.currentUser = this.usersAPIdata[i]
            return
          }
        }
      }
      let self = this
      setTimeout(function(){
        self.imposter = false
      }, 4000)
      this.imposter = true
    },
    goToHomePage: function() {
        this.showLogin = false
        this.showNewUser = false
        this.showHome = true
    },
    goToNewUserPage: function() {
        this.showLogin = false
        this.showHome = false
        this.showNewUser = true
    },
    goToLoginPage: function() {
        this.showHome = false
        this.showNewUser = false
        this.showLogin = true
    }
  },
  components: {
    appHome: Home,
    appNewUser: NewUser
  },
  mounted() {
    this.hitThatAPI()
  }
}
</script>

<style scoped>
.transition, #form button, #form .question label, #form .question input[type="text"] {
  -moz-transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);
  -o-transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);
  -webkit-transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);
  transition: all 0.25s cubic-bezier(0.53, 0.01, 0.35, 1.5);
}
* {
  font-family: Helvetica, sans-serif;
  font-weight: light;
  -webkit-font-smoothing: antialiased;
}
#form {
  position: relative;
  display: inline-block;
  max-width: 310px;
  min-width: 310px;
  box-sizing: border-box;
  padding: 30px 25px;
  background-color: white;
  border-radius: 40px;
  margin: 40px 0;
  left: 50%;
  -moz-transform: translate(-50%, 0);
  -ms-transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
#form h1 {
  color: #ff4a56;
  font-weight: 100;
  letter-spacing: 0.01em;
  margin-bottom: 35px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  padding-right: 10px;
}
#form button {
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
#form button:hover, #form button:focus {
  color: white;
  background-color: #ff4a56;
}
#form .question {
  position: relative;
  padding: 10px 0;
}
#form .question:first-of-type {
  padding-top: 0;
}
#form .question:last-of-type {
  padding-bottom: 0;
}
#form .question label {
  transform-origin: left center;
  color: #ff4a56;
  font-weight: 100;
  letter-spacing: 0.01em;
  font-size: 17px;
  box-sizing: border-box;
  padding: 10px 15px;
  display: block;
  position: absolute;
  margin-top: -40px;
  z-index: 2;
  pointer-events: none;
}
#form .question input[type="text"] {
  appearance: none;
  background-color: none;
  border: 1px solid #ff4a56;
  line-height: 0;
  font-size: 17px;
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding: 10px 15px;
  border-radius: 60px;
  color: #ff4a56;
  font-weight: 100;
  letter-spacing: 0.01em;
  position: relative;
  z-index: 1;
}
#form .question input[type="text"]:focus {
  outline: none;
  background: #ff4a56;
  color: white;
  margin-top: 30px;
}
#form .question input[type="text"]:valid {
  margin-top: 30px;
}
#form .question input[type="text"]:focus ~ label {
  -moz-transform: translate(0, -35px);
  -ms-transform: translate(0, -35px);
  -webkit-transform: translate(0, -35px);
  transform: translate(0, -35px);
}
#form .question input[type="text"]:valid ~ label {
  text-transform: uppercase;
  font-style: italic;
  -moz-transform: translate(5px, -35px) scale(0.6);
  -ms-transform: translate(5px, -35px) scale(0.6);
  -webkit-transform: translate(5px, -35px) scale(0.6);
  transform: translate(5px, -35px) scale(0.6);
}
#loginButtons {
  display: flex;
  justify-content: space-between;
}
.userNameInput {
  max-width: 85vw;
}
p {
  text-align: center;
  max-width: 85vw;
}
app-home {
  height: 100%;
}
.goHomeButton {
  margin-left: 35px;
}
</style>
