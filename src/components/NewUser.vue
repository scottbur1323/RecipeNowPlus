<template>
  <div id="newUser">
    <section>
      <section id="form" class="userNameInput" v-show="true">
        <h1>Create User</h1>
        <div class="question">
          <input type="text" v-model="createNameInput" required/>
          <label>Username</label>
        </div>
        <div class="question">
          <input type="text" v-model="createPasswordInput" required/>
          <label>Password</label>
        </div>
        <div class="question">
          <input type="text" v-model="createPasswordCheckInput" @keyup.enter="checkNewUser()" required/>
          <label>Password Confirm</label>
          <p v-show="passwordsDontMatch">Passwords do not match!</p>
          <p v-show="creatingUser">Creating user...</p>
          <p v-show="userNameAlreadyExists">Username already exists</p>
          <p v-show="noSpecialCharacters">Cannot use any special characters</p>
        </div>
        <div id="loginButtons">
          <button @click="checkNewUser">Create it!</button>
          <button @click="goBackToLogin">Back to Login</button>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NewUser',
  data () {
    return {
      newUserName: '',
      createNameInput: '',
      createPasswordInput: '',
      createPasswordCheckInput: '',
      passwordsDontMatch: false,
      creatingUser: false,
      userNameAlreadyExists: false,
      noSpecialCharacters: false
    }
  },
  props: ['usersAPIdata'],
  methods: {
    checkNewUser: function() {
      if (this.createPasswordInput == this.createPasswordCheckInput) {
        let self = this
        if (this.checkForHackers(this.createPasswordInput, this.createNameInput)) {
            if (this.checkForExistingUser(this.createNameInput)) {
              let areYouSure = confirm(`Are you sure you want to create the user: ${this.createNameInput}`)
              if (areYouSure) {
                let self = this
                setTimeout(function(){
                  self.creatingUser = false
                  location.reload()
                }, 3000)
                this.creatingUser = true
                this.passwordsDontMatch = false
                this.userNameAlreadyExists = false
                this.noSpecialCharacters = false
                this.addTheNewUserToDB(this.createNameInput, this.createPasswordInput)
              }
              return
            }
        }
      } else {
        let self = this
        setTimeout(function(){
          self.passwordsDontMatch = false
        }, 3000)
        this.passwordsDontMatch = true
        this.creatingUser = false
        this.userNameAlreadyExists = false
        this.noSpecialCharacters = false
      }
    },
    checkForHackers: function(password, username) {
      let letterNumber = /^[0-9a-zA-Z]+$/
      if(password.match(letterNumber)) {
      } else {
        let self = this
        setTimeout(function(){
          self.noSpecialCharacters = false
        }, 3000)
        this.noSpecialCharacters = true
        this.creatingUser = false
        this.passwordsDontMatch = false
        this.userNameAlreadyExists = false
        return false
      }
      if(username.match(letterNumber)) {
      } else {
        let self = this
        setTimeout(function(){
          self.noSpecialCharacters = false
        }, 3000)
        this.noSpecialCharacters = true
        this.creatingUser = false
        this.passwordsDontMatch = false
        this.userNameAlreadyExists = false
        return false
      }
      return true
    },
    checkForExistingUser: function(username) {
        for (let i=0;i<this.usersAPIdata.length;i++) {
          if (this.usersAPIdata[i].userName == username.toLowerCase()) {
            let self = this
            setTimeout(function(){
              self.userNameAlreadyExists = false
            }, 4000)
            this.userNameAlreadyExists = true
            return false
          }
        }
        return true
    },
    goBackToLogin: function() {
      this.$emit('goHome')
    },
    addTheNewUserToDB: function(userName, password) {
      // fetch('http://localhost:3000/users-table', {
      fetch('https://recipe-now-server-heroku.herokuapp.com/users-table/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          "userName": userName.toLowerCase(),
          "password": password.toLowerCase(),
          "mealIDs":"1,2,3",
          "savedLists":"",
          "justInCase":""
        })
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
    }
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
html {
  background-color: #ff4a56;
}
#form {
  position: relative;
  display: inline-block;
  max-width: 500px;
  min-width: 300px;
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
  margin-top: 6px;
}
#form .question input[type="text"]:valid {
  margin-top: 6px;
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
#login {
  min-width: 100vw;
}
.userNameInput {
  max-width: 85vw;
}
p {
  text-align: center;
  margin-bottom: -34px;
}
</style>
