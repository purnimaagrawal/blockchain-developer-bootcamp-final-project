<template>
  <div>
    <div class="card" style="width: 20rem">
      <img
        class="card-img-top"
        src="~/assets/def.png"
        alt="Card image cap"
      />
      <div class="card-body">
        <h4 class="card-title">Price/Night:{{ propObject.price }}ETH (${{propObject.priceUSD}})</h4>
        <h5 class="card-title">Name: {{ propObject.name }}</h5>
        <p class="card-text">Description: {{ propObject.description }}</p>
        <button class="btn btn-primary" v-on:click="displayDetails">
          View
        </button>
      </div>
    </div>
    <details-modal v-if="showModal" :propData="propObject"> </details-modal>
  </div>
</template>

<script>
import DetailsModal from "~/components/detailsModal.vue";

export default {
  props: ["propObject"],
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    DetailsModal,
  },
  methods: {
    displayDetails() {
      this.showModal = !this.showModal;
    },
  },
};
</script>
