<template>
  <div class="card">
    <h3 class="card-header text-center">Loan Application</h3>
    <div class="card-body">
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>First Name</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="$v.firstname.$model"
              :class="{'is-invalid':$v.firstname.$error,'is-valid':!$v.firstname.$invalid}"
            />
            <div class="valid-feedback">Your first name is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.firstname.required">First name is required.</span>
              <span
                v-if="!$v.firstname.minLength"
              >First name must have at least {{$v.firstname.$params.minLength.min}}</span>
              <span
                v-if="!$v.firstname.minLength"
              >First name must have at most {{$v.firstname.$params.maxLength.max}}</span>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label>Last Name</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="$v.lastname.$model"
              :class="{'is-invalid':$v.lastname.$error,'is-valid':!$v.lastname.$invalid}"
            />
            <div class="valid-feedback">Your last name is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.lastname.required">Last name is required.</span>
              <span
                v-if="!$v.lastname.minLength"
              >Last name must have at least {{$v.lastname.$params.minLength.min}}</span>
              <span
                v-if="!$v.lastname.minLength"
              >Last name must have at most {{$v.lastname.$params.maxLength.max}}</span>
            </div>
          </div>
          <div class="form-group">
            <label>Username</label>
            <input
              type="text"
              class="form-control"
              v-model.trim="$v.username.$model"
              :class="{'is-invalid':$v.username.$error,'is-valid':!$v.username.$invalid}"
            />
            <div class="valid-feedback">Your username is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.username.required">Username is required.</span>
              <!-- <span v-if="!$v.username.isUnique">This username is already registered.</span> -->
            </div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              class="form-control"
              v-model.trim="$v.email.$model"
              :class="{'is-invalid':$v.email.$error,'is-valid':!$v.email.$invalid}"
            />
            <div class="valid-feedback">Your email is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.email.required">Email is required.</span>
              <span v-if="!$v.email.isUnique">This email is already registered.</span>
            </div>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model.trim="$v.password.$model"
              :class="{'is-invalid':$v.password.$error,'is-valid':!$v.password.$invalid}"
            />
            <div class="valid-feedback">Your password is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.password.required">Password is required.</span>
              <span
                v-if="!$v.password.minLength"
              >{{$v.password.$params.minLength.min}} characters minimum.</span>
            </div>
          </div>
          <div class="form-group form-check">
            <input
              type="checkbox"
              id="showpassword"
              class="form-check-input"
              @click="toggleShowPassword"
              v-model="showpassword"
            />
            <label class="form-check-label" for="showpassword">Show password</label>
          </div>
          <div class="form-group">
            <label>Repeat Password</label>
            <input
              type="password"
              class="form-control"
              v-model.trim="$v.repeatpassword.$model"
              :class="{'is-invalid': $v.repeatpassword.$error,'is-valid': (password != '') ? !$v.repeatpassword.$invalid:''}"
            />
            <div class="valid-feedback">Your password is identical!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.repeatpassword.sameAsPassword">Password must be identical.</span>
            </div>
          </div>
          <!-- <div class="form-group">
                    <label>Age</label>
                    <input type="text" class="form-control" v-model.number.lazy="$v.age.$model" :class="{'is-invalid':$v.age.$error,'is-valid':!$v.age.$invalid}">
                    <div class="valid-feedback">Your age is valid!</div>
                    <div class="invalid-feedback">
                        <span v-if="!$v.age.between">Age is required.</span>
                  </div>
          </div>-->
        </div>
        <div class="text-center">
          <button type="submit" class="button" @click.prevent="createLoan">Submit {{submitstatus}}</button>
        </div>
      </form>
      <div v-if="submitstatus">
        <h3>Added!</h3>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs
} from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  data() {
    return {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      repeatpassword: "",
      showpassword: false,
      submitstatus: null
    };
  },
  validations: {
    firstname: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(10)
    },
    lastname: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(12)
    },
    username: {
      required,
      isUnique(value) {
        if (value === "") return true;

        return new Promise(resolve => {
          setTimeout(() => {
            resolve(typeof value === "string" && value.length % 2 !== 0);
          }, 350 + Math.random() * 300);
        });
      }
    },
    email: {
      required,
      email
      // ,
      // isUnique (value) {
      //     if (value === '') return true

      //     // eslinit-disable-next-line
      //     var email_regex = /^\w*$/

      //     return new Promise((resolve) => {
      //         setTimeout(()=>{
      //             resolve(email_regex.test(value))
      //         }, 350 + Math.random() * 300)
      //     })

      // }
    },
    password: {
      required,
      minLength: minLength(8)
    },
    repeatpassword: {
      required,
      minLength: sameAs("password")
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
    post() {
      this.$http
        .post("http://localhost:3000/loans", {
          product_type: "Purchase Order",
          loan_amount: 20.37,
          terms: 3,
          document: "localhost:3000/docs/" + this.email + "-invoice.png",
          applicant: this.email
        })
        .then(function() {
          // console.log(data);
          this.submitstatus = true;
        });
    },
    createLoan() {
      fetch("loans", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          product_type: "Purchase Order",
          loan_amount: 20.37,
          terms: 3,
          document: "localhost:3000/docs/-invoice.png",
          applicant: "test@jayeson.com.sg"
        })
      }).then(function(response){response.json()}).then(function(data) {
          // eslint-disable-next-line no-console
          console.log(data);
          this.submitstatus = true;
        });
        
    },
    getLoans() {
      fetch("http://localhost:3000/loans")
        .then(data => {
          // eslint-disable-next-line no-console
          console.log(data);
          return data.json();
        })
        .then(json => {
          this.posts = json.result;
          //   this.posts = this.posts.sort(function(a, b) {
          //     if (a.timestamp < b.timestamp) {
          //       return 1;
          //     }
          //     if (b.timestamp < a.timestamp) {
          //       return -1;
          //     }
          //     return 0;
          //   });
        });
    }
  }
};
</script>