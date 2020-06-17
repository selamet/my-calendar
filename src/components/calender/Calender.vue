<template>
  <div class="calender">
    <h1><span> MY</span> CALENDER </h1>


    <div class="date-picker">
      <div class="month">
        <div @click="goToPrevMonth" class="arrows prev-mth">&lt;</div>
        <div class="mth"> {{months[date.month]}} {{date.year}}</div>
        <div @click="goToNextMonth" class="arrows next-mth">&gt;</div>
      </div>
      <div class="dates">
        <div>
          <appDetail id="detail"></appDetail>
        </div>

        <div class="day-name-list">
          <div class="day-name" v-for="i in days"><p>{{i}}</p></div>

        </div>

        <div class="days">

          <div class="day day-other"
               v-for="i in range(yearDaysCount[date.month]-addDiv.start+1,yearDaysCount[date.month])"><span
            class="day-no">{{i}}</span></div>


          <div :class="{
             today : i === thisDate.day && date.month===thisDate.month && date.year ===thisDate.year,
             growDiv : i === selectedDate.day && date.month===selectedDate.month && date.year ===selectedDate.year
          }"

               class="day"
               v-for="i in yearDaysCount[date.month]"
               @click="selectDay(i)"
          >


            <span class="day-no">{{i}}</span>


          </div>

          <div class="day day-other" v-for="i in addDiv.end"><span class="day-no">{{i}}</span></div>

        </div>
      </div>
    </div>

  </div>

</template>


<script>

  import Detail from './Detail'
  import router from "../../router";

  export default {
    components: {
      appDetail: Detail,
    },
    data() {
      return {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        date: {
          day: '',
          month: '',
          year: ''
        },
        thisDate: {
          day: '',
          month: '',
          year: ''
        },
        selectedDate: {
          day: '',
          month: '',
          year: ''
        },
        addDiv: {
          start: '',
          end: ''
        },
        detailStatus: false,
        formatDate: '',
        yearDaysCount: '',
      }
    },
    methods: {
      range: function (start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
      },

      goToNextMonth() {
        this.date.month++;
        if (this.date.month > 11) {
          this.date.month = 0;
          this.date.year++;
          this.yearDaysCount = this.setYearDaysCount(this.date.year);
        }
        this.addDayOtherMonth(this.date.year, this.date.month);

      },
      goToPrevMonth() {
        this.date.month--;
        if (this.date.month < 0) {
          this.date.month = 11;
          this.date.year--;
          this.yearDaysCount = this.setYearDaysCount(this.date.year);
        }
        this.addDayOtherMonth(this.date.year, this.date.month);
      },
      setFormatDate() {
        let d = new Date();
        let day = d.getDate();
        if (day < 10) {
          day = '0' + day;
        }
        let month = d.getMonth() + 1;
        if (month < 10) {
          month = '0' + month;
        }
        let year = d.getFullYear();
        console.log(day + ' / ' + month + ' / ' + year);
        return day + ' / ' + month + ' / ' + year
      },
      setYearDaysCount(year) {
        let days = [];
        if (year % 4 === 0) {
          days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        } else {
          days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        }
        return days
      },
      addDayOtherMonth(year, month) {
        let start = new Date(year, month, 0);
        this.addDiv.start = start.getDay();
        this.addDiv.end = 42 - (this.yearDaysCount[month] + start.getDay());


      },
      selectDay(day) {
        console.log('day: ', day);

        this.detailStatus = true;
        console.log(this.selectedDate.day)
        this.showDetail(event);


      },
      showDetail(event) {
        router.push({ name: 'event-list' })
        let x = event.clientX;
        let y = event.clientY;
        let detail = document.getElementById("detail");
        detail.style.display = 'block';
        detail.style.position = 'absolute';
        console.log(x, y);
        detail.style.left = x - 300 + 'px';
        detail.style.top = y - 250 + 'px';


      },


    },
    mounted() {
      let date = new Date();
      this.date.month = date.getMonth();
      this.date.day = date.getDate();
      this.date.year = date.getFullYear();
      this.formatDate = this.setFormatDate();
      this.thisDate = {
        day: this.date.day,
        month: this.date.month,
        year: this.date.year
      }


      this.yearDaysCount = this.setYearDaysCount(date.getFullYear());
      this.addDayOtherMonth(date.getFullYear(), date.getMonth());


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
    justify-content: center;
    align-items: center;
    color: #313131;
    border: 0.1px solid #ddd;
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
