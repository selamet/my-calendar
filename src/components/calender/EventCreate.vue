<template>
  <div class="event-create-parent">
    <p>Event-create</p>
    <button @click="gotToEventList">send</button>

  </div>

</template>


<script>


  export default {
    methods: {
      gotToEventList() {
        this.$emit("goToEventList", '{true}');
      }
    }


  }

</script>

<style scoped>
  .event-create-parent {
    width: 400px;
    height: 250px;
    background-color: #313131;
  }
</style>
