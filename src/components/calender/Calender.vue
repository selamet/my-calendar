<template>
  <div class="calender">
      <h1><span> MY</span> CALENDER  <span @click.prevent="logout">Logout</span></h1>
    <div class="date-picker">
      <div class="month">
        <div @click="goToPrevMonth()" class="arrows prev-mth">&lt;</div>
        <div class="mth"> {{calenderData.months[calenderData.date.month]}} {{calenderData.date.year}}</div>
        <div @click="goToNextMonth()" class="arrows next-mth">&gt;</div>
      </div>
      <div class="dates">
        <div>
          <appDetail id="detail"></appDetail>
        </div>

        <div class="day-name-list">
          <div class="day-name" v-for="i in calenderData.days"><p>{{i}}</p></div>

        </div>

        <div class="days">
          <div class="day day-other"
               v-for="i in range(calenderData.yearDaysCount[calenderData.date.month]-calenderData.addDiv.start+1,calenderData.yearDaysCount[calenderData.date.month])"><span
            class="day-no">{{i}}</span></div>

          <div :class="{
             today : i === calenderData.today.day && calenderData.date.month === calenderData.today.month && calenderData.date.year === calenderData.today.year,
          }"

               class="day"
               v-for="i in calenderData.yearDaysCount[calenderData.date.month]"
               @click="selectDay(i)"
          >

            <span class="day-no">{{i}}</span>

          </div>
          <div class="day day-other" v-for="i in calenderData.addDiv.end"><span class="day-no">{{i}}</span></div>

        </div>


      </div>
    </div>
  </div>


</template>


<script>

  import Detail from './Detail'
  import {mapGetters, mapMutations} from "vuex";
  import {setYearDaysCount, setFormatDate} from "../../set_values";

  export default {

    components: {
      appDetail: Detail,
    },
    methods: {
      range: function (start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
      },
      logout(){
        this.$store.dispatch('logout');
      },
      selectDay(day) {
        let calenderData = this.$store.state.calenderData
        calenderData.selectedDate.day = day;
        calenderData.selectedDate.month = calenderData.date.month;
        calenderData.selectedDate.year = calenderData.date.year;
        calenderData.selectedDate.format = calenderData.selectedDate.day + '.' + calenderData.selectedDate.month + '.' + calenderData.selectedDate.year;
        this.showDetail(event);
      },
      showDetail(event) {
        let x = event.clientX;
        let y = event.clientY;
        let detail = document.getElementById("detail");
        detail.style.display = 'block';
        detail.style.position = 'absolute';
        detail.style.left = x - 300 + 'px';
        detail.style.top = y - 250 + 'px';
      },

      ...mapMutations([
          'goToNextMonth',
          'goToPrevMonth',
        ]
      ),
    },

    computed: {
      ...mapGetters({
        calenderData: 'getCalenderData',

      }),


    },
    mounted() {
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      this.$store.state.calenderData.date = {
        day: day,
        month: month,
        year: year
      }
      this.$store.state.calenderData.formatDate = setFormatDate();
      this.$store.state.calenderData.today = {
        day: day,
        month: month,
        year: year
      }
      this.$store.state.calenderData.yearDaysCount = setYearDaysCount(date.getFullYear());
      this.$store.commit('addDayOtherMonth', {
        year: date.getFullYear(),
        month: date.getMonth()
      });


    }
  }
</script>


<style scoped>
  h1 {
    margin: 30px 0px;
    color: #313131;
    font-size: 42px;
    font-weight: 900;
    text-align: center;
  }

  h1 span {
    font-weight: 300;
  }


  .date-picker {
    position: relative;
    width: 80%;
    height: 60px;
    background-color: #fff;
    margin: 20px auto;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
    user-select: none;
    display: grid;


  }

  .date-picker .dates {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
  }

  .date-picker .month {

    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28px;
  }

  .date-picker .month .arrows {

    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #313131;
    font-size: 20px;
  }

  .date-picker .month .arrows:hover {
    background-color: #f3f3f3;
  }

  .date-picker .month .arrows:active {
    background-color: #00CA85;
  }

  .date-picker .dates .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    height: 580px;
  }

  .date-picker .dates .days .day {
    display: grid;
    grid-template-columns: repeat(4, 1fr 1fr 1fr 1fr);
    grid-template-rows: repeat(10, [row] auto);
    justify-content: center;
    align-items: center;
    color: #313131;
    border: 0.1px solid #ddd;

  }


  .date-picker .dates .days .day .day-no {
    margin-right: 4px;
    grid-column: col 3 / span 1;
    grid-row: row 10 / span 1;
    font-size: 14px;
    font-family: 'Muli', sans-serif;
    color: #20232a;
    line-height: 24px;


  }

  .date-picker .dates .days .day-other .day-no {
    color: #bdbdc0;

  }


  .date-picker .dates .day-name-list {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    height: 30px;


  }

  .date-picker .dates .day-name-list .day-name {
    display: flex;
    padding-top: 5px;
    justify-content: center;
    color: #313131;
    border: 0.1px solid #ddd;
    border-bottom: 0px;
  }

  .date-picker .dates .days .day:hover {
    background-color: #f3f3f3;

  }

  .date-picker .dates .days .today {
    background-color: #fcf8e3;

  }

  .date-picker .dates .days .growDiv {
    transform: scale(2.5);
    background-color: whitesmoke;

  }


</style>
