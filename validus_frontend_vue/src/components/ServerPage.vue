<template>
 <body>
  <div class="sidenav">
    <a href="/" @click="logout">
      <i class="fa fa-sign-out-alt"></i> Logout
    </a>
  <router-link to="loan-page"><i class="fa fa-file-contract"></i> Loan</router-link>
  <!-- <a href="#clients"><i class="fa fa-book"></i> Readme</a> -->
</div>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">System Monitoring</h5>
            <form>
              <div class="form-group">
                <label>system_uptime</label>
                <input class="form-control" type="text" :value="this.server_info.system_uptime" disabled/>
              </div>
              <div class="form-group">
                <label>number_cpu</label>
                <input class="form-control" type="text" :value="this.server_info.number_cpu" disabled/>
              </div>
              <div class="form-group">
                <label>os_type</label>
                <input class="form-control" type="text" :value="this.server_info.os_type" disabled/>
              </div>
              <div class="form-group">
                <label>load_average_5_min</label>
                <input class="form-control" type="text" :value="this.server_info.load_average_5_min" disabled/>
              </div>
              <div class="form-group">
                <label>total_memory_MB</label>
                <input class="form-control" type="text" :value="this.server_info.total_memory_MB" disabled/>
              </div>
              <div class="form-group">
                <label>free_memory_MB</label>
                <input class="form-control" type="text" :value="this.server_info.free_memory_MB" disabled/>
              </div>
              <div class="form-group">
                <label>free_memory_percentage</label>
                <input class="form-control" type="text" :value="this.server_info.free_memory_percentage" disabled/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</template>


<script>
export default {
  data() {
    return {
      server_info: []
    };
  },
  beforeMount() {
    this.TestMe();
  },

  name: "ServerPage",
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
    TestMe() {
      // eslint-disable-next-line no-console
      console.log(window.$cookies.split(";")[0]);
      fetch("servers", { method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-access-token": window.$cookies.split(";")[0]
        } })
        .then(res => res.json()) //returning a promise To extract the JSON body content from the response
        .then(resJson => {
          this.server_info = resJson;
        //   console.log(resJson);
        });
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