<template>
  <div class="container m-5">
    <div>
       <div id="mm-detected"></div>
      <h2 class="title">Decentralized Airbnb</h2>
      <h6 class="subtitle">Places to stay around the world</h6> 
                <div id="mm-detected"></div>
                <button class="btn btn-primary" @click="sayhello">Get Bookings
        </button>
      <div class="row">
        <div class="m-3" v-for="post in posts">
          <card :propObject="post" key="post.id" />
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import card from "~/components/card.vue";
import { fetchAllProperties, setProvider,getPropertiesByUserEvent } from "~/plugins/utils";
import { sampleTx } from "~/plugins/walletConnect";

export default {
  components: {
    card,
  },
  async mounted() {
    // init Metamask
    await setProvider();
    // fetch all properties
    const properties = await fetchAllProperties();
    this.posts = properties;
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async sendTx() {
      await sampleTx();
    },
    async sayhello(){
      var add = window.ethereum.selectedAddress;
      console.log("user::",add);
     var listPropertiesByUser =  await getPropertiesByUserEvent(add);
     console.log("listPropertiesByUser:",listPropertiesByUser);
      },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 250;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-family: "Quicksand", "Source Sans Pro", -apple-system,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 150;
  font-size: 40px;
  color: black;
  letter-spacing: 1px;
}


/* .btn {
  position:absolute;
 top:100; 
 right:100;
 background-color: aqua;

}  */
</style>
