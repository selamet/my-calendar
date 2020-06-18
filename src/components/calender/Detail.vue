<template>

  <div class="row">
    <div class="detail">
      <transition
        mode="out-in"
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <app-event-list v-if="createStatus" @goToEventCreate="changePlease=$event"></app-event-list>

        <app-event-create v-else @goToEventList="changePlease=$event"></app-event-create>
      </transition>
    </div>
  </div>

</template>


<script>
  import EventList from "./EventList";
  import EventCreate from "./EventCreate";


  export default {
    components: {
      appEventList: EventList,
      appEventCreate: EventCreate

    },
    data() {
      return {
        createStatus: false,
        changePlease: false
      }
    },
    watch: {
      changePlease() {
        this.createStatus = !this.createStatus
      }
    },
    methods: {
      range: function (start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
      },

    }
  }
</script>


<style scoped>

  .row {
    display: none;
    background-color: lightblue;
    width: 400px;
    height: 250px;
  }

  .row .detail {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 5fr 5fr 0.3fr;

  }


</style>
