<template>

  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Sign In</h5>
            <form class="form-signin" v-on:submit="loginOld">
              <div class="form-label-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="form-control"
                  placeholder="Email address"
                  required
                  autofocus
                  v-model.trim="$v.email.$model"
                  :class="{'is-invalid':$v.email.$error,'is-valid':!$v.email.$invalid}"
                />
                <!-- <label for="inputEmail">Email address</label> -->
              </div>
              <div class="valid-feedback">Your email is valid!</div>
              <div class="invalid-feedback">
                <span v-if="!$v.email.required">Email is required.</span>
                <span v-if="!$v.email.isUnique">This email is already registered.</span>
              </div>
              <br />
              <div class="form-label-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="form-control"
                  placeholder="Password"
                  required
                  v-model.trim="$v.password.$model"
                  :class="{'is-invalid':$v.password.$error,'is-valid':!$v.password.$invalid}"
                />
                <!-- <label for="password">Password</label> -->
              </div>

              <div class="valid-feedback">Your password is valid!</div>
              <div class="invalid-feedback">
                <span v-if="!$v.password.required">Password is required.</span>
                <span
                  v-if="!$v.password.minLength"
                >{{$v.password.$params.minLength.min}} characters minimum.</span>
              </div>
              <br />
              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                <label class="custom-control-label" for="customCheck1">Remember password</label>
              </div>

              <button
                class="btn btn-lg btn-dark btn-block text-uppercase"
                type="submit"
                value="Login"
              >Sign in</button>
              
              <hr class="my-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  methods: {
    toggleShowPassword() {
      var show = document.getElementById("password");
      if (this.showpassword == false) {
        this.showpassowrd = true;
        show.type = "text";
      } else {
        this.showpassword = false;
        show.type = "password";
      }
    },
    submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitstatus = "FAIL";
      } else {
        this.submitstatus = "SUCCESS";
      }
    },
    loginOld: e => {
      // eslint-disable-next-line no-console
      // console.log(this.$router);
      // eslint-disable-next-line no-console
      // console.log(this.$store);
      var login_status = false;
      e.preventDefault();
      let email = e.target.elements.email.value;
      let password = e.target.elements.password.value;

      let login = () => {
      
        let data = {
          email: email,
          password: password
        };

        fetch("api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(data)
        }) .then(res => res.json()) //returning a promise To extract the JSON body content from the response
        .then(resJson => {
          window.$cookies = resJson.token+";"+data.email;
            // eslint-disable-next-line no-console
            console.log(window.$cookies);
            login_status = true;
            window.location.href = 'http://localhost:8080/#/loan-page';
            
            
        })
          .catch(err=>{
            // eslint-disable-next-line no-console
            console.log(err);
          });
          return login_status;
      };
      if(login()){
        
        this.$router.push({name: "LoanPage"});
      }
    },
    TestMe() {
      fetch("api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-access-token": window.$cookies.split(";")[0]
        },
      })
        .then(function(response) {
          response.json();
        });
        // .then(function(data) {
        //   // eslint-disable-next-line no-console
        //   console.log(data);
        //   this.submitstatus = true;
        // });
    }
  }
};
</script>