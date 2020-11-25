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
        <time-picker v-model="event.date" :show-meridian="false"/>
        <textarea v-model="event.content" placeholder="Description..." class="description form-control" name=""
                  id=""></textarea>
        <multi-select class="tags" v-model="event.flag" :options="options" collapse-selected/>
        <btn @click="createEvent()" class="save-button" size="sm">Kaydet</btn>
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
        event: {
          date: new Date(),
          title: '',
          content: '',
          flag: [],
        },
        options: [
          {value: 1, label: 'Yellow'},
          {value: 2, label: 'Green'},
          {value: 3, label: 'Blue'},
          {value: 4, label: 'Red'},
        ],
      }
    },
    methods: {
      gotToEventList() {
        this.$emit("goToEventList", '{false}');
      },
      exitDetail() {
        let detail = document.getElementById("detail");
        detail.style.display = 'none';
        this.$store.state.calenderData.detailStatus = false;
      },
      createEvent() {
        let fullDate = this.selectedDate.year + '-' + this.selectedDate.month + '-' + this.selectedDate.day + ' ' + this.event.date.getHours() + ':' + this.event.date.getMinutes();
        this.event.date = fullDate;
        this.event.flag = this.event.flag[0] ? this.event.flag[0] : 0;
        this.$store.dispatch('createEvent', this.event);
        this.event.date = new Date();
        this.gotToEventList();
      },

    },
    computed: {
      ...mapGetters({
        selectedDate: 'getSelectedDate',
        events: 'getEvents'

      }),
    },

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

  .header .exit-button {
    justify-content: end;
    cursor: pointer;

  }

  .header .exit-button:hover {
    color: #646464;

  }

  .header .go-back {
    justify-content: start;
    margin-left: 4px;
    cursor: pointer;
  }

  .header .go-back:hover {
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
    border: 1px solid #393e46;

  }

  .save-button:hover {
    background-color: #393e46;
    color: #f7f7f7;
  }

</style>
