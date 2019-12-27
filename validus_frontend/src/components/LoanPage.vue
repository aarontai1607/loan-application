<template>
<body>
  <div class="sidenav">
    <a href="/" @click="logout">
      <i class="fa fa-sign-out-alt"></i> Logout
    </a>
    <router-link to="server-page">
      <i class="fa fa-hdd"></i> Server
    </router-link>
    <!-- <a href="#clients"><i class="fa fa-book"></i> Readme</a> -->
  </div>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Loan Application System</h5>
            <form v-on:submit="applyLoan">
              <div class="form-group">
                <label for="email">Applicant</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  :value="this.applicant"
                  disabled
                />
              </div>
              <div class="form-group">
                <label for="loan_amount">Loan Amount</label>
                <input
                  type="number"
                  class="form-control"
                  id="loan_amount"
                  name="loan_amount"
                  placeholder="e.g 123.12"
                  required
                  min="1"
                  step="0.01"
                />
              </div>

              <div class="form-group">
                <label for="product_type">Product Type</label>
                <select
                  class="form-control"
                  id="product_type"
                  name="product_type"
                  v-model="product_type"
                >
                  <option>Purchase Order</option>
                  <option>Invoice Financing</option>
                </select>
              </div>

              <div class="form-group">
                <label for="exampleFormControlInput3">Interest Rate</label>

                <input
                  v-if="product_type === 'Purchase Order'"
                  type="number"
                  required
                  name="interest"
                  min="0"
                  step=".01"
                  class="form-control"
                  id="exampleFormControlInput3"
                  placeholder="1.5"
                  value="1.5"
                  disabled
                />
                <input
                  v-if="product_type === 'Invoice Financing'"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput3"
                  placeholder="1.8"
                  value="1.8"
                  disabled
                />
              </div>
              <div class="form-group">
                <label for="terms">Terms</label>
                <select class="form-control" id="terms" name="terms" v-model="terms">
                  <option>3</option>
                  <option>6</option>
                  <option>12</option>
                  <option>24</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput4">Monthly Amortization</label>
                <input
                  v-if="product_type === 'Purchase Order'"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput4"
                  :placeholder="1.5 / terms"
                  disabled
                />
                <input
                  v-if="product_type === 'Invoice Financing'"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput4"
                  :placeholder="1.8 / terms"
                  disabled
                />
              </div>
              <!-- <div class="form-group">
                <label for="exampleFormControlSelect2">Example multiple select</label>
                <select multiple class="form-control" id="exampleFormControlSelect2">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>-->
              <!-- <div class="form-group">
                <label for="exampleFormControlTextarea1">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>-->
              <div class="form-group">
                <label for="document">Invoice</label>
                <input type="file" class="form-control-file" id="document" name="document" />
              </div>
              <button type="submit" class="btn btn-dark">Apply</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
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
  name: "LoanPage",
  data() {
    return {
      product_type: "Purchase Order",
      loan_amount: 0.0,
      terms: 3,
      applicant: window.$cookies.split(";")[1],
      document: "",
      interest: 0
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
    logout() {
      window.$cookies = "";
      fetch("auth/api/logout", {
        method: "GET"
      })
        .then(res => res.json()) //returning a promise To extract the JSON body content from the response
        .then(resJson => {
          // this.server_info = resJson;
          // eslint-disable-next-line no-console
          console.log(resJson);
          window.location.href = '/';
        });
    },
    applyLoan: e => {
      e.preventDefault();
      let product_type = e.target.elements.product_type.value;
      let loan_amount = e.target.elements.loan_amount.value;
      let terms = e.target.elements.terms.value;
      let applicant = window.$cookies.split(";")[1];
      let document = e.target.elements.document.value;

      let applyLoan = () => {
        let data = {
          product_type: product_type,
          loan_amount: loan_amount,
          terms: terms,
          applicant: applicant,
          document: document
        };

        fetch("loans", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "x-access-token": window.$cookies.split(";")[0]
          },
          body: JSON.stringify(data)
        })
          .then(response => {
            // eslint-disable-next-line no-console
            console.log("Loan has been applied " + response);
            // router.push("applyLoan");
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.log("Cannot apply loan " + err);
          });
      };
      applyLoan();
    }
  }
};
</script>
<style>
.sidenav {
  height: 100%;
  width: 160px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.main {
  margin-left: 160px; /* Same as the width of the sidenav */
  font-size: 28px; /* Increased text to enable scrolling */
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>