<template>
  <div class="event-list-parent">
    <div class="header">
      <i @click="goToEventCreate" class="go-back fa fa-plus-circle" aria-hidden="true"></i>

      <span class="text-center">{{ selectedDate.format }}</span>
      <i @click="exitDetail" class=" exit-button fa fa-times-circle"></i>
    </div>

    <div class="filter">
      <div class="title">

      </div>
      <div class="priority">
        <div style="background-color: #00c853" class="colors"></div>
        <div style="background-color: #ffd600" class="colors"></div>
        <div style="background-color: #0091ea" class="colors"></div>
        <div style="background-color: #ff1744" class="colors"></div>
      </div>

    </div>

    <div class="event-list">
      <ul>
        <li v-for="i in events"
            v-if="selectedDate.day === i.date.day && selectedDate.month === i.date.month && i.date.year === selectedDate.year">
          <div><a><p @click="selectEvent(i)" class="title">{{ i.title }}</p>  <span
            class="time">{{ i.date.hour + ':' + i.date.minute }}</span> </a> <i @click="destroyEvent(i.uuid)"
                                                                                class="delete-icon fa fa-minus"></i>
          </div>
        </li>
      </ul>

    </div>
    <div class="create-event">
      <p style="text-align: center">
        <btn class="create-event-button" size="sm">Oluştur</btn>
      </p>
    </div>

  </div>

</template>


<script>

import {mapGetters} from "vuex";
import {Btn, MultiSelect, TimePicker} from 'uiv'

export default {
  components: {
    Btn
  },
  methods: {
    goToEventCreate() {
      this.$emit("goToEventCreate", '{true}');
    },
    exitDetail() {
      let detail = document.getElementById("detail");
      detail.style.display = 'none';
      this.$store.state.calenderData.detailStatus = false;
    },
    selectEvent(event) {
      this.$store.commit('SET_SELECTED_EVENT', event);
      this.$emit("goToEventCreate", '{true}');

    },
    destroyEvent(uuid) {
      this.$store.dispatch('destroyEvent', uuid);
      this.$store.commit('EVENT_DESTROY', uuid);
    },
  },
  computed: {
    ...mapGetters({
      selectedDate: 'getSelectedDate',
      events: 'getEvents',
    }),
  },
}
</script>


<style scoped>
.event-list-parent {
  width: 400px;
  height: 250px;
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

.filter {
  height: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.filter .title {
  margin: 6px 5px;
  font-family: "sans-serif";
  font-size: 14px;

}

.filter .priority {
  margin-right: 5px;
}

.filter .priority .colors {
  height: 14px;
  width: 14px;
  margin: 8px 2px;
  border-radius: 50%;
  grid-auto-flow: column;
  float: right;
  border: 1px solid #313131;
}

.filter .priority .colors:hover {
  border: 2px solid #313131;
  cursor: pointer;

}

.event-list {
  height: 160px;
}

.create-event-button {
  margin-top: 10px;
  width: 150px;
  color: #393e46;
  background-color: #FFCE00;
  border: 1px solid #393e46;

}

.create-event-button:hover {
  background-color: #393e46;
  color: #f7f7f7;
}


.event-list {
  margin: 0px 30px;
}

.event-list ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 150px;
  overflow-y: auto;

}

.event-list li {
  font: 200 16px/1.5 Helvetica, Verdana, sans-serif;
  border-bottom: 1px solid #ccc;

}

.event-list li div {
  display: flex;
  width: 330px;
}


.event-list li:last-child {
  border: none;
}

.event-list li a {
  text-decoration: none;
  color: #000;
  -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
  -moz-transition: font-size 0.3s ease, background-color 0.3s ease;
  -o-transition: font-size 0.3s ease, background-color 0.3s ease;
  -ms-transition: font-size 0.3s ease, background-color 0.3s ease;
  transition: font-size 0.3s ease, background-color 0.3s ease;
  display: flex;
}


.event-list ul::-webkit-scrollbar {
  display: none;
}

.event-list li a:hover {
  font-size: 20px;
  background: #f6f6f6;
  cursor: pointer;
}

.event-list li div .title {
  white-space: nowrap;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 216px;

}

.event-list li div .time {
  width: 50px;
  margin: 0 10px 0 20px;
}

.event-list li div .delete-icon {
  margin: 6px 0 0 30px;
  justify-content: end;
  cursor: pointer;
  color: #000;


}

.event-list li div .delete-icon:hover {

}


</style>
