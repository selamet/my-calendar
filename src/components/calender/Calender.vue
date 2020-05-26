<template>
  <div class="calender">
    <h1>CUSTOM <span>DATE</span> PICKER</h1>


    <div class="date-picker">

      <div class="selected-date">
        {{formatDate}}
      </div>
      <div class="dates">
        <div class="month">
          <div @click="goToPrevMonth" class="arrows prev-mth">&lt;</div>
          <div class="mth"> {{months[date.month]}} {{date.year}}</div>
          <div @click="goToNextMonth" class="arrows next-mth">&gt;</div>
        </div>

        <div class="days">
          <div class="day" v-for="i in yearDaysCount[date.month]">{{i}}</div>
        </div>
      </div>
    </div>

  </div>

</template>


<script>

  const data_picker_element = document.querySelector('.date-picker');
  const selected_date_element = document.querySelector('.date-picker .selected-date');
  const dates_element = document.querySelector('.date-picker .dates');
  const mth_element = document.querySelector('.date-picker .dates .month .mth');

  const days_element = document.querySelector('.date-picker .dates .days');


  export default {
    data() {
      return {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        date: {
          day: '',
          month: '',
          year: ''
        },
        formatDate: '',
        yearDaysCount: null,
      }
    },
    methods: {
      checkEventPathForClass(path, selector) {
        for (let i = 0; i < path.length; i++) {
          if (path[i].classList && path[i].classList.contains(selector)) {
            return true
          }
        }
        return false
      },
      goToNextMonth() {
        this.date.month++;
        if (this.date.month > 11) {
          this.date.month = 0;
          this.date.year++;
          this.setYearDaysCount(this.date.year);
        }

      },
      goToPrevMonth() {
        this.date.month--;
        if (this.date.month < 0) {
          this.date.month = 11;
          this.date.year--;
        }
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
      }
    },
    mounted() {
      let date = new Date();
      this.date.month = date.getMonth();
      this.date.day = date.getDay();
      this.date.year = date.getFullYear();
      this.formatDate = this.setFormatDate();
      this.yearDaysCount = this.setYearDaysCount(date.getFullYear());
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
    height: 10vh;
    background-color: #fff;
    margin: 30px auto;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    user-select: none;

  }

  .date-picker:hover {
    background-color: #f3f3f3;
  }

  .date-picker .selected-date {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    color: #313131;
    font-size: 28px;
  }

  .date-picker .dates {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
  }

  .date-picker .dates .month {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #EEE;
    font-size: 28px;
  }

  .date-picker .dates .month .arrows {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #313131;
    font-size: 20px;
  }

  .date-picker .dates .month .arrows:hover {
    background-color: #f3f3f3;
  }

  .date-picker .dates .month .arrows:active {
    background-color: #00CA85;
  }

  .date-picker .dates .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    height: 60vh;
  }

  .date-picker .dates .days .day {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #313131;

  }

  .date-picker .dates .days .day.selected {
    background-color: #00CA85;
  }

</style>
