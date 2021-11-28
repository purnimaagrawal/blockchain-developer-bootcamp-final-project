<template>
<div>
  <div class="container m-5">
    <div>
       <div id="mm-detected"></div>
      <h3 class="subtitle">Places to stay around the world</h3> 

        <div id="mm-detected"></div>
        <button class="btn btn-primary" @click="sayhello">Get Bookings
        </button>
       <button class="btn btn-secondary" @click="getFunds">Get Funds</button>
      <div class="row">
        <div class="m-3" v-for="post in posts">
          <card :propObject="post" key="post.id" />
        </div>  
      </div>
    </div>
  </div>
   <booking-modal v-if="showModal" :propData="propObject"> </booking-modal>
</div>
</template>

<script>
import card from "~/components/card.vue";
import { fetchAllProperties, setProvider,getPropertiesByUserEvent,fundAccount } from "~/plugins/utils";
import BookingModal from "~/components/bookingModal.vue";

export default {
  components: {
    card,
    BookingModal,
  },
  async mounted() {
    // init Metamask
    await setProvider();
    if(window.ethereum.networkVersion !='3'){
    alert("You need to be in Ropsten Network")
  }
    // fetch all properties
     if(window.ethereum.networkVersion =='3'){
    const properties = await fetchAllProperties();
    this.posts = properties;
     }

  window.ethereum.on('networkChanged', async function (networkId) {
  // Time to reload your interface with the new networkId
  console.log("network chanegd ",networkId);
  if(networkId !=3 ){
    alert("You need to be in Ropsten Network")
  }
  else{
    console.log(networkId)
     console.log(window.ethereum.selectedAddress);
    const properties = await fetchAllProperties();
    this.posts = properties;
        if(this.posts.length > 0){
           window.location.reload(true);
        }

  }
})
  },
  data() {
    return {
      posts: [],
      showModal: false,
    };
  },
  methods: {
    async sayhello(){
     this.showModal = !this.showModal;
      },
    async getFunds(){
     fundAccount(window.ethereum.selectedAddress);
      },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 0;
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
