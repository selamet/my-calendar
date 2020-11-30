<template>
  <div class="calender">
    <h1><span> MY</span> CALENDER <span @click.prevent="logout">Logout</span></h1>
    <div class="date-picker">
      <div class="month">
        <div @click="goToPrevMonth(calenderData)" class="arrows prev-mth">&lt;</div>
        <div class="mth"> {{ calenderData.months[calenderData.date.month] }} {{ calenderData.date.year }}</div>
        <div @click="goToNextMonth(calenderData)" class="arrows next-mth">&gt;</div>
      </div>
      <div class="dates">
        <div>
          <appDetail id="detail"></appDetail>
        </div>

        <div class="day-name-list">
          <div class="day-name" v-for="i in calenderData.days"><span>{{ i }}</span></div>

        </div>

        <div class="days">
          <div class="day day-other"
               v-for="i in range(calenderData.yearDaysCount[calenderData.date.month === 0 ? 11 : calenderData.date.month-1]-calenderData.addDiv.start+1,calenderData.yearDaysCount[calenderData.date.month === 0 ? 11 : calenderData.date.month-1])">
            <div class="events">


            </div>
            <span class="day-no">{{ i }}</span>

          </div>

          <div :class="{
             today : i === calenderData.today.day && calenderData.date.month === calenderData.today.month && calenderData.date.year === calenderData.today.year,
          }"

               class="day"
               v-for="i in calenderData.yearDaysCount[calenderData.date.month]"
               @click="selectDay(i)"
          >

            <div class="events">
              <div v-for="event in events"
                   v-if="event.date.day === i && calenderData.date.month === event.date.month-1 && calenderData.date.year === event.date.year"
                   class="tags" :class="colorClass(event.flag)">

                <span>{{ event.date.hour }}:{{ event.date.minute }}</span>
              </div>


            </div>
            <span class="day-no">{{ i }}</span>

          </div>
          <div class="day day-other" v-for="i in calenderData.addDiv.end">
            <div class="events">

            </div>


            <span class="day-no">{{ i }}</span>
          </div>
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
    logout() {
      this.$store.dispatch('logout');
    },
    selectDay(day) {
      let calenderData = this.$store.state.calenderData
      calenderData.selectedDate.day = day;
      calenderData.selectedDate.month = calenderData.date.month + 1;
      calenderData.selectedDate.year = calenderData.date.year;
      calenderData.selectedDate.format = calenderData.selectedDate.day + '.' + calenderData.selectedDate.month + '.' + calenderData.selectedDate.year;
      this.$store.commit('SET_SELECTED_EVENT_DEFAULT')
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
    goToNextMonth(calenderData) {
      let data = calenderData;
      data.date.month++;
      if (data.date.month > 11) {
        data.date.month = 0;
        data.date.year++;
        data.yearDaysCount = setYearDaysCount(data.date.year);

      }
      let params_from = data.date.year + '-' + (data.date.month + 1) + '-' + '1';
      let params_to = data.date.year + '-' + (data.date.month + 2) + '-' + '1';
      if (data.date.month + 2 === 13) {
        params_to = (data.date.year + 1) + '-' + '1' + '-' + '1';
      }
      let params = {'from': params_from, 'to': params_to}
      this.$store.dispatch('callEvents', params);

      this.addDayOtherMonth(this.$store.state, {year: data.date.year, month: data.date.month});
    },
    addDayOtherMonth(state, payload) {
      let start = new Date(payload.year, payload.month, 0);
      let calenderData = state.calenderData;
      calenderData.addDiv.start = start.getDay();
      calenderData.addDiv.end = 42 - (calenderData.yearDaysCount[payload.month] + start.getDay());

    },

    goToPrevMonth(calenderData) {
      let data = calenderData;
      data.date.month--;
      if (data.date.month < 0) {
        data.date.month = 11;
        data.date.year--;
        data.yearDaysCount = setYearDaysCount(data.date.year);
      }
      let params_from = data.date.year + '-' + (data.date.month + 1) + '-' + '1';
      let params_to = data.date.year + '-' + (data.date.month + 2) + '-' + '1';
      if (data.date.month + 2 === 13) {
        params_to = (data.date.year + 1) + '-' + '1' + '-' + '1';
      }
      let params = {'from': params_from, 'to': params_to}
      this.$store.dispatch('callEvents', params);
      this.addDayOtherMonth(this.$store.state, {year: data.date.year, month: data.date.month});

    },

    colorClass(flag) {
      switch (+flag) {
        case 4:
          return 'bg-red'
        case 3:
          return 'bg-blue'
        case 2:
          return 'bg-green'
        case 1:
          return 'bg-yellow'
        case 0:
          return 'bg-white'
      }

    }

  },

  computed: {
    ...mapGetters({
      calenderData: 'getCalenderData',
      events: 'getEvents'

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

    this.$store.dispatch('callEvents');


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
  height: 6vh;
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
  height: 70vh;
  background-color: #fff;
}

.date-picker .month {
  height: 6vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2.5vw;
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

.date-picker .dates .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 66vh;
}

.date-picker .dates .days .day {

  color: #313131;
  border: 0.1px solid #ddd;
  display: flex;
  flex-direction: column;
  max-height: 11vh;
  min-height: 11vh;
}


.date-picker .dates .days .day .events {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow-y: scroll;
  justify-content: space-between;
  padding: 5px;
}

.date-picker .dates .days .day .events .tags {
  height: 2.3vh;
  margin: 3px;
  flex-wrap: wrap;
  width: 40%;
  justify-content: space-around;
  border: 1px solid #313131;
  border-radius: 2px;
  text-align: center;
  align-items: center;
  font-size: 0.8vw;

}

.date-picker .dates .days .day .events::-webkit-scrollbar {
  display: none;

}


.date-picker .dates .days .day .events .tags:hover {
  background-color: #f2f2f2;
  cursor: pointer;
}


.date-picker .dates .days .day .day-no {
  margin-right: 4px;
  font-size: 14px;
  font-family: 'Muli', sans-serif;
  color: #20232a;
  line-height: 24px;
  flex-basis: 20px;
  margin-left: auto;
  border-top: 1px solid #cccccc;

}

.date-picker .dates .days .day-other .day-no {
  color: #bdbdc0;
  margin-right: 4px;
  font-size: 14px;
  font-family: 'Muli', sans-serif;
  line-height: 24px;
  flex-basis: 20px;
  margin-left: auto;
  border-top: 1px solid #cccccc;

}


.date-picker .dates .day-name-list {
  display: grid;
  height: 4vh;
  grid-template-columns: repeat(7, 1fr);
}

.date-picker .dates .day-name-list .day-name {
  color: #313131;
  border: 0.1px solid #ddd;
  border-bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}


.date-picker .dates .days .day:hover {
  background-color: #f3f3f3;
  cursor: pointer;
}

.date-picker .dates .days .today {
  background-color: #fcf8e3;

}

.date-picker .dates .days .growDiv {
  transform: scale(2.5);
  background-color: whitesmoke;

}

.bg-red {
  background-color: #f38181;
}

.bg-blue {
  background-color: #00b7c2;
}

.bg-yellow {
  background-color: #fce38a;
}

.bg-green {
  background-color: #519872;
}

.bg-white {
  background-color: #fff;
}


</style>
