<template>
  <div class="event-create-parent">
    <div class="header">
      <i @click="gotToEventList" class="go-back fa fa-arrow-circle-left" aria-hidden="true"></i>

     <span class="text-center">{{selectedDate.format}}</span>
      <i @click="exitDetail" class=" exit-button fa fa-times-circle"></i>
    </div>
    <div>
      <div class="event-inputs">
        <input v-model="event.title" placeholder="Title..." class="form-control" type="text">
        <time-picker v-model="event.time" :show-meridian="false"/>
        <textarea v-model="event.description" placeholder="Description..." class="description form-control" name="" id=""></textarea>
        <multi-select class="tags" v-model="event.selected" :options="options" collapse-selected/>
        <btn @click="saveEvent()" class="save-button" size="sm">Kaydet</btn>
      </div>
    </div>

  </div>

</template>


<script>

  import {TimePicker, MultiSelect, Btn} from 'uiv'
  import {mapGetters, mapMutations} from "vuex";

  export default {
    components: {
      TimePicker, MultiSelect, Btn
    },
    data() {
      return {
        event : {
          time: new Date(),
          title : '',
          description:'',
          selected: [],
        },
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
        this.$emit("goToEventList", '{false}');
      },
      exitDetail(){
        let detail = document.getElementById("detail");
        detail.style.display = 'none';
        this.$store.state.calenderData.detailStatus = false;
      },
      saveEvent(){
        this.event.time.setDate(this.selectedDate.day);
        this.event.time.setMonth(this.selectedDate.month);
        this.event.time.setFullYear(this.selectedDate.year);
        this.$store.dispatch('saveEvent', this.event);
        this.event.time = new Date();
      },

    },
    computed: {
      ...mapGetters({
        selectedDate: 'getSelectedDate',
        events: 'getEvents'

      }),
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
    color: #222831;
    background-color: #FFCE00;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    font-size: 16px;
    width: 398px;
    border-radius: 5px;
    border-bottom: #313131 1px solid;

  }
  .header .exit-button{
    justify-content:end;
    cursor:pointer;

  }
  .header .exit-button:hover{
    color: #646464;

  }
  .header .go-back{
    justify-content:start;
    margin-left: 4px;
    cursor:pointer;
  }

  .header .go-back:hover{
    color: #646464;
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
    height: 80px;
    resize: none;
  }

  .tags {
    margin-top: 10px;
  }

  .save-button {
    margin-top: 10px;
    width: 150px;
    color: #393e46;
    background-color: #FFCE00;
    border :1px solid #393e46;

  }
  .save-button:hover{
    background-color: #393e46;
    color: #f7f7f7;
  }

</style>
