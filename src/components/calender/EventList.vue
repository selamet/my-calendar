<template>
  <div class="event-list-parent">

  <p>eventlist</p>
<button @click="goToEventCreate">Veriyi gönder</button>  </div>

</template>


<script>

  export default {
    methods :{
      goToEventCreate(){
        this.$emit("goToEventCreate",'true');
      }
    }


  }
</script>


<style scoped>
  .event-list-parent{
    width: 400px;
    height: 250px;
    background-color: red;
  }

</style>
