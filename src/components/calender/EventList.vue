<template>
  <div class="row">


    <div class="detail">
      <div class="event-list">

      </div>
      <div class="event-create">
        <div class="clock">

          <span>Time: </span>
          <select class="form-control">
            <option selected disabled>00</option>
            <option v-for=" i in range(1,9)">0{{i}}</option>
            <option v-for=" i in range(10,24)">{{i}}</option>

          </select>
          <select class="form-control">
            <option selected disabled>00</option>
            <option v-for=" i in range(1,9)">0{{i}}</option>
            <option v-for=" i in range(10,59)">{{i}}</option>
          </select>


        </div>
        <div class="title">
          <span>Title: </span>
          <input class="form-control" type="text">
        </div>
        <div class="description">
          <span>Description: </span>
          <textarea class="form-control" cols="23" rows="4"></textarea>
        </div>

        <div class="save-button">
          <a class="btn btn-primary btn-block">Save</a>
        </div>

      </div>
      <div class="buttons">
        <span class="exit-button "><i class="fa fa-times-circle"></i></span>
      </div>

    </div>
  </div>

</template>


<script>

  export default {

    methods: {
      range: function (start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
      }
    }
  }
</script>


<style scoped>

  .row {

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

  .row .detail .event-list {

    width: 100%;
    height: 100%;
    background-color: red;

  }

  .row .detail .event-create {

    width: 100%;
    background-color: #00CA85;
    height: 100%;
    display: grid;
    grid-template-rows: 50px 60px 150px 50px;

  }

  .row .detail .event-create .clock {

    background-color: #00CA85;

    display: grid;
    margin: 10px;
    grid-template-columns: 5fr 1fr 1fr;
    grid-template-rows: 1fr 5fr 1fr;
    grid-gap: 5px;

  }

  .row .detail .event-create .title {
    margin: 0 0 10px 10px;
    width: 90%;
    height: 30px;

  }

  .row .detail .event-create .description {
    margin: 10px;

  }

  .row .detail .event-create .save-button {
    margin: 8px;
    width: 90%;
    font-size: 12px;
    color: whitesmoke;

  }

  .row .detail .event-create select {

    width: 65px;
    height: 30px;

  }

  .row .detail .buttons {
    width: 100%;
    background-color: #bdbdc0;
    height: 100%;
  }


</style>
