<template>
	<div id="app">
    <Header />
    <router-view></router-view>
		<!-- <Header />
		<Latest :posts="posts"/>
		<Posts :posts="posts" :count="postsCount" @showMore="this.showMore"/>
    <div class="container mt-5 mb-5" style="width:500px"><FormValidation/></div> -->
	</div>
</template>

<script>
// import Header from './components/Header';
// import Latest from './components/Latest';
// import Posts from './components/Posts';
// import FormValidation from './components/FormValidation';

export default {
  name: 'app',
  data(){
    return {
      API_URL: "http://localhost:3000/api/",
      posts: [],
      postsCount: 6
    }
  },
	// components: { Header, Latest, Posts, FormValidation },
  methods: {
    // getPosts () {
    //   fetch("posts/all")
    //   .then(data => {
    //     return data.json();
    //   })
    //   .then(json => {
    //     this.posts = json.result;
    //     this.posts = this.posts.sort(function(a,b){
    //       if(a.timestamp < b.timestamp){
    //         return 1;
    //       }
    //       if(b.timestamp < a.timestamp){
    //         return -1;
    //       }
    //       return 0;
    //     });
    //   });
    // },
    // createPost () {
    //   fetch("posts/all")
    //   .then(data => {
    //     return data.json();
    //   })
    //   .then(json => {
    //     this.posts = json.result;
    //     this.posts = this.posts.sort(function(a,b){
    //       if(a.timestamp < b.timestamp){
    //         return 1;
    //       }
    //       if(b.timestamp < a.timestamp){
    //         return -1;
    //       }
    //       return 0;
    //     });
    //   });
    // },
    showMore () {
      this.postsCount += 2;
    }
  },
  beforeMount(){
    // this.getPosts();
  }
}
</script>

<style lang="scss">
body {
	background-color: #F3F3F3;
	font-family: "Rockwell", serif;

	h3 {
		color: #171717;
		font-size: 28px;
		font-weight: 700;
	}
}
</style>
