<template>
  <div class="event-create-parent">
    <div class="header">
      <i @click="gotToEventList" class="go-back fa fa-arrow-circle-left" aria-hidden="true"></i>

     <span class="text-center">12.03.1996</span>
      <i class=" exit-button fa fa-times-circle"></i>
    </div>
    <div>
      <div class="event-inputs">
        <input placeholder="Title..." class="form-control" type="text">
        <time-picker v-model="time" :show-meridian="false"/>
        <textarea placeholder="Description..." class="description form-control" name="" id=""></textarea>
        <multi-select class="tags" v-model="selected" :options="options" collapse-selected/>
        <btn class="save-button" size="sm">Kaydet</btn>
      </div>
    </div>

  </div>

</template>


<script>

  import {TimePicker, MultiSelect, Btn} from 'uiv'

  export default {
    components: {
      TimePicker, MultiSelect, Btn
    },
    data() {
      return {
        time: new Date()
        ,
        selected: [],
        options: [
          {value: 1, label: 'Option1'},
          {value: 2, label: 'Option2'},
          {value: 3, label: 'Option3'},
          {value: 4, label: 'Option4'},
          {value: 5, label: 'Option5'}
        ],
      }
    },
    methods: {
      gotToEventList() {
        this.$emit("goToEventList", '{true}');
      },
      exitDetail(){
        this.$emit("exitDetail", '{true}');
      }
    }


  }

</script>

<style scoped>
  .event-create-parent {
    width: 400px;
    height: 250px;
    display: grid;
    grid-template-rows: 1fr 10fr;


  }

  .header {
    grid-column: 1/3;
    display: grid;
    grid-template-columns: 1fr 20fr 1fr;
    color: #f5f5f5;
    background-color: #436f8a;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    font-size:16px;

  }
  .header .exit-button{
    justify-content:end;
    cursor:pointer;

  }
  .header .exit-button:hover{
    color:#bdbdc0;

  }
  .header .go-back{
    justify-content:start;
    margin-left: 4px;
    cursor:pointer;
  }

  .header .go-back:hover{
    color:#bdbdc0;
  }

  .event-inputs {
    display: grid;
    grid-template-columns: 5fr 5fr;

    grid-column-gap: 5rem;
    align-items: center;
    margin-left: 10px;
  }

  .description {
    grid-column: 1/3;
    width: 380px;
    height: 80px
  }

  .tags {
    margin-top: 10px;
  }

  .save-button {
    margin-top: 10px;
    width: 150px;
    color: #f5f5f5;
    background-color: #436f8a;

  }

</style>
