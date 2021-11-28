<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Booking Details</h3>
          </div>
          <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="booking in bookings" :key="booking.id">
                    <td>{{booking.name}}</td>
                    <td>{{booking.checkInDate}}</td>
                    <td>{{booking.checkoutDate}}</td>
                </tr>
            </tbody>
        </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {getPropertiesByUserEvent} from "~/plugins/utils";

export default {
    components: {
  },
   async mounted() {
      var add = window.ethereum.selectedAddress;
     var listPropertiesByUser =  await getPropertiesByUserEvent(add);
     console.log("obj",listPropertiesByUser);
      for(let i =0 ;i<listPropertiesByUser.length;i++){
        var date1 = new Date(2021,0);
        var resultcheckIn = new Date(date1.setDate(listPropertiesByUser[i].checkInDate))
         var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          listPropertiesByUser[i].checkInDate = resultcheckIn.toLocaleDateString("en-US", options);
           var date2 = new Date(2021,0);
           var resultCheckOut = new Date(date2.setDate(listPropertiesByUser[i].checkoutDate))
             listPropertiesByUser[i].checkoutDate = resultCheckOut.toLocaleDateString("en-US", options);
     }
     this.bookings = listPropertiesByUser;
  },
data() {
    return {
      showModal: false,
      flag: true,
      bookings:[],
    };

}
}
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
